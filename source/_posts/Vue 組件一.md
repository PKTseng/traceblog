---
title: Vue - 組件化 ( 一 )
date: 2021/02/28
tags:
  - Vue
  - components
categories:
  - Vue
---

## 簡介

面對複雜問題的處裡的方式就是將問題分割，而將東西分割的方式在 Vue 裡面我們稱為組件化。

大概 10 年前吧，原本一個網頁是由一個 HTML、CSS、JavaScript 所組成的，但這樣在改動某個地方的時候會非常麻煩也會擔心會不會影響到網頁其他地方。後來出現了用 JavaScript 寫成的前端框架，將網頁內部切分成很多區塊，讓這些區塊內都有獨立的 HTML、CSS、JavaScript，這樣當某個區塊改動時就不必擔心會影響到網頁內的其他區塊，也因為每個區塊都是獨立的所以重複利用，這也讓開發者大大的提升了開發效率。

[下圖來自官網](https://cn.vuejs.org/v2/guide/components.html)
![](https://i.imgur.com/KxbAXYc.png)

組件化的思想就是盡可能的把頁面拆分成很多個小區塊，變成可重複利用的組件。

<!--more-->

## 組件化開發

### 1.組件化的基本使用

在之前[基本模板語法](https://pktseng.github.io/2021/02/22/%E5%9F%BA%E6%9C%AC%E6%A8%A1%E6%9D%BF%E8%AA%9E%E6%B3%95/#%E4%B8%80%E3%80%81%E6%8F%92%E5%80%BC%E8%AA%9E%E6%B3%95)提到用 mustache 語法可以顯示 `data` 物件內的 `value 值`，但如果有非常多重複的內容，這樣做不只可讀性差，也不好維護。用以下程式碼來示範。

```html
<div id="app">
  <h2>{{message1}}</h2>
  <p>{{message2}}</p>

  <h2>{{message1}}</h2>
  <p>{{message2}}</p>

  <h2>{{message1}}</h2>
  <p>{{message2}}</p>

  <h2>{{message1}}</h2>
  <p>{{message2}}</p>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {
    message1: 'title',
    message2: 'hello world',
  },
})
```

顯示下圖
![](https://i.imgur.com/Ut7qry9.png)

這樣寫確實會顯示 4 個內容，但一樣的內容要寫 4 次才會呈現，而且有很冗長，這時就可以用組件的方式撰寫，可讀性也比較高。

以下示範如何組件化。

**分成三大步驟:**

1. 創造組件構造器 : `Vue.extend()`
2. 註冊組件 : `Vue.component()`
3. 使用組件 : `Vue 實例的使用範圍`

首先把重複性高的拉出來，如下圖，紅框處的重複性特別高，所以要獨立出來變成組件。
![](https://i.imgur.com/HH2YDec.png)

#### 1. 創造組件

在 `Vue.extend` 組件裡面，它有個屬性是 `template` ，就是模板，在模板裡面的所有內容都是獨立且可重複利用的，把上圖紅框處放到模板裡面。再把 `Vue.extend()` 賦予到 `vm` 變數裡面，用變數是為了方便待會在註冊 ( component ) 的時候呼叫。

```javascript
// 1. 創造組件
const vm = Vue.extend({
  template: `
  <div>
    <h2>我是模板的:title</h2>
    <p>我是模板的:hello world</p>
  </div>
  `,
})
```

#### 2. 註冊組件

創造完要註冊，它需要兩個參數，第一個參數是 `模板的標籤名稱` 可以自訂義，第二個是 `創造組件的變數` 就是指上面的 `vm` ，寫法也非常簡單，如下

```javascript
// 2.註冊組件
Vue.component('模板的標籤名稱', 創造組件的變數)
Vue.component('my-cpn', vm)
```

完整寫法:

```html
<div id="app">
  <h2>{{message1}}</h2>
  <p>{{message2}}</p>

  <!--   <h2>{{message1}}</h2>
  <p>{{message2}}</p>

  <h2>{{message1}}</h2>
  <p>{{message2}}</p>

  <h2>{{message1}}</h2>
  <p>{{message2}}</p> -->

  <my-cpn></my-cpn>
  <my-cpn></my-cpn>
  <my-cpn></my-cpn>
  <my-cpn></my-cpn>
</div>
```

```javascript
// 1. 創造組件
const vm = Vue.extend({
  template: `
  <div>
    <h2>我是模板的:title</h2>
    <p>我是模板的:hello world</p>
  </div>
  `,
})

// 2.註冊組件
Vue.component('my-cpn', vm)

// 3.使用組件
const app = new Vue({
  el: '#app',
  data: {
    message1: 'title',
    message2: 'hello world',
  },
})
```

顯示下圖
![](https://i.imgur.com/ZPBsCjR.png)

會發現在 `html` 上只要寫 `my-cpn` 標籤就可以顯示相同的內容，這就是組件化，之後如果想改動 `html` 的內容只要針對組件內的內容做改動就好，這樣不只增加可讀性同時也方便管理。

但要特別注意的是模板標籤必須寫在 `id='app'` 標籤裡面，寫在外面是不會被使用到的。

[DEMO](https://codepen.io/gleofgja/pen/OJbQYwp?editors=1011)

> `Vue.extend()` 在 Vue2.X 版以後就沒看到了，會示範也是因為這是必要的基礎觀念，之後的開發上就不會使用 `Vue.extend()` 而是使用語法糖的方式撰寫。

### 2. 全域組件跟區域組件

以上所寫的都是全域組件，全域就是可以在多個 Vue 實例裡面使用。
之前所寫的 Vue 實例只有一個，那可不可有兩個?
答案是 : 可以的! 但真實開發只會有一個，以下是為了釐清觀念所示範的。

再新增一個 Vue 實例 ( `id='app2'` )

```html
<div id="app">
  <my-cpn></my-cpn>
</div>

<div id="app2">
  <my-cpn></my-cpn>
</div>
```

```javascript
// 1. 創造組件
const vm = Vue.extend({
  template: `
  <div>
    <h2>我是模板的:title</h2>
    <p>我是模板的:hello world</p>
  </div>
  `,
})

// 2.註冊組件
Vue.component('my-cpn', vm)

// 3.使用組件
const app = new Vue({
  el: '#app',
})

// 新增一個實例 app2
const app2 = new Vue({
  el: '#app2',
})
```

一樣可以使用，如下圖
![](https://i.imgur.com/K2bd97U.png)

用開發模式看，會看到 `app2` 也有用到全域組件
![](https://i.imgur.com/9XXcTf0.png)

那要怎麼做才會變成區域組件?
方法很簡單，就是把 `Vue.component('my-cpn', vm)` 移到 Vue 實例裡面 ( 記得 component 要加 s )。
Vue 實例裡面新增 `components` 一個屬性，再給 `components` 屬性一個物件，裡面放 `key` 跟 `value` 值。

key 值指的是`自訂義模板的標籤名`， value 就是`組件的變數名稱`。

要特別注意的是 key 值的寫法，跟 HTML 模板標籤的寫法。
key 值的寫法分兩種:

1. 單字以減號-分離 ( Kebab Case ) <font color=#FF0000>必須加引號</font>。
2. 駝峰式命名法 ( Camel Case )，<font color=#FF0000>加不加引號都可以</font>。

<font color=#FF0000>HTML 模板的組件標籤必須是 Kebab Case 寫法</font>。

```javascript
const app = new Vue({
  el:'#app',
  components:{
    // Kebab Case
    'my-cpn': vm

    // Camel Case
    myCpn: vm
    'myCpn': vm
  }
})
```

以下示範區域組件

```html
<div id="app">
  <my-cpn></my-cpn>
</div>

<div id="app2">
  <my-cpn></my-cpn>
</div>
```

```javascript
// 1. 創造組件
const vm = Vue.extend({
  template: `
  <div>
    <h2>我是模板的:title</h2>
    <p>我是模板的:hello world</p>
  </div>
  `,
})

// 2.註冊組件
// Vue.component('my-cpn', vm)

// 3.使用組件
const app = new Vue({
  el: '#app',
  components: {
    // 'my-cpn': vm
    // 'myCpn': vm
    myCpn: vm,
  },
})

const app2 = new Vue({
  el: '#app2',
})
```

用開發者工具看，`app` 有在實例裡面註冊，所以可以使用，但 `app2` 不能，因為沒有在 `app2` 裡面註冊，所以不會解析 `my-cpn` 標籤。
![](https://i.imgur.com/Gf58VOC.png)

[DEMO](https://codepen.io/gleofgja/pen/mdOxOMJ?editors=1011)

以上就是區域組件的示範，在實戰開發上也是區域組件使用的最多，也只會有一個 Vue 實例。

### 3. 父子組件

顧名思義就是組件裡面再放一層組件。

以下範例是創造一個 `vm2` 組件，再把 `vm1` 放到 `vm2` 裡面註冊，再到 Vue 實例裡面註冊 `vm2`。

```html
<div id="app">
  <my-cpn2></my-cpn2>
</div>
```

```javascript
// 1. 創造組件 vm1
const vm1 = Vue.extend({
  template: `
  <div>
    <h2>One</h2>
    <p>One</p>
  </div>
  `,
})

// 創造組件 vm2
const vm2 = Vue.extend({
  template: `
  <div>
    <h2>Two</h2>
    <p>Two Content</p>
    <my-cpn1></my-cpn1>
  </div>
  `,
  // 註冊組件 vm1
  components: {
    'my-cpn1': vm1,
  },
})

// 3.使用組件
const app = new Vue({
  el: '#app',
  // 2.註冊組件
  components: {
    'my-cpn2': vm2,
  },
})
```

結果為下圖
![](https://i.imgur.com/88UmUB0.png)

用開發者工具查看
![](https://i.imgur.com/cd4p83b.png)

由上面案例可知 `vm2` 為父組件，`vm1` 為子組件。

當 HTML 再解析 `my-cpn2` 標籤的內容時，他會到 `vm2` 裡面解析模板的內容，而解析 `vm2` 模板的內容時又發現 `my-cpn1` 標籤，這時他會看看有沒有註冊 `my-cpn1` 的標籤，如果有找到它就會對應到 `vm1` 模板的內的內容，如果 `vm1` 裡面沒找到的話，它就會去全域組件找，如果全域還找不到就會報錯。

編譯好之後的模板如下

```javascript
// 創造組件 vm2
const vm2 = Vue.extend({
  template: `
  <div>
    <h2>Two</h2>
    <p>Two Content</p>

    <div>
      <h2>One</h2>
      <p>One</p>
     </div>
  </div>
  `,
  components: {
    'my-cpn1': vm1,
  },
})

// 3.使用組件
const app = new Vue({
  el: '#app',
  // 2.註冊組件
  components: {
    'my-cpn2': vm2,
  },
})
```

換個角度來說 Vue 實例也是一個父組件，只差沒寫 `template` 屬性。

[DEMO](https://codepen.io/gleofgja/pen/bGBvWOr?editors=1011)

### 4. 註冊組件的語法糖

> 以上當我們再創造組件的時候所使用的 `Vue.extend()` 在 Vue 2.X 以後已經很少用了幾乎是不會再出現。

一開始先用 `extend` 創造，再用 `component` 註冊。

```html
<div id="app">
  <my-cpn1></my-cpn1>
</div>
```

```javascript
// 1. 創造組件
const vm1 = Vue.extend({
  template: `
  <div>
    <h2>One</h2>
    <p>One</p>
  </div>
  `,
})

// 2.註冊組件
Vue.component('my-cpn1', vm1)

// 3.使用組件
const app = new Vue({
  el: '#app',
})
```

但我們可以把上面 `Vue.extend` 裡面的內容移到 `Vue.component` 裡面，如下

```javascript
// 把 vm1 改成 extend 創造的物件
Vue.component('my-cpn1', {
  template: `
  <div>
    <h2>One</h2>
    <p>One</p>
  </div>
  `,
})
```

同理，可以在把 `Vue.component` 的內容移到 Vue 實例裡面，但 `component` 要記得加 `s` ，所以又可以再改寫一次，如下

```javascript
// 3.使用組件
const app = new Vue({
  el: '#app',
  components: {
    'my-cpn1': {
      template: `
      <div>
        <h2>One</h2>
        <p>One</p>
      </div>
      `,
    },
  },
})
```

![](https://i.imgur.com/rPU0m4Q.png)

這就是組件化的語法糖的最終版。

要特別注意的是除了<font color=#FF0000> `component` 要加 `s` ， 逗號也要改成冒號。</font>

[DEMO](https://codepen.io/gleofgja/pen/oNYqwYx?editors=1011)

### 5. 組件模板的分離寫法

在上一點註冊組件的語法糖中，最終寫法是將模板的資料寫到 Vue 實例裡面，但模板其實是可以寫到 HTML 裡面的，以下要講解的是比較簡單的分離寫法。

#### script 標籤，屬性為 `type='text/x-template'`

在 HTML 裡面創造 `script` 標籤，加上 `type='text/x-template'` 跟 一個 `id` ，id 是為了在註冊裡面綁定用的，寫法如下。

但要特別注意的是，在 <font color=#FF0000>模板裡面要記得加上 `div` 標籤。</font>

```html
<div id="app">
  <my-cpn1></my-cpn1>
</div>

<!-- 在這裡創造一個模板 -->
<script type="text/x-template" id="vm1">
  <div>
    <h2>title</h2>
    <p>content</p>
  </div>
</script>
```

```javascript
// 註冊 vm1 組件
Vue.component('my-cpn1', {
  template: '#vm1',
})

// 使用組件
const app = new Vue({
  el: '#app',
})
```

顯示下圖
![](https://i.imgur.com/LK9DGQH.png)

#### template 標籤

`template` 寫法會更好記，因為只需要寫 `template` 加上 `id` 就好。

```html
<div id="app">
  <my-cpn1></my-cpn1>
</div>

<!-- template 寫法 -->
<template id="vm1">
  <div>
    <h2>title</h2>
    <p>content</p>
  </div>
</template>
```

Vue 實例跟上面一樣。

```javascript
// 註冊組件
Vue.component('my-cpn1', {
  template: '#vm1',
})

// 使用組件
const app = new Vue({
  el: '#app',
})
```

顯示效果跟上面一樣。
![](https://i.imgur.com/VORlZ7y.png)

以上就是模板的分離寫法。

[DEMO](https://codepen.io/gleofgja/pen/yLVKXRd?editors=1011)

## 參考資料

[2019 年最全最新 Vue、Vuejs 教程，从入门到精通](https://www.bilibili.com/video/BV15741177Eh?p=57)
