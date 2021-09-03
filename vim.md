# About Vim

- [vi](https://ja.wikipedia.org/wiki/Vi) から派生し、発展した高機能な[テキストエディタ](https://ja.wikipedia.org/wiki/テキストエディタ)
- 開発者はオランダ人のプログラマーBram Moolenaar

## Feature

- 軽い

## nvim

- 拡張性と使いやすさのために刷新したVim派生テキストエディタ

## Plugins

- preservim/nerdtree

> repo = https://github.com/preservim/nerdtree
>
> ディレクトリツリー。`m`を押すことでファイル操作が可能

```toml
[[plugins]]
repo = 'scrooloose/nerdtree'
hook_add = '''
  let NERDTreeShowHidden=1
    nnoremap <silent><C-a> :NERDTreeFind<CR>:vertical res 30<CR>
'''
```

> [vim-plugin NERDTree で開発効率をアップする！](https://qiita.com/zwirky/items/0209579a635b4f9c95ee)

