# Command

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