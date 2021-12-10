## PartⅢ コードの再構成

- プログラムの主目的と関係のない「無関係の回問題」を抽出する
- コードを再構成して、一度に１つのことをやるようにする
- 最初にコードを言葉で説明する。その説明をもとにしてきれいな解決策を作る

### Chapter10 無関係の下位問題を抽出する

- エンジニアリングとは、大きな問題を小さな問題に分割して、それぞれの解決策を組み立てることに他ならない

1. 関数やコードブロックを見て「このコードの高レベルの目標は何か？」と自問する
2. コードの各行に対して「高レベルの目標に直接的に効果があるのか？あるいは、無関係の下位問題を解決しているのか？」と自問する
3. 無関係の下位問題を解決しているコードが相当量あれば、それらを抽出して別の関数にする

#### 入門的な例：findClosesLocation()

```javascript
// x （コードが長い）
// return the element of 'array' closest to the given latitude and longitude
// it assumes that the earth is a perfect sphere
var findClosesLocation = function(lat, lng, array) {
  var closest;
  var closest_dist = Number.MAX_VALUE;
  for (var i=0; i<array.length; i+=1) {
    // convert two points to radians
    var lat_rad = radians(lat);
    var lng_rad = radians(lng);
    var lat2_rad = radians(array[i].latitude);
    var lng2_rad = radians(array[i].longitude);
    
    // using the formula for the second cosine theorem in spherical trigonometry
    var dist = Math.acos(Math.sin(lat_rad) * Math.sin(lat2_rad) +
                         Math.cos(lat_rad) * Math.cos(lat2_rad) *
                         Math.cos(lng2_rad - lng_rad));
    if (dist < closest_dist) {
      closest = array[i];
      closest_dist = dist;
    }
  }
  return closest;
}

// o
var spherical_distance = function(lat1, lng1, lat2, lng2) {
  var lat1_rad = radians(lat1);
  var lng1_rad = radians(lng1);
  var lat2_rad = radians(lat2);
  var lng2_rad = radians(lng2);

  // using the formula for the second cosine theorem in spherical trigonometry
  return Math.acos(Math.sin(lat_rad) * Math.sin(lat2_rad) +
                   Math.cos(lat_rad) * Math.cos(lat2_rad) *
                   Math.cos(lng2_rad - lng_rad));
}

// return the element of 'array' closest to the given latitude and longitude
// it assumes that the earth is a perfect sphere
var findClosesLocation = function(lat, lng, array) {
  var closest;
  var closest_dist = Number.MAX_VALUE;
  for (var i=0; i<array.length; i+=1) {
    // convert two points to radians
    var dist = spherical_distance(lat, lng, array[i].latitude, array[i].longitude);
    if (dist < closest_dist) {
      closest = array[i];
      closest_dist = dist;
    }
  }
  return closest;
}
```

#### 純粋なユーティリティコード

```c++
ifstream ReadFileToString(file_name);

// calculate the file size and allocated that size to the buffer
ReadFileToString.seekg(0, ios::end);
const int file_size = file.tellg();
char* file_buf = new char [file_size];
// read a file into the buffer
ReadFileToString.seekg(0, ios::beg);
ReadFileToString.read(file_buf, file_size);
ReadFileToString.close();
```

#### その他の汎用コード

```javascript
ajax_post({
  url: 'http://example.com/submit',
  data: data,
  on_success: function(response_data) {
    format_pretty(response_data);
  }
});

var format_pretty = function(obj) {
  var str = "{\n";
  for (var key in obj) {
    str += " " + key + " = " + obj[key] + "\n";
  }
  alert(str + "}");
}

// 上記のformat_pretty(obj)が処理できないケース
// - objが普通の文字列（やundefined）だと例外が発生する
// - objがネストしたオブジェクトだとobject Objectのように表示されてしまう
// 書き直し
var format_pretty = function(obj, indent) {
  // processing the null, undefined, string, and non-object
  if (obj == null) return 'null';
  if (obj == undefined) return 'undefined';
  if (typeof obj === 'string') return '"' + obj + '"';
  if (typeof obj !== 'object') return String(obj);
  if (indent === undefined) indent = '';
  // processing the object (non null)
  var str = "{\n";
  for (var key in obj) {
    str += indent + ' ' + key + " = ";
    str +=format_pretty(obj[key], indent + ' ') + "\n";
  }
  return str + indent + '}';
}
```

