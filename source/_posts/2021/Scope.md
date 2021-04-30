---
title: JavaScript - 作用域 ( Scope )
date: 2021/04/08
tags:
  - JavaScrip
  - Scope

categories:
  - JavaScrip
  - Scope
---

最近要面臨面試了，而這些東西都是面試必考的觀念，所以就將這些東西寫成一篇筆記，方便日後回顧。

<!-- more -->

## 全域變數與區域變數

參考自 kuro 大大的 : 0 陷阱！0 誤解！8 天重新認識 JavaScript！

> 1.  其實在 JavaScript 這門語言中，沒有所謂「全域變數」這種東西。更準確地說，我們所說的「全域變數」其實指的是「全域物件」(或者叫「頂層物件」) 的屬性。
> 2.  以瀏覽器來說，「全域物件」指的就是 window，在 node 環境中則叫做 global。
> 3.  所有沒有透過 `var` 宣告的變數都會自動變成全域變數。
> 4.  切分變數有效範圍的最小單位是 `function` ，而這範圍就是 `Scope`。

### 1. 如果在 `function` 內找不到 `var` 宣告的變數，就會一層層往外找，直到找到全域變數為止。

以下示範:

```javascript
var a = 10
function fn() {
  console.log(a) // 10
}

fn()
```

用 `window.a` 看，確定變數 `a` 是全域變數。
![](https://i.imgur.com/fQWf2IW.png)

### 2. 沒有透過 `var` 宣告的變數都會自動變成全域變數。

函式裡面因為沒有使用 `var` 宣告變數 `a` ，所以變數 `a` 會變成全域變數並且直接覆蓋掉外層用 `var` 宣告的 `a`。

```javascript
var a = 10
function fn() {
  a = '全域變數'
  console.log('我是 fn 裡面的 a => ' + a) // "我是 fn 裡面的 a => 全域變數"
}

fn()
console.log('我是 fn 外面的 a => ' + a) // "我是 fn 外面的 a => 全域變數"
```

用 `window.a` 看，確定變數 `a` 是`全域變數`，不是 `var` 宣告的變數 `10`。
![](https://i.imgur.com/YQPnGVT.png)

### 3. 但是如果函式內的 `a` 有用 `var` 宣告呢?

```javascript
var a = 10
function fn() {
  var a = '全域變數'
  console.log('我是 fn 裡面的 a => ' + a) // "我是 fn 裡面的 a => 全域變數"
}

fn()
console.log('我是 fn 外面的 a => ' + a) // "我是 fn 外面的 a => 10"
```

如下圖，用 `window.a` 看，會發現全域變數的 `a` 是` 10`。
![](https://i.imgur.com/nhcXOMi.png)

因為 `var` 的作用域會在 `function` 裡面，所以不會影響到外層的變數 `a` ，但外層宣告的變數 `a` 並沒有被 function 限制住，所以就會變成全域變數，以引用 Kuro 大大的結論：

1. 變數有效範圍 ( scope ) 的最小切分單位是 `function` ( ES6 的 `let` 與 `const` 例外 )
2. 即使是寫在函式內，沒有 `var` 的變數會變成「全域變數」
3. 全域變數指的是全域物件 ( 頂層物件 ) 的「屬性」

[DEMO](https://codepen.io/gleofgja/pen/YzNEKvB?editors=1011)

## 函式與作用域之間的關係

### 1. 全域執行環境 ( Global Level Scope )

先來個最基本的，用 `var` 命名的 `變數 a` 然後賦值為 `全域 a`。

```javascript
var a = '全域 a'
console.log(a)
```

![](https://i.imgur.com/JQudPOG.png)

### 2. 函式與全域作用域 ( Function Level Scope )

然後在 `function` 裡面呼叫 `a 變數`，結果會是 `全域 a` ，因為當函式執行時如果函式內找不到變數就會向外層尋找。

```javascript
var a = '全域 a'

function fn() {
  console.log(a) // 全域 a
}

console.log(a) // 全域 a
fn()
```

如下圖
![](https://i.imgur.com/0EOg1Gk.png)

---

所以在函式內如果找到命名的變數就不會向函式外層尋找，如下

```javascript
var a = '全域 a'

function fn() {
  var a = '區域 a'
  console.log(a) // 區域 a
}

console.log(a) // 全域 a
fn()
```

![](https://i.imgur.com/mh1xKtF.png)

為什麼會先顯示 `全域 a` ?
因為在 24 行我先執行了 `console.log(a)`。
之後 25 行再執行 `fn` 函式，這時候函式才會執行 `function` 裡面的 `console.log(a)`。

---

為了看更清楚，同時在函式外命名兩個變數，但在函式內只命一個 `變數 a`，結果如下。

```javascript
var a = '全域 a'
var b = '全域 b'

function fn() {
  var a = '區域 a'
  console.log('fn 裡面的 => ' + a) //"fn 裡面的 => 區域 a"
  console.log('fn 裡面的 => ' + b) //"fn 裡面的 => 全域 b"
}

console.log('fn 外面的 => ' + a) //"fn 外面的 => 全域 a"
console.log('fn 外面的 => ' + b) //"fn 外面的 => 全域 b"
fn()
```

結果如下，在函式內有找到`變數 a` 就不會向函式外層尋找，但函式內找不到`變數 b` ，所以就會向函式外層尋找`全域 b`。

( 跟前一個例子同理，顯示的順序跟執行的順序一樣，先執行先顯示。 )
![](https://i.imgur.com/NSDYkJf.png)

---

同樣道理，如果我把函式外的 `全域變數 b` 註解掉，那函式內的 b 就會找不到該變數，會顯示為定義，如下圖
![](https://i.imgur.com/E4AcOFQ.png)

---

來點變化題，這會用到 JS 的 hoisting 觀念

```javascript
var a = '全域 a'

function fn() {
  console.log(a) // undefined
  var a = '區域 a'
  console.log(a) // "區域 a"
}

console.log(a) // "全域 a"
fn()
```

結果如下圖
![](https://i.imgur.com/T2e6Dqp.png)

按照剛才觀念，函式內的 a 不是會像外層尋找? 或是在函式內有命名變數了，為什麼還找不到? 為甚麼會顯示為定義?

因為 JS 有 hoisting 變數提升的特性，所以當電腦在讀取的時候會變成下面這樣

```javascript
var a = '全域 a'

function fn() {
  var a
  console.log(a) // undefined

  a = '區域 a'
  console.log(a) // "區域 a"
}

console.log(a) // "全域 a"
fn()
```

第一個變數已經命名了但是沒有賦值，所以會顯示 `undefined` ，第二個變數是已經賦值了，所以會顯示 `value` 值。

[DEMO](https://codepen.io/gleofgja/pen/yLgzWKg?editors=0011)

### 3. 塊級作用域 ( Block Level Scope, ES6 )

以上是用 function 並在 function 內呼叫變數，接下來試用區塊，區塊就是指大括號 `{}` ，像是 if 判段式或是 for 迴圈這種的。

接下來就是用區塊 ( Block ) 不是用 function ，直接看程式碼。

```javascript
var a = 10
if (true) {
  console.log(a) // 10
}
```

![](https://i.imgur.com/MdHI1A4.png)

在區塊裡面沒有命名 `變數 a` ，所以會去外層全域找。

---

在區塊裡面跟外面同時看`變數 a` 的結果。

```javascript
var a = 10
if (true) {
  var a = 20
  console.log('區塊裡面 => ' + a)
}

console.log('區塊外面 => ' + a)
```

用開發者工具查看，會看到 `a` 抓到的值都是 `20`。
![](https://i.imgur.com/OiEPNe5.png)

因為是塊及作用域的關係，所以用 `var` 命名的變數並不會被限制住，會直接覆蓋掉之前相同變數的值。

但這是用 `var` 來命名，如果用 ES6 的 `let` 命名變數的話就會被限制在區塊以內，如下

```javascript
var a = 10
if (true) {
  var a = 20
  let b = 30
  console.log('區塊裡面 => ' + a)
  console.log('區塊裡面 => ' + b)
}

console.log('區塊外面 => ' + a)
console.log('區塊外面 => ' + b)
```

顯示下圖
![](https://i.imgur.com/kpjkZkb.png)

因為在區塊裡面使用 `let` 命名`變數 b` ，所以`變數 b` 就會被限制在區塊裡面，那外層的 `b` 就會找不到。

## 參考資料

[[JS] Scope 作用域](https://medium.com/take-a-day-off/js-scope-%E4%BD%9C%E7%94%A8%E5%9F%9F-ee536640963b)
[[筆記] JavaScript 變數宣告與作用域](https://kuro.tw/posts/2015/07/08/note-javascript-variables-declared-with-the-scope-scope/)
[block](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/block)
[重新認識 JavaScript: Day 10 函式 Functions 的基本概念](https://ithelp.ithome.com.tw/articles/10191549)
