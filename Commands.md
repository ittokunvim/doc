# Command各種

### ffmpeg

> mp4 -> mp3

`ffmpeg -i hoge.mp4 -acodec libmp3lame -ab 256k foo.mp3`

> 音量を上げる

`ffmpeg -i hoge.mp4 -af "volume=20dB" foo.mp3`

> 動画切り出し

`ffmpeg -ss starttime -i hoge1.mp4 -t endtime hoge2.mp4`

### youtube-dl

> 音声のみ抽出

`youtube-dl -x "URL"`

### npm

> npmをアップグレード

`npm install -g npm@latest`

### tree

> 特定のディレクトリを無視

`tree -I node_modules`

### svn

> github.comのソースコードを一部だけクローン
>
> URLの`tree/master`の部分を`trunk`に置き換えること

`svn checkout https://github.com/XXX/YYY/trunk/ZZZ`

### nバイトのファイルを生成

> bs x cバイトのfilenameを生成する

`dd if=/dev/zero of=filename bs=n count=c`

### Curl

> 進捗状況やエラーを表示しない

`curl -s -o Path URL`

> ただし、エラーは表示したい

`curl -sS -o Path URL`

> SSL接続の証明書エラーをスキップ

`curl -k URL`

> URLのファイル名でダウンロード

`curl -O URL/save.html`

> リダイレクト有効

`curl -L URL`

> HTTPレスポンスヘッダー取得

`curl -I URL`

### Git

> untracked filesを消去

`git clean -df`

> addをリセット

`git reset HEAD .`

> commitをリセット

`git reset --soft HEAD^`

> 1回目のcommitをリセット

`git update-ref -d HEAD`

> push前に戻す(logに残る)

`git revert [<commit>]`

> 設定を確認

`git config -l`
`git config --global -l`

> file_nameを変更してもを無視

`git update-index --assume-unchanged file_name`

> 直前のコミットした変更点を見る

`git diff HEAD^`

> 直前のpushを取り消し（ログは残る）

`git revert [<commit>]`

> 直前のコミットのタイトルを変更する

`git commit --amend MESSAGE`

### lsof

- オープンしているファイルを一覧表示する

> ポート番号3000のプロセスを探す

`lsof -P -i:3000`

### whois

> ドメイン、IPアドレスの情報を出力する

`whois DOMAIN or IP-ADDRESS`

### netstat

> 経路制御表を出力する

`netstat -r`

### nslookup

> ホスト名からIPアドレスを出力する

`nslookup hostName`

### traceroute

> プログラムを実行したホストから特定の宛先のホストに到達するまでに、どのルーターを通過したかを出力する
>
> 仕組みは、IPの生存時間を1から順番に増やし、UDPパケットを送信し、ICMP時間超過メッセージを無理やり返させる方法
>
> 障害の発生時などに便利
>
> ソースコード：https://ee.lbl.gov/

`traceroute HOST`

### ping

> ICMPエコーメッセージを使い、相手のホストやルーターなどと通信可能かどうか調べる

`ping HOST`
