---
title: Vue - 動態綁定及監聽
date: 2021/03/05
tags: Vue
categories:
  - Vue
description: 用動態綁定製作簡單的按鈕
---

## v-bind

v-bind 指令是用來把一個數值綁定到 HTML 屬性上，因為到後期會大量用到，所以會使用縮寫 " : "

#### 用 v-bind 製作一個簡單的按鈕

```html
<div id="app">
  <button :type="selected">selected</button>
</div>

<script>
  new Vue({
    el: '#app',
    data: {
      selected: 'submit',
    },
  })
</script>
```

[codepen](https://codepen.io/gleofgja/pen/bGEXQrj)

![](https://i.imgur.com/ph81atN.png)

透過 v-bind 可以將 submit 這個值綁到 type 屬性上

---

## v-on

v-on 縮寫為 "@"，用來偵聽 DOM 輸入的事件並改變資料

#### 製作一個簡單的按鈕

```html
<div id="app">
  <input type="checkbox" :checked="selected" />
  <button @click="toggle">toggle</button>
</div>

<script>
  new Vue({
    el: '#app',
    data: {
      selected: false,
    },
    methods: {
      toggle() {
        this.selected = !this.selected
      },
    },
  })
</script>
```

[codepen](https://codepen.io/gleofgja/pen/bGEXQrj?editors=1010)

![](https://i.imgur.com/9ciSSo0.png)

checked 屬性是控制 input 著 checkbox 有沒有被勾選到，而 selected 這個值是代表 data 裡面的 selected，要讓 selected 賦予值，就必須要用 v-bind 動態綁定到 checked 屬性上，再透過 v-on 偵聽事件綁定 selected。

---

## [參考資料:精通 VueJS 前端開發完全指南](https://hiskio.com/courses/145)
