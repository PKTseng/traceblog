---
title: JavaScript - 執行環境
date: 2020/06/13
tags: 執行環境
categories: JavaScript
description: 介紹 Javascript 如何執行跟作用域
---

JavaScript 是直譯式語言
當 JavaScript 在函示內找不到變數就會向外查找
window === this
但 this 會隨執行環境而有所不同

## 語法作用域 (Lexical scope)

```javascript
var value = 1
function fn1() {
  console.log(value) // 語法作用域：1
  // 動態作用域：2
}
function fn2() {
  var value = 2
  fn1()
}
fn2()
```

1. **語法作用域的順序:**
   (因為 JS 式語法作用域，所以會跑這個步驟)fu2 執行 value 值就會變 2 ，在執行 fn1 ，因為裡面沒有 value 值所以會向外查找全域變數 value = 1，函式執行完結果為 1
2. **動態作用域的順序:**
   全域賦予 value=1，這時候會執行 fn2 ，並且重新定義 value = 2 ，再執行 fn1 ，這時會開始查找 value 值在哪裡，這時因為函式調用的時候才會決定它的作用域，並向上一層函式查找宣告的變數值

   ***

## 範圍鍊

```javascript
var person = '老媽'
function sayHi() {
  console.log('hi ' + person)
}
function doMorningWork() {
  var person = '老爸'
  function meetAuntie() {
    var person = '漂亮阿姨'
    console.log('哈囉～ ' + person)
  }
  // sayHi();
  //meetAuntie();
}
sayHi()
//doMorningWork();  // 執行
```

