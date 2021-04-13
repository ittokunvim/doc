
## 定番

```git add -A```

```git commit -m "hoge"```

```git remote add origin URL```

```git push -u origin master```

## 他のブランチでの定番

```git remote add origin URL```

```git branch -M NEW_BRANCH```

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



