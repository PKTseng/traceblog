---
title: Vue - 計算屬性 ( computed )
date: 2020/09/25
tags: computed
categories: Vue
description: 用簡單的加減運算介紹計算屬性
---

計算用法:

```html
<div id="app">
  <input type="number" v-model="a" />
  +
  <input type="number" v-model="b" />
  =
  <input type="text" v-model="ans" />
  <br />
</div>

<script>
  new Vue({
    el: '#app',
    data: {
      a: 0,
      b: 0,
      c: 0,
    },
    computed: {
      ans() {
        return parseInt(this.a) + parseInt(this.b)
      },
    },
  })
</script>
```

[codepen](https://codepen.io/gleofgja/pen/ZEWXeer?editors=1010)
computed 裡面的屬性不能跟 data、methods 撞名，同樣的在 ans 不能是箭頭函式，因為用箭頭函式，那 ans 裡面的 this 就會是 window 物件

---

除了簡單的計算外還有進階的用法，就是 computed 裡面除了宣告成函式外還可以宣告成物件

```javascript
new Vue({
  el: '#app',
  data: {
    a: 0,
    b: 0,
    c: 0,
  },
  computed: {
    ans: {
      get() {
        return parseInt(this.a) + parseInt(this.b)
      },
      set(val) {
        this.b = parseInt(val) - parseInt(this.a)
      },
    },
  },
})
```

[codepen](https://codepen.io/gleofgja/pen/OJNxmGo?editors=1010)
get 是指，當我需要 ans 值的時候，就會用 get 呼叫函式，取出 return 的值

set 是指，當我設定某個值到 ans 的時候，要用 set 的函式，那 set 函式它吃一個值( value )，範例是當我設定 ans 的時候就要算出 a or b 的值

---

## [參考資料:精通 VueJS 前端開發完全指南](https://hiskio.com/courses/145)
