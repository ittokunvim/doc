# 俺流のBevyとLDtkを組み合わせたゲームのセットアップ

この記事ではRustで作られたゲームエンジン`Bevy`と、2Dレベルエディタである`LDtk`を組み合わせたゲームのセットアップについて説明しています。

また`Bevy`で`LDtk`を使用するために`bevy_ecs_ldtk`というパッケージを使用しています。

https://bevyengine.org/

https://ldtk.io/

https://github.com/Trouv/bevy_ecs_ldtk

## 依存関係

ゲームを動作させるために以下のパッケージのバージョンを使用しています。

バージョンが違うと動作しないかもしれません。

```toml
bevy = "0.14.2"
bevy_ecs_ldtk = "0.10.0"
```

## ディレクトリ構造

ディレクトリ構造は以下の通り。

```
bevy_ldtk_setup
├── Cargo.lock
├── Cargo.toml
├── LICENSE
├── README.md
├── assets
│   ├── bevy_ldtk_setup.ldtk
│   ├── fonts
│   │   ├── FiraMono-Medium.ttf
│   │   └── FiraSans-Bold.ttf
│   └── images
│       ├── player.png
│       ├── thumbnail.png
│       └── tileset.png
└── src
    ├── gameover.rs
    ├── ingame.rs
    ├── main.rs
    └── mainmenu.rs
```

`assets`ディレクトリ下にフォントや画像、LDtkプロジェクトファイルが保存されています。

`src`ディレクトリ下にはゲームを動作させるためのソースコードが保存されており、ゲームの状態ごとにファイルを分けています。

## ゲーム概要

迷路ゲームでプレイヤーを操作してゴールを目指すものとなっています。

ゲーム自体は以下のURLにあるチュートリアルをそのまま使用しています。

読むと`bevy_ecs_ldtk`の基本的な使い方を楽しく学ぶことができるので結構おすすめ。

https://trouv.github.io/bevy_ecs_ldtk/v0.10.0/tutorials/tile-based-game/index.html

## ソースコード

ソースコードはGitHubに保存しています。

https://github.com/ittokunvim/bevy_ldtk_setup
