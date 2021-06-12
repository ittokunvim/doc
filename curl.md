# Curlコマンド

色々使う場面も多いのでメモる

### 基本

`curl URL`

出力する

`curl URL > 出力先`

`curl -o PATH URL`

進捗状況やエラーを表示しない

`curl -s -o Path URL`

ただし、エラーは表示したい

`curl -sS -o Path URL`

SSL接続の証明書エラーをスキップ

`curl -k URL`

URLのファイル名でダウンロード

`curl -O URL/save.html`

リダイレクト有効

`curl -L URL`

### デバッグ

HTTPレスポンスヘッダー取得

`curl -I URL`

