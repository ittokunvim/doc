# Gitコマンド

> リポジトリを複製する

`git clone REPOSITORY_NAME`

> ディレクトリ下をリポジトリにする(初期化)

`git init`

> ファイルを追加する

`git add FILENAME`

> ファイルを移動、名前変更する



## 定番

`git add -A`

```git commit -m "hoge"```

```git remote add origin URL```

```git push -u origin master```

## 他のブランチでの定番

```git remote add origin URL```

```git branch -M NEW_BRANCH``` or `git checkout -b NEW_BRANCH`

```git push -u origin NEW_BRANCH```

## 取り消し

### ローカルの変更取り消し
```git clean -df```

### addを取り消し
```git reset HEAD .```

### commitを取り消し（HEAD^は直前のcommit）
#### 内容ごと
```git reset --hard HEAD^```

#### commitのみ
```git reset --soft HEAD^```

### pushを取り消し
```git revert [<commit>]```

### 設定の確認
```git config -l``` or 
```git config --global -l```

### Branchの削除
```git branch -d DELETE_BRANCH```

### git diffの使い方

`git diff HEAD..リモート名/ブランチ名`

> git pullする前にリモートとの変更点を見る

`git diff`

> git addする前に変更点を見る

### git pullできない時

` git fetch origin main`

> リモートの最新を持ってきて

`git reset --hard origin/main`

> ローカルのmainを、リモートのmainと強制的に合わせる

## git add で新規ファイルのみを追加する

> git addを対話モードで実行し、4: add untrackedを選択する

`git add -i` 

> 元の状態に戻す

`git checkout .`

