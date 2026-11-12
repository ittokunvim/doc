# リポジトリ指示

## リポジトリ構成

- このリポジトリは、Markdown 形式のドキュメントと、その一覧を表示する静的サイトで構成されている。
- トップページは `index.html`、一覧表示処理は `script.js`、スタイルは `style.css` で管理する。
- 公開するドキュメントのメタデータは `data.json` で管理する。

## 記事の追加・更新

- 記事ディレクトリ名は `data.json` の `slug` と同じ名前にする。
- 記事ファイル名は `index.md` にする。
- 画像などの記事用ファイルは、該当する記事ディレクトリ内に保存する。
- `data.json` の日付は `YYYY-MM-DD` 形式で記載する。
- 日付のみの文字列を扱う場合、タイムゾーンによる日付ずれを避けるため、`new Date("YYYY-MM-DD")` に依存しない。

## 実装

- JavaScript と CSS のインデントにはスペース 2 個を使用する。
- 既存の命名、コメント、およびコードスタイルを維持する。
- `data.json` の取得処理では、HTTP エラー・通信失敗・JSON 解析失敗を適切に処理する。
- 利用者に影響する読み込み失敗は、コンソール出力だけでなく画面上でも分かるようにする。
- リンクなどの操作要素を追加・変更する場合は、キーボード操作時の `:focus-visible` による視覚的なフォーカス表示を維持する。

## Issue と Pull Request

- 不具合報告は `.github/ISSUE_TEMPLATE/bug_report.yml`、機能追加・改善提案は `.github/ISSUE_TEMPLATE/feature_request.yml` の形式に従う。
- Pull Request の説明は `.github/PULL_REQUEST_TEMPLATE.md` の見出しとチェックリストを維持する。
- Issue の解決方法を提示するときは、適切な英語のコミットメッセージも併せて提示する。
