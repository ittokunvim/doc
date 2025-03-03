# Ruby on RailsをAWSにデプロイする

この記事では、`mizusirazu.net`(Ruby on Rails)をAWSへデプロイする方法についてまとめられています。

参考：https://pikawaka.com/rails/ec2_deploy

## 大きな流れ

1. EC2インスタンスを生成
2. Elastaic IPでIPv4アドレスを設定。（EC2インスタンスは再起動するとパブリックIPv4アドレスが変更されてしまうため）

   - 無料枠で使用できる条件（満たしていなければ`0.005USD`かかる）

     - Elastic IP アドレスが EC2 インスタンスに関連付けられている。
     - Elastic IP アドレスに関連付けられているインスタンスが実行中である。
     - インスタンスには、1 つの Elastic IP アドレスしかアタッチされていない。
     - Elastic IP アドレスは、Network Load Balancer や NAT ゲートウェイなどのアタッチされたネットワークインターフェイスに関連付けられます。
3. sshの接続を簡略化する（エイリアスを生成する）
4. インスタンスの環境構築
5. データベースを設定
6. GitHubにSSHを登録
7. Nginxを設定

## EC2インスタンスを生成

- 参考：https://pikawaka.com/rails/ec2_deploy#EC2%E3%81%AE%E8%A8%AD%E5%AE%9A%E3%82%92%E3%81%97%E3%82%88%E3%81%86



## Elastaic IPでIPv4アドレスを設定。（EC2インスタンスは再起動するとパブリックIPv4アドレスが変更されてしまうため）

- 参考：https://pikawaka.com/rails/ec2_deploy#Elastic%20IP%E3%82%92%E7%B4%90%E4%BB%98%E3%81%91%E3%82%88%E3%81%86

- 無料枠で使用できる条件（満たしていなければ`0.005USD`かかる）

  - Elastic IP アドレスが EC2 インスタンスに関連付けられている。

  - Elastic IP アドレスに関連付けられているインスタンスが実行中である。

  - インスタンスには、1 つの Elastic IP アドレスしかアタッチされていない。

  - Elastic IP アドレスは、Network Load Balancer や NAT ゲートウェイなどのアタッチされたネットワークインターフェイスに関連付けられます。

## sshの接続を簡略化する（エイリアスを生成する）

```sh
Host mizusirazu
	HostName Elastic IP address
	User ec2-user
	IdentityFile ~/.ssh/my-private-key.pem
	
# $ ssh mizusirazu
```

## インスタンスの環境構築

```shell
# update packages
sudo yum update

# install packages
sudo yum -y install gcc-c++ make patch git curl zlib-devel openssl-devel ImageMagick-devel readline-devel libcurl-devel libffi-devel libicu-devel libxml2-devel libxslt-devel

# install nodejs
curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
sudo yum -y install nodejs

# install yarn
curl -sL https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
sudo yum -y install yarn

# install rbenv
git clone https://github.com/sstephenson/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
source .bash_profile

# install ruby-build
git clone https://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build

# install ruby
rbenv install 3.0.2
rbenv rehash
rbenv global 3.0.2
ruby -v
```

**インストールするパッケージの概要**

| 名前              | 役割                         |
| ----------------- | ---------------------------- |
| gcc-c++           | c++のコンパイラ              |
| make              | ソースコードからビルドできる |
| patch             | ファイルの修正や生成ができる |
| git               | バージョン管理ができる       |
| curl              | データを転送できる           |
| zlib-devel        | データの圧縮や伸張ができる   |
| openssl-devel     | 通信を暗号化する             |
| ImageMagick-devel | 画像を操作したり表示できる   |
| readline-devel    | CUIで行入力を支援してくれる  |
| libcurl-devel     | curlを扱える                 |
| libffi-devel      | FFIの機能を扱える            |
| libyaml-devel     | yamlファイルを扱える         |
| libicu-devel      | Unicodeを扱える              |
| libxml2-devel     | XMLを解析できる              |
| libxslt-devel     | XMLにXSLを適用させる         |

## データベースを設定

```shell
# install mariadb
sudo yum -y install mariadb-server mysql-devel

# start database
sudo systemctl start mariadb
sudo systemctl status mariadb

# set security
sudo mysql_secure_installation

# connect database
mysql -u root -p

# if password forget?
sudo systemctl stop mariadb
sudo mysqld_safe --skip-grant-tables --skip-networking &
mysql -u root
mariaDB > UPDATE mysql.user SET Password = PASSWORD('newpassword') WHERE User = 'root';
mariaDB > FLUSH PRIVILEGES;
# kill safe mode process
sudo kill `sudo cat /var/run/mariadb/mariadb.pid`
```

## GitHubにSSHを適用

```shell
# create public ssh key
ssh-keygen -t rsa
cat ~/.ssh/id_rsa.pub
#
# set ssh key to GitHub, use Browser
#
ssh -T git@github.com
```

## Nginxを設定

