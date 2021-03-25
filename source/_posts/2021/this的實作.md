---
title: JavaScript - 箭頭函式實作
date: 2021/03/25
tags:
  - JavaScrip
  - this
  - arrow function
categories:
  - JavaScrip
  - this
  - arrow function
---

當我點擊藍色區塊時會改變顏色

```html
<div id="app"></div>
```

```javascript
// 綁定 DOM
let app = document.querySelector('#app')

// 綁定事件
app.addEventListener('click', function () {
  //計時器
  setTimeout(function () {
    this.style.background = 'red'
  }, 2000)
})
```

但是這樣的執行結果會顯示 `fail` 。
![](https://i.imgur.com/3gtriQM.png)

用 `console.log` 看一下，會發現 `this` 是指向 `window` 的。
![](https://i.imgur.com/teXS5Kp.png)

而 `window` 是沒有 `style` 屬性的，所以會顯示 `undefined。`

要解決這樣的問題就是在計時器外層將 this 命名到一個變數上，然後在計時器內層呼叫。

為甚麼要這麼做?

用 `console.log` 看一下外層的 `this` 。

點擊前
![](https://i.imgur.com/yJkA2ki.png)

點擊兩秒後
![](https://i.imgur.com/dRziXuc.png)

會發現在這一層是有 `background style` 屬性的。

所以計時器在執行到 `self` 時會呼叫到外層含有 `style` 的屬性的 `this` ，這樣就可以改變樣式了。

不過有了箭頭函式後，就不需要這麼麻煩了，因為箭頭函式會指向聲明時所在作用域下的 `this` 值。

```javascript
// 綁定 DOM
let app = document.querySelector('#app')

// 綁定事件
app.addEventListener('click', function () {
  // 箭頭函式是在這一層作用域下聲明的，所以會拿到這一層的 this 值

  // arrow function 計時器
  setTimeout(() => {
    this.style.background = 'red'
  }, 2000)
})
```

[codePen](https://codepen.io/gleofgja/pen/oNBjdPM?editors=1011)

## 參考資料

[尚硅谷 Web 前端 ES6 教程，涵盖 ES6-ES11](https://www.bilibili.com/video/BV1uK411H7on?p=9)
