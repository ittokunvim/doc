## テストを書く意味

### メリット

- 機能停止に陥るような回帰バグ(Regression Bug: 以前のバグが再発したり機能の追加、変更に副作用が生じたりすること)を防止できる
- コードを安全にリファクタリング（機能を変更せずにコードを改善）できる。
- アプリケーションの設計やシステムの他の部分とのインターフェイスを決めるときにも役立つ。

### その他のメリット

- アプリケーションのコードよりテストコードの方が短くシンプルならば先に書く
- 動作の仕様がまだ固まりきっていない場合は後で書く。
- セキリュティが重要な課題またはセキリュティ周りのエラーが発生した場合、テストを先に書く
- バグを見つけたら、そのバグを再現するテストを先に書き、体制を整える
- リファクタリングするときは先にテストを書く

- テストの表示が変わる

  - test/test_helper.rbに下記を追加

    ```ruby
    require "minitest/reporters"
    Minitest::Reporters.use!
    ```

- Guard自動テスト化

  `bundle exec guard init`

  - Guardfileに変更

    ```ruby
    guard :minitest, spring: "bin/rails test", all_on_start: false do
    ```

    .gitignoreを変更

    `echo "/spring/*.pid" >> .gitignore`

  - `bundle exec guard`で使える。

    