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