---
title: JavaScript - 監聽事件
date: 2020/07/16
tags:
  - eventListener
  - callback function
  - event
  - onSubmit
categories: JavaScript
description: 了解 eventListener 與 callback function
---

## 學習方向

1. 介面:如何改變事件
2. 事件:如何監聽事件並做出反應
3. 資料:如何跟 sever 交換資料

---

## eventListener 與 callback function

### eventListener

給一個屬性跟屬性值，再用 `document.querySelector` 選一個元素並命名為 app ，透過點擊 hello world 做出彈跳視窗，那想做出彈跳視窗必須偵聽事件 `addEventListener` ，在 `addEventListener` 前面是事件的動作例如點擊或是按鍵盤...等等，那後面要傳入一個函式。

### callback function

因為不知道使用者甚麼時候才會觸發函式(做甚麼動作)，所以我們必須跟瀏覽器說一但點擊了甚麼按鈕或是做了什麼動作(事件)，就幫我呼叫那個函式(觸發)，那呼叫函式就是 `callback function`

EX:

```html
<div class="app">
  <a href="#">hello world</a>
</div>

<!-- ------------------------------------------->
<!-- 匿名函式 比較常見寫法-->
<script>
  let app = document.querySelector('.app')
  app.addEventListener('click', function () {
    alert('hello world')
  })
</script>
<!--------------------------------------------->

<script>
  let app = document.querySelector('.app')
  app.addEventListener('click', onClick)
  function onClick() {
    alert('hello world')
  }
</script>
```

![](https://i.imgur.com/BYG7UOJ.png)

---

## event(e)

當我們觸發事件時，瀏覽器就會把參數(event 縮寫為 e)帶入函示裡面。
使用 `console.log(e)` ，可以看到很多關於 e 的參數。

```html
<div class="app">
  <a href="#">hello world</a>
</div>

<script>
  let app = document.querySelector('.app');
  app.addEventListener('click',function(e){
  	console.log(e);
</script>
```

![](https://i.imgur.com/WqDxtOD.png)

改用 `console.log(e.target)`
![](https://i.imgur.com/TFYrlsD.png)

當然如果想知道按鍵參數的話可以這樣寫
先改為全域 window

```html
<input type="text" class="app" />

<script>
  window.addEventListener('keypress', function (e) {
    console.log(e.keyCode)
  })
</script>
```

![](https://i.imgur.com/A0uZqfO.png)
![](https://i.imgur.com/lDm6hKO.png)
分別按下 a、b、c，可以知道 a = 97 、b = 98、c = 99

---

## 表單事件處理 onSubmit

這可以應用在表單二次確認密碼的時候
寫出一個簡單的表單，並在判斷式內擷取密碼的值( value )

```html
<form class="login">
  username:<input type="text" />
  <br />
  password:<input type="password" class="password" />
  <br />
  password:<input type="password" class="password1" />
  <br />
  <input type="submit" />
</form>

<scrip>
  let login = document.querySelector('.login');
  login.addEventListener('submit',function(e){ let psw =
  document.querySelector('.password'); let psw1 =
  document.querySelector('.password1'); if(psw.value !== psw1.value){
  alert('密碼錯誤'); e.preventDefault(); }else{ alert('密碼正確'); } })
</scrip>
```

[codepen](https://codepen.io/gleofgja/pen/wvGGdgy?editors=1010)
![](https://i.imgur.com/ES5AVUI.png)

---

## 事件傳遞機制-捕獲跟冒泡事件

```html
<div class="one">
  <div class="two">
    <button>click</button>
  </div>
</div>

<script>
  addEvent('.one')
  addEvent('.two')
  addEvent('button')
  function addEvent(className) {
    document.querySelector(className).addEventListener('click', function () {
      console.log(className)
    })
  }
</script>
```

[codepen](https://codepen.io/gleofgja/pen/dyMMWVO?editors=1011)

![](https://i.imgur.com/iSr9A3f.png)
當我點擊綠色區塊的時候只會跳出 one ，但點擊 click 時就會跳出上圖，但我明明只點 click 為甚麼會連帶影響到其他 class 區塊 ?

因為這就是事件傳遞機制的捕獲跟冒泡事件

[Huli 文章](https://blog.techbridge.cc/2017/07/15/javascript-event-propagation/)
下圖來源為 Huli 的文章
![](https://i.imgur.com/V2KLVIV.png)
以下這段話擷取自 Huli 文章

> DOM 的事件在傳播時，會先從根節點開始往下傳遞到 target，這邊你如果加上事件的話，就會處於 CAPTURING_PHASE，捕獲階段。
> target 就是你所點擊的那個目標，這時候在 target 身上所加的 eventListenr 會是 AT_TARGET 這一個 Phase。
> 你在點擊那一個 td 的時候，這一個點擊的事件會先從 window 開始往下傳，一直傳到 td 為止，到這邊就叫做 CAPTURING_PHASE，捕獲階段。
> 接著事件傳遞到 td 本身，這時候叫做 AT_TARGET。
> 最後事件會從 td 一路傳回去 window，這時候叫做 BUBBLING_PHASE，冒泡階段。
> 所以，在看一些講事件機制的文章的時候，都會看到一個口訣：先捕獲，再冒泡

在監聽時函式後面加上 true 就是捕獲，false 是冒泡

```javascript
addEvent('.one')
addEvent('.two')
addEvent('button')

function addEvent(className) {
  document.querySelector(className).addEventListener(
    'click',
    function () {
      console.log(className, '捕獲')
    },
    true
  )

  document.querySelector(className).addEventListener(
    'click',
    function () {
      console.log(className, '冒泡')
    },
    false
  )
}
```

[codepen](https://codepen.io/gleofgja/pen/YzqqVjQ?editors=1011)

當我點擊 click

![](https://i.imgur.com/g7pwU5s.png)

就算我把順序顛倒過來，它還是會先捕獲在冒泡，跟上圖一樣

---

## [資料來源: [FE102] 前端必備：JavaScript](https://lidemy.com/courses/390588/lectures/9653894)