#### 汎用コードをたくさん作る

- 汎用コードは簡単に共有できるように特別なディレクトリ（例：util/）を用意すると良い
- またプロジェクトから完全に切り離されているから開発もテストも理解するのも楽になる
- SQLデータベース・JavaScriptライブラリ・HTMLテンプレートシステムも同じようなもの

#### プロジェクトに特化した機能

```python
business = Business()
business.name = request.POST['name']

# x
url_path_name = business.name.lower()
url_path_name = re.sub(r"[\.]+", "", url_path_name)
url_path_name = re.sub(r"[^a-z0-9]+", "-", url_path_name)
url_path_name = url_path_name.strip('-')
business.url = "/biz/" + url_path_name

# o
CHARS_TO_REMOVE = re.compile(r"[\.]+")
CHARS_TO_DASH = re.compile(r"[^a-z0-9]+")

def make_url_friendly(text):
  text = text.lower()
  text = CHARS_TO_REMOVE.sub('', text)
  text = CHARS_TO_DASH.sub('-', text)
  return text.strip('-')

business.date_created = datetime.datetime.urcnow()
business.save_to_database()
```

#### 既存のインタフェースを簡潔にする

```javascript
// x コードが汚い
var max_results;
var cookies = document.cookie.split(';');
for (var i=0; i<cookies.length; i++) {
  var c = cookies[i];
  c = c.replace(/^[ ]+/, ''); // delete leading white space
  if (c.indexOf("max_results=") === 0) {
    max_results = Number(c.substring(12, c.length));
  }
}

// o
var max_results = Number(get_cookie("max_results"));

function get_cookie(value) {
  var cookies = document.cookie.split(';');
  for (var i=0; i<cookies.length; i++) {
    var c = cookies[i];
    c = c.replace(/^[ ]+/, ''); // delete leading white space
    if (c.indexOf(value) === 0)
      return c.substring(value.length+1, c.length);
  }
}
```

#### 必要に応じてインターフェースを整える

```python
user_info = { 'username': '...', 'password': '...'}

# x
user_str = json.dumps(user_info)
cipher = Cipher('aes_128_cbc', key=PRIVATE_KEY, init_vector=INIT_VECTOR, op=ENCODE)
encrypted_bytes = cipher.update(user_str)
encrypted_bytes += cipher.final() # flash the current 128-bit block
url = "http://example.com/?user_info=" + base64.urlsafe_b64encode(encrypted_bytes)

# o
def url_safe_encrypt(obj):
  obj_str = json.dumps(obj)
  cipher = Cipher('aes_128_cbc', key=PRIVATE_KEY, init_vector=INIT_VECTOR, op=ENCODE)
  encrypted_bytes = cipher.update(obj_str)
  encrypted_bytes += cipher.final() # flash the current 128-bit block
  return base64.urlsafe_b64encode(encrypted_bytes)

url = "http://example.com/?user_info=" + url_safe_encrypt(user_info)
```

#### やりすぎ

```python
user_info = { 'username': '...', 'password': '...'}
url = "http://example.com/?user_info=" + url_safe_encrypt(user_info)

def url_safe_encrypt_obj(obj):
  obj_str = json.dumps(obj)
  return url_safe_encrypt_str(obj_str)

def url_safe_encrypt_str(data):
  encrypted_bytes = encrypt(data)
  return base64.urlsafe_b64encode(encrypted_bytes)

def encrypt(data):
  cipher = make_cipher()
  encrypted_bytes = cipher.update(data)
  encrypted_bytes += cipher.final() # flash the current 128-bit block
  return encrypted_bytes

def make_cipher():
  return Cipher('aes_128_cbc', key=PRIVATE_KEY, init_vector=INIT_VECTOR, op=ENCODE)
```

#### まとめ

- 本章を簡単にまとめるとプロジェクト固有のコードから汎用コードを分離するということ