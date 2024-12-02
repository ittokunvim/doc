# docs

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
    "createdAt": "2024-10-12"
}
```

- ディレクトリ名は`slug`で命名し、ファイル名は`index.md`にする。

- 画像などは作成したディレクトリ下に保存する。

- `README.md`には記事の`title`とリンクを記載して、アクセスできるようにする。

## 目次

### tech

1. [regexp](tech/regexp/index.md)
2. [fontawesome-nextjs-big-icon](tech/fontawesome-nextjs-big-icon/index.md)
3. [ゲームエンジンBevyのセットアップ方法](tech/bevy-setup/index.md)

### slot

1.  [ファンキージャグラー2 | 設定判別](slot/fanky-jaggler2/index.md)
2.  [ハッピージャグラーVⅢ | 設定判別](slot/happy-jaggler-v3/index.md)
3.  [マイジャグラーV | 設定判別](slot/my-jaggler-v/index.md)
4.  [ハッピージャグラーVⅢ | 中押しガイド](slot/happy-nakaoshi/index.md)
5.  [ダンまち2 | 1枚役について](slot/danmachi2-1maiyaku/index.md)
6.  [L戦国乙女4 戦乱に閃く炯眼の軍師 | 設定判別](slot/sengokuotome4-settei/index.md)
7.  [パチスロ からくりサーカス | 設定判別](slot/karakuri-settei/index.md)
8.  [パチスロ からくりサーカス | 機種解析](slot/karakuri-kaiseki/index.md)
9.  [L戦国乙女4 戦乱に閃く炯眼の軍師 | 機種解析](slot/sengokuotome4-kaiseki/index.md)
10. [ハイパーラッシュ | 解析、設定](slot/hyper-rush/index.md)
11. [グランベルム | 設定推測](slot/granbelm-settei/index.md)
12. [グランベルム | 通常時解析](slot/granbelm-tuujou/index.md)
13. [グランベルム | AT時解析](slot/granbelm-at/index.md)

### etc

1. [AWSにRuby on Railsをデプロイする方法](etc/deploy-rails-to-aws/index.md)
2. [Ruby組み込み変数](etc/ruby-variables/index.md)
