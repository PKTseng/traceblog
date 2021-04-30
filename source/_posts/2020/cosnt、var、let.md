---
title: JavaScript - var 、 let 、 const 的差別
date: 2021/01/20
tags:
  - var
  - let
  - const
categories:
  - JavaScript
---

## 前言

每當我們在命名變數的時候，都會有作用域上的困擾，或是不熟悉 var 、 let 、 const 三者之間的差別，導致環境中的變數被互相汙染，甚至影響到全域變數，為釐清這當中的觀念，決定寫一篇文章來幫助自己，方便日後回憶。

<!-- more -->

## var 的宣告

> var = variable 的縮寫

當我們用 `var` 宣告變數並賦值後，如果後面又用相同的變數同樣又被賦值，那後面的值會覆蓋掉前面的值，如下

```javascript
var name = 'ken'

var name = 'kevin'

console.log(name)
```

變數同樣設為 `name` ，但卻顯示後面的值。
![](https://i.imgur.com/edspqWp.png)

那如果用大括號包起來呢 ?
( 這邊用大括號是為了待會的 let 宣告比較，所埋下的伏筆 )

```javascript
var name = 'ken'

{
  var name = 'kevin'
}

console.log(name)
```

![](https://i.imgur.com/s531jyy.png)
結果還是一樣的。

再輸入 `window.name` 查看，發現全域上已經有 `name` 的值了。
![](https://i.imgur.com/ifNVCZs.png)

其實在宣告一個變數的時候，並不是故意要覆蓋掉之前的值，但有時候就這麼的剛好命名到相同的變數名稱。

用 `var` 宣告就等於是全域 ( `window` ) 的宣告，這是 `var` 的一個缺點，為防止這樣的事發生，我們可以用 `function` 包起來，防止變數互相汙染。

### 以下示範用 function 控制 var 的作用域

#### 1. 只在立即函式裡面宣告 var

在 `function` 裡面用 `var` 宣告變數後，分別在 `function` 裡面跟外面用 `console.log` 查看

```javascript
;(function () {
  var functionName = 'kevin'
  console.log('我是 function 裡面的 ' + functionName)
})()

console.log('外面的' + functionName)
```

顯示下圖
![](https://i.imgur.com/duOiXIj.png)

再用 `window.functionName` 查看，會顯示 `undefined`，就代表 `var` 會被限制在 `function` 裡面，不會汙染到外面的相同變數。
![](https://i.imgur.com/gCTG8qA.png)

#### 2. 在立即函式裡、外同時宣告 var

如果不信脫離函式會汙染到全域或是其他變數的話，那在立即函式外面在用 `var` 宣告相同變數，但不同值，然後再用 `window.functionName` 查看全域變數。

```javascript
;(function () {
  var functionName = 'kevin'
  console.log('我是 function 裡面的 ' + functionName)
})()

var functionName = 'ken'
console.log('外面的' + functionName)
```

![](https://i.imgur.com/NNGSXL9.png)
由上圖可知，如果 `var` 脫離了立即函式或是任何函示就會不受控制的污染其他相同變數，甚至是全域變數。

[DEMO](https://codepen.io/gleofgja/pen/MWjxBVQ?editors=1011)

雖然有了 `function` 可以防止 `var` 宣告的變數汙染到其他變數，但除了 `function` 以外的 `for loop` 、`if else` 判斷式也會有不受控制的問題，以下示範

#### for loop

用 `var` 宣告條件，在 scope 裡面跟外面都加上 `console.log`。

```javascript
for (var i = 0; i < 5; i++) {
  console.log('裡面的 i = ' + i)
}
console.log('我是外面的 i = ' + i)
```

外面會顯示 5 是因為最後還會跑一次 `i++`
此時 `i = 5` ，不符合 `i < 5` 所以跳出 `for loop`
![](https://i.imgur.com/jEoMSZ1.png)

#### if else

```javascript
if (true) {
  var name = 'ken'
  console.log(name)
}
console.log(name)
```

![](https://i.imgur.com/J8IDSRA.png)

[DEMO](https://codepen.io/gleofgja/pen/ZEpPMgE?editors=0011)

如果想一次防止變數遭受汙染或是不受控制的話，可以使用下一節要說的 let 宣告。

## let 的宣告

> let 沒有縮寫

上一段提到，如果用 var 宣告的話會不受控制或是汙染到其他變數，不過在 ES6 語法裡面，是有方法可以解決這問題的，就是 let 宣告。

**那 let 跟 var 的差別在於作用域 { }。**

剛才兩個變數都是用 `var` 來做宣告，後面若再用一樣的變數，那變數的值是可以被覆蓋的，但是在 `let` 宣告下是禁止的，`let` 只能遠許一個相同名稱的變數存在，以下示範

```javascript
let letName = 'ken'

{
  let letName = 'kevin'
}

console.log(letName)
```

會顯示 `Uncaught SyntaxError: Identifier 'letName' has already been declared `，用 `name` 命名的變數已經存在了，如下圖
![](https://i.imgur.com/7819U4b.png)

但是 let 是有作用域 ( scope ) 的，就是用 `{ }` 這個大括號，以下示範
![](https://i.imgur.com/UT48xzX.png)

上面介紹 var 那段，用大括號包起了並用 var 宣告相同變數的話，值還是會被後面命名的變數給覆蓋掉，但是在 let 並用 { } 將其中一個相同名稱的變數包起來，就會獨立出來，也不會跳出`Identifier 'letName' has already been declared ` 這樣的 error 訊息，

在 console.log 輸入 window.letName 會顯示 undefined，由此可知全域變數也沒有受到汙染。
![](https://i.imgur.com/55Kmjyc.png)

### 以下示範 let 的作用域

差別只在全域變數不會受到汙染，以下示範。

#### 1. 只在立即函式裡面宣告 let

效果會跟 var 一樣，因為 `var` 在 `function` 裡面是受控制的不會到到處汙染，`let` 是因為 scope `{ }` 的關係，所以也被限制住，scope 外面一樣讀取不到，所以會顯示 `undefined`。

```javascript
;(function () {
  let letFunctionName = 'kevin'
  console.log('我是 function 裡面的 ' + letFunctionName)
})()

console.log('外面的' + letFunctionName)
```

![](https://i.imgur.com/YgAdm1b.png)

用 `window.letFunctionName` 查看，全域一樣沒被汙染。
![](https://i.imgur.com/xP20HGT.png)

#### 2. 在立即函式裡、外同時宣告 let

效果跟 `var` 一樣。

```javascript
;(function () {
  let letFunctionName = 'kevin'
  console.log('我是 function 裡面的 ' + letFunctionName)
})()

let letFunctionName = 'ken'
console.log('外面的' + letFunctionName)
```

![](https://i.imgur.com/GsmnHQT.png)

但是輸入 `window.letFunctionName` 會顯示 `undefined`，全域一樣沒被汙染。

![](https://i.imgur.com/QCbOlqE.png)

也就是說只要有 `let` 宣告加上 `{ }` 的話，就會可以完全控制變數，不需要擔心變數相同名稱，也甭擔心全域變數會受到汙染。

[DEMO](https://codepen.io/gleofgja/pen/xxEBQNe?editors=0001)

## const 的宣告

> const = constant 的縮寫

### const 一旦被賦值後就不能再更改了。

錯誤示範 :

```javascript
const constArry = 10
constArry = 999
console.log(constArry)
```

![](https://i.imgur.com/Krz3cy5.png)

### 但是有個特例

雖然不能更改已經用 const 賦予的值，
但是!! 可以更改<font color=#FF0000>物件或是陣列內的值</font>。

#### 範例一

更陣列內指定的值

```javascript
const constArry = [10, 20, 30]
constArry[0] = 999
console.log(constArry)
```

是可以的。
![](https://i.imgur.com/DEbUzCk.png)

#### 範例二

陣列內整個值換掉

```javascript
const constArry = [10, 20, 30]
constArry = [666 777, 888]
console.log(constArry)
```

是不行的，因為更改的已經是整個變數了，不是變數內的值。
![](https://i.imgur.com/rMHiWiB.png)

[DEMO](https://codepen.io/gleofgja/pen/vYXPvbJ?editors=1011)

## 參考資料

[ES6 基础教学](https://www.youtube.com/watch?v=fJEw4eApm5I&list=PLliocbKHJNwu150Kc7_eEywQBFLTJyPZs&index=2&t=1s)
[JavaScript 核心篇](https://courses.hexschool.com/courses/670037/lectures/11952053)
