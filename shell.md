# Shellメモ

## 一覧

- ffmpeg
- youtube-dl
- 

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

