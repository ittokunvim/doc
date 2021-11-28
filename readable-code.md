# リーダブルコードまとめ

> より良いコードを書くためのシンプルで実践的なテクニック

## Chapter 1

- コードは理解しやすくなければならない

```c
// x
for (Node* node = list->head; node != NULL; node->next)
  Print(node->data);

// o
Node* node = list->head;
if (node == NULL) return;

while (node->text != NULL) {
  Print(node->data);
  node = node->next;
}
if (node != NULL) Print(node->data);
```

- コードは他の人が最短時間で理解できるように書かなければいけない

## Chapter 2

- 名前に情報を詰め込む
- 明確な単語を選ぶ
  - getではなく状況に応じてfetch, downloadなどを使う
- 汎用的な名前を避ける
  - 理由があれば別
- 抽象的な名前よりも具体的な名前を使う
  - ServerCanStart()よりもCanListenOnPort()の方が明確
- 接尾辞や接頭辞を使って情報を追加する
  - 後ろに\_ms、 前にtable\_、などをつける
- 名前の長さを決める
  - 長すぎも良くないが、短すぎも良くない
- 名前のフォーマットで情報を伝える
  - アンダーバーや大文字を使う

## Chapter 3

### filter()

``` javascript
results = Database.all_objects.filter('year <= 2011')

// これだとyearが2011以上の場合なのか、2011以上ではない場合なのかわからない
// select()やexclude()などが適当である
```

### clip(text, length)

```javascript
function clip(text, length) {}

// これだとlengthがどういう働きをするのかわからない
// max_lengthや、文字数を意味しているのであればmax_charsなどが良い
```

### 限界値を含めるときはminとmaxを使う

```javascript
// x
const CART_TOO_BIG_LIMIT = 10
// o
const MAX_ITEMS_IN_CART = 10
```

### 範囲を指定するときはfirstとlastを使う

```javascript
// x
console.log(integer_range(start=2, stop=4))
// o
console.log(integer_range(first=2, last=4))

// 下の方が範囲を認識しやすい
```

### 包含・排他的範囲にはbeginとendを使う

```javascript
function eventInRange(begin=today, end=tomorrow) {}
```

### ブール値の名前

```javascript
// x
read_password = true
// o
need_password = true
// ▲
disable_ssl = false
// o
use_ssl = true

// 頭にis, has, can, shouldなどをつけることも多い


```

### ユーザの期待に合わせる

```javascript
// getで始まるメソッドはメンバの値を返すだけの「軽量アクセサ」であるという認識で使うようにする
// sizeと入る関数も同様に軽くした方が良い
```

### 複数の名前を検討する

## Chapter 4 美しさ

美しさとは、段落の長さ、横幅、順番、のことである。

### 一貫性のある簡潔な改行位置

```java
// x
public class PerformanceTester {
  public static final TcpConnectionSimulator wifi = new TcpConnectionSimulator(
  500, // kps
  80, // millisecs latency
  200, // jitter
  1); // packet loss %
}

// o
public class PerformanceTester {
  public static final TcpConnectionSimulator wifi = new TcpConnectionSimulator(
  500, // kps
  80,  // millisecs latency
  200, // jitter
  1);  // packet loss %
}

/* インデントを揃えると見やすくなる */

public class PerformanceTester {
  // TcpConnectionSimulator(throughput, latency, jitter, packet_loss);
  //                        [kbps]      [ms]     [ms]    [percent]  
  public static final TcpConnectionSimulator wifi =
    new TcpConnectionSimulator(500,     80,      200,    1);
}

/* 簡潔に書くとこうなる */
```

### メソッドを使った整列

```javascript
// change partial_name like Doug Adams to Mr. Douglas Adams
// if it can't, add description to error 

DatabaseConnection database_connection;
string error;
assert(hoge);
assert(hoge1);
assert(bar1);
assert(baz);
assert(hoge);
...
// こうも一列に並んでしまうと見にくくなる
// 改善するには、ヘルパーメソッドを使用するか、インデントを整えるか、する
```

### 縦の線をまっすぐにする

