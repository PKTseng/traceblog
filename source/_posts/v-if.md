---
title: Vue - 判斷式
date: 2020/08/08
tags: v-if
categories:
  - Vue
description: 介紹 v-if 跟 v-show 的差別
---

## v-if

[CodePen](https://codepen.io/gleofgja/pen/ZEQgEoG?editors=1010)
我想透過勾選來決定要不要顯示 `h1` 標籤的內容，顯用 `v-model` 綁定屬性，再用 `v-if` 判斷決定與否

<!-- more -->

```html
<div id="app">
  <input type="checkbox" v-model="checked" />
  <h1 v-if="checked">Hello World!</h1>
</div>

<!-- Scss -->
<!-- #app{
  text-align: center;
  h1{
    font-size: 30px;
    color: red;
  }
} -->
```

```javascript
let vm = new Vue({
  el: '#app',
  data: {
    checked: false,
  },
})
```

![](https://i.imgur.com/02GE7NZ.png)

---

v-if 除了可以用在元素上，也可以用 template 模板包住某些元素
![](https://i.imgur.com/ZNNucL1.png)

這樣一個一個寫在元素太麻煩，所以改成直接寫在 `template` 模板上，會有一樣的效果

```html
<div id="app">
  <input type="checkbox" v-model="checked" />
  <!--   <h1 v-if="checked">Hello World!</h1> -->

  <template v-if="checked">
    <h1>html</h1>
    <h2>javascript</h2>
    <h3>css</h3>
  </template>
</div>
```

```javascript
let vm = new Vue({
  el: '#app',
  data: {
    checked: false,
  },
})
```

![](https://i.imgur.com/wakHHCD.png)

---

在**勾選**顯示時，用開發者工具看會顯示 DOM 元素
![](https://i.imgur.com/eZ04Y1R.png)

---

但是**不勾選**時，DOM 元素會直接被拿掉而不是用 `display:none` 隱藏
![](https://i.imgur.com/rBTAJQ8.png)

---

## v-else

[CodePen](https://codepen.io/gleofgja/pen/PoZMwpr?editors=1010)

```html
<div id="app">
  <input type="checkbox" v-model="checked" />
  <h1 v-if="checked">Hello World!</h1>
  <h1 v-else>OverWatch</h1>
</div>
```

```javascript
let vm = new Vue({
  el: '#app',
  data: {
    checked: true,
  },
})
```

不是 A 就是 B，當 `v-if` 屬性是 `false` 時，則會顯示 `v-else`，而 **`v-if` 跟 `v-else` 之間不能有任何元素**，若出現其他元素 `v-else` 就不會觸發
用開發者工具看，會發現一樣不是透過 `display:none` 隱藏
![](https://i.imgur.com/CWUZZn3.png)
![](https://i.imgur.com/3qKlC19.png)

---

## v-else-if

[CodePen](https://codepen.io/gleofgja/pen/ExPqabQ?editors=1010)

`v-if` 跟 `v-else` 是簡單的二元判斷，那`v-else-if` 是提供兩者之間的選擇，介於 `v-if` 跟 `v-else` 之間，同時很多個 `v-else-if` 也沒關係!

```html
<div id="app">
  <input type="checkbox" v-model="checkedOne" />
  <input type="checkbox" v-model="checkedTwo" />
  <h1 v-if="checkedOne">勾選 checkedOne!</h1>
  <h1 v-else-if="checkedTwo">勾選 checkedTwo</h1>
  <h1 v-else>checkedOne、checkedTwo，都不是</h1>
</div>
```

```javascript
let vm = new Vue({
  el: '#app',
  data: {
    checkedOne: false,
    checkedTwo: false,
  },
})
```

再都不勾選情況下:
![](https://i.imgur.com/Z2PDQ6q.png)

勾選 checkedOne:
![](https://i.imgur.com/aUjUlsJ.png)

勾選 checkTwo:
![](https://i.imgur.com/g8cSZyH.png)

兩個都勾，會顯示 checkedOne 是因為判斷第一個 v-if 已經成立
![](https://i.imgur.com/vdKqwV4.png)

---

## v-show

`v-if` 是透過刪除 DOM 元素來決定顯示與否，但如果要透過 CSS 的 `display:none`來控制 並且在不刪除 DOM 情況下，這時就要用 `v-show` 。

v-show 有兩個地方要特別注意:
<font color="red">1. 沒有 v-else 2. 不能用 template </font>

```html
<div id="app">
  <input type="checkbox" v-model="checkedOne" />
  <h1 v-show="checkedOne">勾選 checkedOne!</h1>
</div>
```

```javascript
let vm = new Vue({
  el: '#app',
  data: {
    checkedOne: false,
    checkedTwo: false,
  },
})
```

---

## [參考資料:精通 VueJS 前端開發完全指南](https://hiskio.com/courses/145)