因為 sayHi function 裡面沒有 person 變數，所以會向外尋找
![](https://i.imgur.com/lATjYBE.png)

```javascript
var person = '老媽'
function sayHi() {
  console.log('hi ' + person)
}
function doMorningWork() {
  var person = '老爸'
  function meetAuntie() {
    var person = '漂亮阿姨'
    console.log('哈囉～ ' + person)
  }
  sayHi()
  //meetAuntie();
}
//sayHi();
doMorningWork() // 執行
```

doMorningWork 函式雖然有 person 變數，但不會影響到 sayHi 函式的範圍練，所以 sayHi 函式一樣會向外尋找 person 變數
![](https://i.imgur.com/lbU8OCA.png)

```javascript
var person = '老媽'
function sayHi() {
  console.log('hi ' + person)
}
function doMorningWork() {
  var person = '老爸'
  function meetAuntie() {
    var person = '漂亮阿姨'
    console.log('哈囉～ ' + person)
  }
  // sayHi();
  meetAuntie()
}
//sayHi();
doMorningWork() // 執行
```

因為 meetAuntie 函式本身就有 person 變數，所以不會像尋找，結果為 哈囉~ 漂亮阿姨
如果把 var person = '漂亮阿姨'; 註解掉，那 person 變數會向外尋找。結果為 哈囉~老爸

#### 論是: 只要函式內沒找到相對應的變數，就會像向外一層尋找相對應的變數，直到找到為止

---

## 提升

![](https://i.imgur.com/uXG14Oe.png)
先想像記憶體是成對的，左邊的格子表示 key，右邊是 value。
再創造環境的時候，會先把 a (變數)放到記憶體裡面(左邊格子)，但這時候還不會給 a 值，所以用 console.log 的時候會 defined ，等到執行時才會把 1 套到 a 裡面。

所以執行環境的時候會先創造環境，創造環境會先把程式碼裡面的變數全部挑出來並存在記憶體上，這個動作稱為"提升 Hoisting"，在這個階段還不會給他值，所以如果在此時去取用這些變數的話，值會是 undefined。到執行環境的時候才會賦予它的值

![](https://i.imgur.com/GRULStI.png)

再創造階段 a 是沒有值的，所以會顯示 undefined，直到宣告階段才會把值帶入 。
但是函式會把整個函式內容都先載入，所以**函式再創造階段就已經可以運行了**。

```javascript
var ming //創造階段
ming = '小名' //執行
console.log('ming')

callName()

function callName() {
  console.log('呼叫小名')
}
//會等於下列
//-----------------------
//創造階段
function callName() {
  console.log('呼叫小名')
}
//執行
callName()
```

![](https://i.imgur.com/I8kQ3ob.png)

### 函式表達式寫法:

```javascript
callName() //這時候的 callName 是還沒有被定義的
var callName = function () {
  console.log('呼叫小名')
}
```

輸出如下圖:
![](https://i.imgur.com/32RDACz.png)

```javascript
//創造階段
var callName(); //這時候 callName 被定義了但沒給值，所以會undefine
//執行
callName = function(){ //這時 function 已經被賦予到 callName  這個函式上
    console.log('呼叫小名');
    }

 callName(); //才可呼叫
```

![](https://i.imgur.com/ddWNmYt.png)

### 範例:

```javascript
// var callName = function () {
//   console.log('呼叫小明 2');
// }
// function callName() {
//   console.log('呼叫小明 1');
// }
// callName();
//以上為原式
//-----------------------------------
//拆解過後
function callName() {
  // 首先函式優先 創造階段
  console.log('呼叫小明 1')
}
var callName //第2階段才把變數往前移
callName = function () {
  //因為變數往前移的關係，這時 function 已經被賦予到 callName  這個函式上
  console.log('呼叫小明 2')
}
//執行
callName()
```

![](https://i.imgur.com/uPdFhSw.png)

## 範例:

```javascript
//創造，函式陳述式優先創造
function callName() {
  console.log('小明')
}

callName() // 第一次執行
function callName() {
  console.log('杰倫')
}
```

![](https://i.imgur.com/FwfUh7L.png)

## 拆解&分析:

```javascript
// 創造
function callName() {
  console.log('小明')
}
function callName() {
  console.log('杰倫')
}
// 執行
callName() // 第一次執行
callName() // 第二次執行
```

兩個函式長一樣，後面得值會蓋掉前面的值

### 測驗分析:

```javascript
function whosName() {
  if (name) {
    name = '杰倫'
  }
}
var name = '小明'
console.log(name)
whosName()
```

因為創造階段，函式陳述式優先創造，變數 name 只生出記憶體，並未賦予值執行階段，呼叫 whosName 的函式時，name 向外查找 name 變數，但未賦予值，所以在 whosName 裡面的 name 被賦予為"杰倫"的值
函式跟一般變數不太一樣，函式陳述式在創造環境階段會被優先載入，記憶體在這個階段就會有函式的完整內容。所以函式在創造環境階段就已經可以被運行。

## Not Defined VS undefined

```
var a ;
console.log(a) //輸出 undefined
```

因為記憶體已經有 a 了，但沒有賦值，所以會跳 undefined
同理，記憶體沒有 a 就會跳 Not Defined

```
//如果要賦予空值要寫
var a = null;
```

---

## 執行緒與同步、非同步

JavaScript 是單執行序的語言

```javascript
function eatBreakfast() {
  console.log('吃早餐')
}
function washingPlate() {
  console.log('洗餐盤')
}
function callSomeone(someone) {
  console.log('打給' + someone)
  setTimeout(function () {
    //這段為非同步，而非同步的任務會移到事件佇列
    console.log(someone + '回電')
  }, 1000) //就算這邊秒數調成0秒，也不會優先執行
}
function doWork() {
  var auntie = '漂亮阿姨'
  eatBreakfast()
  callSomeone(auntie)
  washingPlate()
}
doWork()
```

![](https://i.imgur.com/2aFzBGJ.png)

同步概念來看的話，這三個概念是依序執行的，不會有早餐沒吃完就跳到洗碗盤去

![](https://i.imgur.com/iVYdmVA.png)
![](https://i.imgur.com/WYchUh0.png)

---

執行順序為:

1. do work
2. 吃早餐
3. 打給漂亮阿姨，但因為裡面有 SetTimeout 事件，所以會移到"事件佇列"裡面
4. 洗碗
5. 直到 do work 執行完後才會再去執行 SetTimeout 函式
   ![](https://i.imgur.com/aNRGXtW.png)

---

## [參考資料: JavaScript 核心篇](https://courses.hexschool.com/courses/enrolled/670037)