```javascript
// x
CheckFullName('Doug Adams', 'Mr. Douglas Adams', '');
CheckFullName('John doe', 'Ms. John doe', '');
CheckFullName('Art titum', 'Mr. Art Titum', 'no match found');
CheckFullName('Duke Ellington', 'Mr. Duke', 'more than one result');
// o
CheckFullName('Doug Adams',     'Mr. Douglas Adams', '');
CheckFullName('John doe',       'Ms. John doe',      '');
CheckFullName('Art titum',      'Mr. Art Titum',     'no match found');
CheckFullName('Duke Ellington', 'Mr. Duke',          'more than one result');
```

### 宣言をブロックにまとめる

```c++
// x
class FrontendServer {
  public:
  	FrontendServer();
    void ViewProfile(HttpRequest* request);
    void OpenDatabase(string location, string user);
    void SaveProfile(HttpRequest* request);
    string ExtractQueryParams(HttpRequest* request, string params);
    void ReplyOk(HttpRequest* request, string html);
    void findFriends(HttpRequest* request, string error);
    void ReplyNotFound(HttpRequest* request, string error);
    void CloseDatabase(string location);
    ~FrontendServer();
}
// o
class FrontendServer {
  public:
  	FrontendServer();
    ~FrontendServer();

    // Handler
    void ViewProfile(HttpRequest* request);
    void SaveProfile(HttpRequest* request);
    void findFriends(HttpRequest* request, string error);

		// Utility of request and reply
    string ExtractQueryParams(HttpRequest* request, string params);
    void ReplyOk(HttpRequest* request, string html);
    void ReplyNotFound(HttpRequest* request, string error);
  
    // Database Helper
    void OpenDatabase(string location, string user);
    void CloseDatabase(string location);

}
```

### コードを段落に分割する

```python
# Import to user mailer. Check against the system's users
# and display users list who have not yet become friends

# x
def suggest_new_friends(user, email_password):
  friends = user.friends()
  friend_emails = set(f.email for f in friends)
  contacts = import_contacts(user.email, email_password);
  contact_emails = set(c.email for c in email_password)
  non_friend_emails = contact_emails - friend_emails
  suggested_friends - User.objects.select(email_in=non_friend_emails)
  display['user'] = user
  display['friends'] = friends
  display['suggested_friends'] = suggested_friends
  return render('suggested_friends.html', display)

# o
def suggest_new_friends(user, email_password):
  # get email address of the users friends
  friends = user.friends()
  friend_emails = set(f.email for f in friends)
  # import all email address from users mail account
  contacts = import_contacts(user.email, email_password)
  contact_emails = set(c.email for c in email_password)
  # find user have not yet become friends
  non_friend_emails = contact_emails - friend_emails
  suggested_friends - User.objects.select(email_in=non_friend_emails)
  # display page
  display['user'] = user
  display['friends'] = friends
  display['suggested_friends'] = suggested_friends
  
  return render('suggested_friends.html', display)
  
```

## Chapter 5 コメントすべきことを知る

- コメントするべきでは「ない」ことを知る
- コードを書いている時の自分の考えを記録する
- 読み手の立場になってないが必要になるかを考える

### コメントするべきではないこと

```c++
// わざわざ書くことではない
// Define Account class
class Account {
  public:
  // constructor
  Account();
  // set new value to profit
  void SetProfit(double profit);
  // return profit from this Account
  double GetProfit();
};
```

### 自分の考えを記録する

```javascript
// このデータだとハッシュテーブルよりもバイナリツリーの方が40%速かった
// 左右の比較よりもハッシュの計算コストの方が高いようだ

// TODO: あとで手をつける
// FIXME: 既知の不具合があるコード
// HACK: あまり綺麗じゃない解決策
// XXX: 危険！　大きな問題がある

const MAX_THREADS = 8 // enough value of [>= 2 * num_proccessors]
```

### 読み手の立場になって考える

```python
def GenerateUserReport():
  # このユーザのロックを獲得する
  ...
  # ユーザの情報をDBから読み込む
  ...
  # 情報をファイルに書き出す
  ...
  # このユーザのロックを解放する
```





