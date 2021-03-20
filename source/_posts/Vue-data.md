---
title: Vue - data 必須是函數
date: 2021/02/28
tags:
  - data 函數

categories:
  - Vue
---

## 介紹

在上一篇 Vue 組件化 ( 一 ) 介紹了組件話的觀念跟應用，但沒提到組件化的資料必須要用動態綁定來確保資料的獨立，所以這篇就來介紹一下組件化的 data 。

<!--more-->

## Data 必須是函式

因為每個組件都會有自己的模板，每個模板都會有自己的樣式或是邏輯，為了讓組件之間的資料不互相影響，必須將資料以函式的方式撰寫。
上一篇文章中提到的組件化，在模板內我都是直接寫值，並沒有用 mustache 語法來做動態綁定，因為當時還沒將 data 變成函數資料有可能不會呈現，但是在子組件下的 data 若是以函數的形式呈現，就不用擔心這問題，也可以確保每個組件的資料是獨立的。

拿之前寫的組件範例示範

```html
<div id="app">
  <my-cpn1></my-cpn1>
</div>

<!-- template 寫法 -->
<template id="vm1">
  <div>
    <h2>title</h2>
    //資料寫死
    <p>content</p>
    //資料寫死
  </div>
</template>
```

```javascript
// 註冊組件
Vue.component('my-cpn1', {
  template: '#vm1',
})

// 3.使用組件
const app = new Vue({
  el: '#app',
})
```

在 `template` 模板裡面的資料，是寫死狀態，那改用 mustache 語法的話，會怎麼樣?

只改動 template 模板內容

```html
<template id="vm1">
  <div>
    <h2>{{title}}</h2>
    <p>content</p>
  </div>
</template>
```

在 Vue 實例裡面新增 data 物件

```javascript
const app = new Vue({
  el: '#app',
  data: {
    title: '我是標題',
  },
})
```

用開發者工具看會報錯，也提示 `title` 沒有被定義
![](https://i.imgur.com/jeS56di.png)

這是因為組件內部是不能讀取 Vue 實例裡面的資料。
而子組件裡面有屬於自己的 HTML 模板，也應該有屬於自己的資料。

所以把上面組件內的 `data` 改成用函數的方式回傳，寫法也很簡單，`template` 內容一樣，只要在子組件裡面新增 `data` 函數的屬性並 `return` 物件內的值就好。

```javascript
Vue.component('my-cpn1', {
  template: '#vm1',
  data() {
    return {
      title: '我是組件內的標題',
    }
  },
})
```

結果為下圖
![](https://i.imgur.com/WOFiOtJ.png)

同樣道理，在把上式改寫成計數器的話

```html
<div id="app">
  <my-cpn1></my-cpn1>
  <my-cpn1></my-cpn1>
  <my-cpn1></my-cpn1>
</div>

<!-- template 寫法 -->
<template id="vm1">
  <div>
    <h2>{{count}}</h2>
    <button @click="count++">+</button>
  </div>
</template>
```

```javascript
Vue.component('my-cpn1', {
  template: '#vm1',
  data() {
    return {
      count: 0,
    }
  },
})
```

組件內的每筆資料也都是互相獨立的
![](https://i.imgur.com/JDevASi.png)

[DEMO](https://codepen.io/gleofgja/pen/YzpaRMx?editors=1011)

總結:
在 Vue 實例裡面，data 是物件。
在子組件裡面 data 必須以函數的方式回傳物件。

## 參考資料

[子元件的 data 必須是函數](https://book.vue.tw/CH2/2-1-components.html)
[2019 年最全最新 Vue、Vuejs 教程，从入门到精通](https://www.bilibili.com/video/BV15741177Eh?p=59)
