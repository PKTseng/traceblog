---
title: Vue - 組件的使用
date: 2020/09/06
tags: component
categories: Vue
description: Vue 組件是預先定義好的模組，把這些模組獨立出來並重複使用，這樣在開發上就可以只專注在一小區塊
---

Vue 組件是預先定義好的模組，包含 html 的視覺元素、綁定的資料跟偵聽器..等等，類似 Vue 實例，組件的好處是可以重複使用，在開發上可以只專注在一小區塊，維護也很方便

`Vue.component` 前面會先傳入參數的名稱，後面的參數是 `option` ，`option` 是用模板 `template` 定義視覺元素，也直接在模板裡面去定義內容，舉例 : 在模板裡面定義 html 的內容 ( hello world ) ，然後在 html 裡面定義 `#app` 並在裡面放入 `my-component` 標籤，而 `my-component` 並非是 html 標籤，是我在 `Vue.component` 定義好的。

`Vue.component` 有個特別的規範，就是前面的參數要全小寫並加上「 - 」分開，請養成習慣!，同時 `Vue.component` 的宣告必須在 `new Vue` 之前

```html
<div id="app">
  <my-component></my-component>
</div>

<!-- 此為 Global 的 component  -->
<script>
  Vue.component('my-component', {
    template: '<div>hello world</div>',
  })

  new Vue({
    el: '#app',
  })
</script>
```

此範例是全域都可以使用的
[codePen](https://codepen.io/gleofgja/pen/mdPEaEo?editors=1010)

---

除了全域( Global )宣告以外還有 local 的宣告，它只會存在 Vue 實例裡面

```html
<div id="app">
  <my-component></my-component>
</div>

<script>
  new Vue({
    el: '#app',
    components: {
      'my-component': {
        template: '<div>hello world</div>',
      },
    },
  })
</script>
```

在 `new Vue` 裡面給一個屬性 `components` ，屬性的 `key` 是字串 key `my-component` 也是組件名稱
[codePen](https://codepen.io/gleofgja/pen/xxVEmOL?editors=1010)

---

但是 local 有缺點，就是如果我宣告兩個 div ，但只會顯示一個

```html
<div id="app">
  <my-component></my-component>
</div>
<div id="app2">
  <my-component></my-component>
</div>

<script>
  new Vue({
    el: '#app',
    components: {
      'my-component': {
        template: '<div>hello world</div>',
      },
    },
  })

  new Vue({
    el: '#app2',
  })
</script>
```

它只會顯示一個 div
![](https://i.imgur.com/WhYn9TS.png)

那用 Global 宣告就不會有這問題

```html
<div id="app">
  <my-component></my-component>
</div>
<div id="app2">
  <my-component></my-component>
</div>

<script>
  Vue.component('my-component', {
    template: '<div>hello world</div>',
  })

  new Vue({
    el: '#app',
  })

  new Vue({
    el: '#app2',
  })
</script>
```

這樣就會有兩個實例
[codePen](https://codepen.io/gleofgja/pen/NWNReXP?editors=1010)

![](https://i.imgur.com/AT9IjlF.png)

---

## [參考資料:精通 VueJS 前端開發完全指南](https://hiskio.com/courses/145)
