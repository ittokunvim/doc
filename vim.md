# Vimの操作（忘れそうなやつ）

Aで行末で挿入モード

## 移動コマンド

gt タブ移動

## 削除コマンド

d　数値　モーション

dwで次の単語まで削除

d$で行末まで削除

## やり直しコマンド

u 直前の変更を取り消し

U　行の変更を取り消し

C-r　取り消しを取り消し

r　置き換え

R　単語置き換え

cw　単語変更、挿入

C-g　ステータス確認

## 検索

/search_word　search_wordに移動

n　で次の候補に移動できる。

?search_word　/とは逆に検索

C-o　移動の取り消し

C-i　移動の取り消しの取り消し

%　括弧で入力し、その対応する括弧に移動

## 複数置き換え

:#,#s/old/new/g　#~#の間で置き換え

:%s/old/new/g　ファイル全体で置き換え

:%s/old/new/gc　確認をとりながら置き換え

## コマンドモード

:! cmd　でコマンド実行

1. ヴィジュアルモードで範囲を指定
2. :w FILENAME　すると指定した範囲をFULENAMEに書き込んで保存

:r FILENAME　でファイルの内容を埋め込み

:tabe FILENAME で新しいファイルをtabで表示

## オプションの設定

:set ic　(ignore case)大文字小文字を区別しない

:set hls 　(hlsearch)色を付ける

解除するには、noic, nohlsearch(先頭にnoをつける)