---
title: Vue - 基本語法( 三 )
date: 2021/02/24
tags:
  - Vue
  - v-if
  - v-show

categories:
  - Vue
---

用 `v-if`、`v-show` 的條件判斷決定選染的內容。

<!--more-->

## 條件判斷

這指令可以根據表達式的值來判斷是否在 DOM 中渲染或是銷毀元素/組件。

寫法也很簡單，就跟 JavaScript 的 if 判斷式一樣。

### 1. v-if

在 DOM 標籤中加入 v-if 判斷式來決定要不要顯示，該標籤內的內容。

```html
<div id="app">
  <h2 v-if="true">{{message}}</h2>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello World',
  },
})
```

顯示下圖
![](https://i.imgur.com/6iHmYbE.png)
`v-if` 後面都是接一個布林值。
為了可以動態顯示將寫法改寫一下，將 `true` 改成一個變數。這樣就可以透過發發者工具來控制要不要顯示。

```html
<div id="app">
  <!--   <h2 v-if='true'>{{message}}</h2> -->
  <h2 v-if="isShow">{{message}}</h2>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello World',
    isShow: true,
  },
})
```

改成 `false` 交看不到內容
![](https://i.imgur.com/aYS5P2G.png)

改成 `true` 後又會顯示出來。
![](https://i.imgur.com/1zsgsy1.png)

[DEMO](https://codepen.io/gleofgja/pen/ZEBamEY?editors=1011)

### 2. v-if & v-else

`v-if` 很好理解，在 `true` 的狀況下就會顯示，在 `false` 的狀況下會顯示 `v-else` 內的內容。

```html
<div id="app">
  <h2 v-if="isShow">{{message}}</h2>
  <h2 v-else>{{elseMessage}}</h2>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello World',
    elseMessage: '我是 v-else',
    isShow: true,
  },
})
```

原本是 `v-if` 判斷為 `true` 的狀況下顯示 `Hello World`
![](https://i.imgur.com/ROUJyD8.png)

那如過改成 `false` 就會顯示 `v-else` 的內容，如下圖
![](https://i.imgur.com/YTOXJk7.png)

[DEMO](https://codepen.io/gleofgja/pen/jOVaQWj?editors=1011)

### 3. v-if 、 v-else-if & v-else

這寫法也很簡單，我們用分數來決定顯示的內容。

```html
<div id="app">
  <h2 v-if="score >= 90">大於90分以上，頂標</h2>
  <h2 v-else-if="score >= 60 && score <= 89">介於60分以上，89分以下，均標</h2>
  <h2 v-else="score <= 59 ">低於59分以下，低標</h2>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {
    score: 90,
  },
})
```

因為 `score` 預設是 90 ，所以會顯示頂標
![](https://i.imgur.com/ocoFVTp.png)

如果我把分數改成 80，顯示下圖
![](https://i.imgur.com/P0oXUA1.png)

再把分數改成 50，顯示下圖
最後一次寫的是`app.score = 50` 所以會被覆蓋掉上面 80 分的
![](https://i.imgur.com/L2WiuZr.png)

[DEMO](https://codepen.io/gleofgja/pen/VwmrVbX?editors=1011)

### 4. computed 寫法

除了以上寫法還可以靈活使用上一篇文章提到的計算屬性 `computed`，如果只是 `v-if`、`v-else` 的話沒什麼關係，但如果有很多計算的話比較推薦使用 `computed` 寫法同時可以增強閱讀性。

```html
<div id="app">
  <h2 v-if="score >= 90">大於90分以上，頂標</h2>
  <h2 v-else-if="score >= 60 && score <= 89">介於60分以上，89分以下，均標</h2>
  <h2 v-else="score <= 59 ">低於59分以下，低標</h2>

  <h2>computed : {{finalScore}}</h2>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {
    score: 90,
  },
  computed: {
    finalScore() {
      let showMessage = ''
      if (this.score >= 90) {
        showMessage = '大於90分以上，頂標'
      } else if (this.score >= 60 && this.score <= 89) {
        showMessage = '介於60分以上，89分以下，均標'
      } else {
        showMessage = '低於59分以下，低標'
      }
      return showMessage
    },
  },
})
```

顯示下圖
![](https://i.imgur.com/psRgJbO.png)

將分數改成 80 ，顯示下圖
![](https://i.imgur.com/1eJ0hNv.png)

再改成 50，顯示下圖
( 最後一次寫是 `app.score = 50` 所以會覆蓋掉 80 分 )
![](https://i.imgur.com/Y2E6gHZ.png)

[DEMO](https://codepen.io/gleofgja/pen/gOLXQXZ?editors=1011)

### 5. 條件渲染的實作

在輸入使用者資料的時候可以切換使用者類型

利用 `v-if` 、`v-else` 來判斷我要顯示的內容，在切換的時候再用 `click` 判斷 `v-if` 接收到的值是 `true` 還是 `false`。

```html
<div id="app">
  <span v-if="isUser">
    <label for="username">使用者姓名: </label>
    <input type="text" id="username" placeholder="username" />
  </span>
  <span v-else>
    <label for="useremail">使用者信箱: </label>
    <input type="mail" id="email" placeholder="user-email" />
  </span>
  <button @click="isUser = !isUser">切換類型</button>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {
    isUser: true,
  },
})
```

透過點擊按鈕可以切換輸入框
![](https://i.imgur.com/1z96aHx.png)

[DEMO](https://codepen.io/gleofgja/pen/XWNzywe?editors=1011)

### 6. v-show

`v-show` 的用法也相當簡單，跟 `v-if` 的用法一樣，但是差別只在於 <font color=#FF0000>DOM</font> 的顯示。

```html
<div id="app">
  <h2 v-if="show">{{vIfShow}}</h2>

  <h2 v-show="show">{{vShow}}</h2>

  <button @click="show = !show">切換類型</button>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {
    vIfShow: 'v-if 顯示',
    vShow: 'v-show 顯示',
    show: true,
  },
})
```

![](https://i.imgur.com/8zJjbPk.png)

用開發者工具看到對應的 DOM，兩者在 `true` 的狀態下都會顯示
![](https://i.imgur.com/Y0iDEsR.png)

兩者在 false 的狀態下，顯示下圖
![](https://i.imgur.com/Bj3fkFK.png)

( 標註一下上上比較清楚 )
![](https://i.imgur.com/6gMM3ZG.png)

[DMEO](https://codepen.io/gleofgja/pen/JjbOwoZ?editors=1010)

結論:
兩個判斷皆為<font color=#FF0000> `false` </font>時

1. `v-if` <font color=#FF0000>對應的 DOM 會消失</font>。
2. `v-show` 的 <font color=#FF0000>DOM 不會消失</font>，它只是用了 css 效果的 `display: none`。

## 參考資料

[2019 年最全最新 Vue、Vuejs 教程，从入门到精通](https://www.bilibili.com/video/BV15741177Eh?p=36)
