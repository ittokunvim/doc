# doc

このリポジトリには、私が作成した色々なドキュメントが保存されています。

また公開するドキュメントを`data.json`にまとめています。

JSON: [data.json](data.json)

## 追加方法

記事を追加する際は以下のルールに従って行うこと。

- `data.json`は以下の形式で追加する。

```json
{
    "slug": "how-to-add-article",
    "title": "記事を追加する方法",
    "description": "ここでは記事を追加する方法について書かれています",
    "path": "JUNLE/how-to-add-article/index.md",
    "published": true,
    "createdAt": "2024-10-12",
    "updatedAt": "2024-10-12"
}
```

- ディレクトリ名は`slug`で命名し、ファイル名は`index.md`にする。

- 画像などは作成したディレクトリ下に保存する。

- `README.md`には記事の`title`とリンクを記載して、アクセスできるようにする。

