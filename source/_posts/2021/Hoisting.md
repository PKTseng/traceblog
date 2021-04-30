---
title: JavaScript - Hoisting 提升
date: 2021/03/27
tags:
  - JavaScrip
  - Hoisting

categories:
  - JavaScrip
  - Hoisting
---

今天看到澎澎的教學影片，覺得觀念清晰好懂，就紀錄一下這重要觀念。

在 JavaSctip 裡面如果故意把宣告變數擺在最後面，它仍就會因為 Hoisting 的效果被放到最前面。
( 注意我只說宣告變數 ( `var a` )，沒說變數賦值 ( `a = 10` ) )
<!-- more -->
## 變數的 Hoisting
先來看看最基本的變數宣告
把值賦予到 `a` 變數上，然後在印出來。
```javascript
var a = 10 //宣告變數+變數賦值
console.log(a) //10
```
看起來沒甚麼很正常的顯示
![](https://i.imgur.com/2rDOBI6.png)


如果我把宣告變數移到下面的話會顯示甚麼?
```javascript
console.log(a)
var a = 10 //undefined
```
會顯示 `undefined` 。
![](https://i.imgur.com/A2qvpOc.png)


為什麼會這樣?

因為 JavaScript 的特性，變數的宣告會提升 ( Hoisting )，所以當瀏覽器在讀取程式碼時，會變成下面這樣。
```javascript
//這是瀏覽器讀取後的
var a //宣告變數
console.log(a) //undefined
a = 10 //變數賦值
```
![](https://i.imgur.com/ez0GKJ0.png)

`undefined` 的意思就是我已經宣告這個變數了，但是變數沒有被賦值，所以會顯示 `undefined`。

那在換個寫法，`宣告` 跟 `賦值` 下上對調。
```javascript
a = 10 //變數賦值
console.log(a) //10
var a //宣告變數
```
![](https://i.imgur.com/Nbyz9Jk.png)

這樣可以讀到值，為什麼?

因為 JavaScript 的特性，變數的宣告會提升 ( Hoisting )，所以當瀏覽器在讀取程式碼時，會變成下面這樣。
```javascript
//這是瀏覽器讀取後的
var a //宣告變數
a = 10 //變數賦值
console.log(a) //10
```
![](https://i.imgur.com/FoJvksj.png)

不過宣告跟賦值下上對調這樣的寫法在一般開發過程中是不被允許的，正常情況下，當我們在使用某個變數之前一定要先宣告變數，這是必須養成的好習慣。

[DEMO](https://codepen.io/gleofgja/pen/dyNMGrm?editors=0012)

## 函式的 Hoisting
上面講變數的宣告，接下來講函式的宣告。

### 1. 陳述式
先宣告一個陳述式的函式再呼叫。
```javascript
function fn(){ //宣告函式
  console.log('Hello') //Hello
}

fn() //呼叫函式
```
![](https://i.imgur.com/WUlijrL.png)

會正常印出來。

但如果我把 `fn()` 宣告挪到函式前面的話呢?
```javascript
fn()
function fn(){
  console.log('Hello') //Hello
}
```
![](https://i.imgur.com/irTTtSx.png)

一樣可以正常顯示，為甚麼?
因為函式的宣告等同於上面變數的宣告，會因為 JavaScript Hoisting 的特性被移到最上方。

### 2. 表達式
上面的宣告是**陳述式**，那改成**表達式**呢?
```javascript
fn()
var fn = function(){
  console.log('Hello') // fn is not a function 
}
```
![](https://i.imgur.com/QbarxaO.png)

會顯示 `fn is not a function` ，上面這段在瀏覽器讀取程式碼的時候會變成下面這樣。
```javascript
var fn 
fn()
fn = function(){
  console.log('Hello') // fn is not a function 
}
```
![](https://i.imgur.com/WW7URJz.png)

---
為了讓比對更清楚我把變數的跟這個函式例子放一起。
```javascript
var fn // var a

fn() // console.log(a)

fn = function(){        // a = 10
  console.log('Hello') 
}
```
會發現只有變數的宣告被提升，但沒有被賦值，所以在執行的時候就讀不到資料。

[DEMO](https://codepen.io/gleofgja/pen/zYNqrXZ?editors=0012)
## 參考資料
[JavaScript 網頁前端工程入門：Hoisting 宣告提升 By 彭彭](https://www.youtube.com/watch?v=xM2Oqb-sdTk)