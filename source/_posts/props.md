---
title: Vue - 父組件傳遞到子組件的  props 語法
date: 2021/03/08
tags:
  - Vue
  - props

categories:
  - Vue
---

## 簡介

當組件化的網頁要從後端伺服器請求資料的時候，那些回傳的資料都會經過父層組件傳到子層組件去，那父層組件的參數要傳到子層組件的話就要透過 `props` 語法。

![](https://i.imgur.com/Hmwi0nd.png)

<!--more-->

## 1. props 沒有限制型別

沒有限制型別的寫法就是說待會在接收父層的資料的時候不會有限制。

套用之前的範例，這是在不需要從 `Vue 實例` ( 父層 ) 傳參數的寫法。

```html
<div id="app">
  <cpn></cpn>
</div>

<template id="cpn">
  <div>
    <h1>{{message}}</h1>
  </div>
</template>
```

```javascript
const cpn = {
  template: '#cpn',
  data() {
    return {
      message: 'Hello World',
    }
  },
}

const app = new Vue({
  el: '#app',
  components: {
    cpn,
  },
})
```

正常會顯示下圖
![](https://i.imgur.com/QBPGEO8.png)

但是現在要從 `Vue 實例` ( 父層 ) 傳變數，那我們先在父層新增一些資料，同時又要接收資料。

方法如下:

1. 在組件內先新增 `props` 屬性，然後在陣列內新增變數，變數的名稱是自定義的 ( `JS` 第 4 行 ) 。
2. 在模板中新新增組件標籤 ( `HTML` 第 8、9 行 )。
3. 在組件標籤上動態綁定父子組件 ( `HTML` 第 2 行 ) 。

`props` 陣列內寫的是變數，不是字串。

```html
<div id="app">
  <cpn :cmovies="movies" :cmessage="message"></cpn>
</div>

<template id="cpn">
  <div>
    <h2>{{cmovies}}</h2>
    <h2>{{cmessage}}</h2>

    <ul>
      <li v-for="item in cmovies">{{item}}</li>
    </ul>
  </div>
</template>
```

```javascript
const cpn = {
  template: '#cpn',
  // 1. 沒有限制型別的寫法
  props: ['cmovies', 'cmessage'],
}

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello world',
    movies: ['索爾', '鋼鐵人', '綠巨人浩克'],
  },
  components: {
    cpn,
  },
})
```

這樣就子組件就可以從父層拿到資料並渲染
![](https://i.imgur.com/eXDEKQS.png)

[DEMO](https://codepen.io/gleofgja/pen/qBqMgGp?editors=1011)

## 2. props 驗證資料

上面範例是子組件在接收父層組件資料的時候沒有限制型別的寫法，而且 `props` 接收的明明是變數，但看起來卻像是字串，接下來要寫的是 `props` 接收到的資料需要驗證的寫法。

方法很簡單，HTML 模板內容不變，將 `props` 改成陣列再把子組件名稱改成 `key` 值跟對應的 `value` 值。

```javascript
const cpn = {
  template: '#cpn',
  // 1. 沒有限制型別的寫法
  // props:['cmovies', 'cmessage'],

  // 2. 限制型別的寫法
  props: {
    cmovies: Array,
    cmessage: String,
  },
}

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello world',
    movies: ['索爾', '鋼鐵人', '綠巨人浩克'],
  },
  components: {
    cpn,
  },
})
```

一樣可以顯示
![](https://i.imgur.com/jVyDRGr.png)

[DEMO](https://codepen.io/gleofgja/pen/Rwoewjm?editors=1011)

## 3. 設定默認值的寫法

當我在模板標籤中沒有動態綁定父子組件的話，會自動顯示子組件預設的默認值。以下會示範當沒有動綁定的話會怎麼顯示。

要設定默認值有兩種寫法:

1. `default` 直接給值 ( `JS` 第 15 行 )。
2. `default` 已函式的型式給值 ( `JS` 第 17 行)。

現在故意在模板上少寫動態綁定的其中一項 ( `HTML` 第 5、6 行)。

```html
<div id="app">
  <cpn :cmovies="movies" :cmessage="message"></cpn>

  <!--   沒有從父組件拿到 message 參數，顯示默認值 -->
  <cpn :cmessage="message"></cpn>

  <cpn :cmovies="movies"></cpn>
</div>

<template id="cpn">
  <div>
    <h2>{{cmessage}}</h2>

    <ul>
      <li v-for="item in cmovies">{{item}}</li>
    </ul>
  </div>
</template>
```

```javascript
const cpn = {
  template: '#cpn',
  // 1. 沒有限制型別的寫法
  // props:['cmovies', 'cmessage'],

  // 2. 限制型別的寫法
  // props:{
  //   cmovies: Array,
  //   cmessage: String
  // },

  // 3. 設定預設值寫法
  props: {
    cmessage: {
      type: String,
      // default: 'none', //這是第一種寫法
      default() {
        return {
          message: '這是第2種寫法，以函式表示的 message',
        }
      },
      require: true, //必須要有的，如果有少就會報錯
    },
    cmovies: {
      type: String,
      default() {
        //這是第2種寫法，以函式表示
        return ['超人', '閃電俠', '神力女超人']
      },
      require: true, //必須要有的，如果有少就會報錯
    },
  },

  data() {
    return {}
  },
}

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello world',
    movies: ['索爾', '鋼鐵人', '綠巨人浩克'],
  },
  components: {
    cpn,
  },
})
```

顯示下圖。
![](https://i.imgur.com/R2ira8K.png)

[DEMO](https://codepen.io/gleofgja/pen/eYBLxgm?editors=1011)

比較需要注意的是標籤上的命名，在組件中是可以接受小駝峰的，但是在 `#app` 裡面的標籤只能接受全小寫或是串接式寫法 ( kebab Case ) ，盡量以串接式寫法為主。

## 參考資料

[2019 年最全最新 Vue、Vuejs 教程，从入门到精通](https://www.bilibili.com/video/BV15741177Eh?p=59)