```shell
# create directory for mizusirazu repository
sudo mkdir /var/www/
sudo chown ec2-user /var/www/

# install Nginx
sudo amazon-linux-extras install nginx1
nginx -v
# start Nginx
sudo systemctl start nginx

# edit Nginx settings
vim /etc/nginx/conf.d/rails.conf
# /etc/nginx/conf.d/rails.conf
upstream unicorn {
  server unix:/var/www/mizusirazu/tmp/sockets/unicorn.sock;
}

server {
  listen 80;
  server_name  54.168.62.213;
  root /var/www/mizusirazu/public;

  location ^~ /assets/ {
    gzip_static on;
    expires max;
    add_header Cache-Control public;
  }

  location @unicorn {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_redirect off;
    proxy_pass http://unicorn;
  }

  try_files $uri/index.html $uri @unicorn;
  error_page 500 502 503 504 /500.html;
}
```

**/etc/nginx/nginx.conf.defaultの主な設定一覧**

| 設定項目             | 設定値                                         |
| -------------------- | ---------------------------------------------- |
| server               | サーバー情報を定義                             |
| listen               | 接続を許可するポート番号やIPアドレスを定義     |
| server_name          | アクセスを受け付けるURL                        |
| location             | ロケーションの指定                             |
| root                 | アプリのルートディレクトリを定義               |
| error_page           | ステータスコードに応じて表示するページを指定   |
| upstream             | アプリケーションサーバーの指定                 |
| client_max_body_size | 送られてくるファイル容量の上限を設定           |
| gzip_static          | 圧縮したファイルを使うかを定義                 |
| try_files            | ファイルが存在するかを確認                     |
| proxy_set_header     | アプリケーションサーバーに送信するヘッダを定義 |
| proxy_pass           | プロキシサーバーの指定                         |

## Unicornを設定

- Railsを起動するのにはPumaを、EC2インスタンスを起動するのにUnicornを使う

*Gemfile*

```ruby
group :production do
  gem 'unicorn', '5.4.1'
end
```

*config/unicorn.rb*

```ruby
# set root path directory
root_path = File.expand_path('../../', __FILE__)

# set performance of application server
worker_processes 2

# set directory placed application
working_directory root_path

# set where the save the process ID
pid "#{root_path}/tmp/pids/unicorn.pid"

# set port number
listen "#{root_path}/tmp/sockets/unicorn.sock"

# set file of memorized error log
stderr_path "#{root_path}/log/unicorn.stderr.log"

# set file of memorized standard log
stdout_path "#{root_path}/log/unicorn.stdout.log"

# set timeout
timeout 30

# restart Unicorn with no downtime
preload_app true

GC.respond_to?(:copy_on_write_friendly=) && GC&.copy_on_write_friendly = true

check_client_connection false

run_once = true

before_fork do |server, worker|
  defined?(ActiveRecord::Base) &&
    ActiveRecord::Base.connection.disconnect!
  
  if run_once
    run_once = false # prevent from firing again
  end
  
  old_pid = "#{server.config[:pid]}/oldbin"
  if File.exist?(old_pid) && server.pid != old_pid
    begin
      sig = (worker.nr + 1) >= server.worker_processes ? :QUIT : :TTOU
      Process.kill(sig, File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno:ESRCH => e
      logger.error e
    end
  end
end

after_fork do |_server, _worker|
  defined?(ActiveRecord::Base) && ActiveRecord::Base.establish_connection
end
```

## リポジトリを作成する

```shell
# add repository to /var/www/ below
cd /var/www/
git clone https://github.com/ittoku777/mizusirazu.git

# install gem
gem install bundler:2.2.29
bundle install

# push to github in local terminal
git add . && git commit -m "updated gem" && git push origin main
# pull in EC2 terminal
git pull origin main
bundle install
```

## スワップファイルでメモリを強化する

```shell
# check memory
grep Swap /proc/meminfo

sudo dd if=/dev/zero of=/swapfile bs=1M count=512
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon -s

# enable swap
sudo sudo vim /etc/fasab
### /etc/fstab ###
UUID=uuid
/swapfile swap swap default 0 0

# check memory
grep Swap /proc/meminfo
```

## 環境変数を定義する

```shell
# create secret_key_base
rake secret
sudo vim /etc/environment
### /etc/environment ###
DATABASE_PASSWORD='MariaDB-root-my-password'
SECRET_KEY_BASE='create-secret_key_base'

# logout and login
exit
ssh mizusirazu

# check environment valiable
env | grep DATABASE_PASSWORD
env | grep SECRET_KEY_BASE
```

## ブラウザで確認する

```shell
# compile assets
cd /var/www/mizusirazu
rails assets:precompile RAILS_ENV=production
# set master key if got error
RAILS_MASTER_KEY="master.key"

# set /config/database.yml in local terminal
vim /config/database.yml
### /config/database.yml ###
production:
  <<: *default
  database: mizusirazu_production
  username: root
  password: <%= ENV['DATABASE_PASSWORD'] %>
  socket: /var/lib/mysql/mysql.sock

# create database
rails db:create RAILS_ENV=production
rails db:migrate RAILS_ENV=production

# start rails!
sudo systemctl reload nginx
sudo systemctl start nginx
unicorn_rails -c config/unicorn.rb -E production -D
```
