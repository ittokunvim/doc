```
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_size = 4
indent_style = space
trim_trailing_whitespace = true
```



## ファイルパターン

| パターン               | 対象                       |
| :--------------------- | :------------------------- |
| `[*]`                  | 全てのファイル             |
| `[*.md]`               | 特定の拡張子のファイル     |
| `[*.{less,css,scala}]` | 複数の拡張子のファイル     |
| `[Makefile]`           | 特定のファイル名のファイル |

## 設定項目

| 項目                     | 内容                                                   |
| :----------------------- | :----------------------------------------------------- |
| charset                  | 文字コード                                             |
| end_of_line              | 改行コード                                             |
| insert_final_newline     | ファイル末尾に空行を挿入するか                         |
| indent_size              | インデントのサイズ                                     |
| indent_style             | インデントはタブかスペースか                           |
| trim_trailing_whitespace | 行末尾のホワイトスペース（空白文字）を削除するかどうか |