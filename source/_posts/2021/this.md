---
title: JavaScript - this 在 具名函式 & 箭頭函式下的差異。
date: 2021/03/24
tags:
  - JavaScrip
  - this
categories:
  - JavaScrip
  - this
---

以下示範 function & arrow function 的差異。

```javascript
//具名函釋
function test1() {
  console.log(this.name)
}

// 箭頭函式
let test2 = () => console.log(this.name)

window.name = '外層'

const obj = {
  name: 'ken',
}

// 具名函示會看命名變數作用域下的 this
test1() // "外層"
test1.call(obj) // "ken"

// 箭頭函式永遠指向 window
test2() // "外層"
test2.call(obj) // "外層"
```

如果想改變函示內的 this 值可以用 call 方法，但從結果來看，這對箭頭函式來說是無效的。

總結:
test1 具名函示的 this 會指向<font color=#FF0000>跟函示同層作用域下</font>命名變數的 this 值。
test2 箭頭函示的 this 會指向<font color=#FF0000>聲明時</font>所在作用域下的 this 值。

[codePen](https://codepen.io/gleofgja/pen/jOyPdrL?editors=1012)

## 參考資料

[尚硅谷 Web 前端 ES6 教程，涵盖 ES6-ES11](https://www.bilibili.com/video/BV1uK411H7on?p=9)
