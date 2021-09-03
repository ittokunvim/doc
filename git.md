# Git

> untracked filesを消去

```git clean -df```

> reset add

```git reset HEAD .```

> reset commit

```git reset --soft HEAD^```

> reset push

```git revert [<commit>]``` or

`git push -f`

> check configure

```git config -l``` or 
```git config --global -l```

> no changed file

`git update-index --assume-unchanged file_name`
