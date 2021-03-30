---
title: Vue - 基本語法( 二 )
date: 2021/02/23
tags:
  - Vue
  - computed
  - v-on

categories:
  - Vue
  - computed
  - v-on
---

在模板中可以直接使用插值語法顯示 data 中的資料，但是在某些狀況下有些資料還是要經過計算再顯示，或是多個資料結合或是重複顯示，這時候就會使用到 computed 計算屬性。

還有 v-on 監聽事件的修飾符跟實際應用。

<!--more-->

## 計算屬性 ( computed )

### 1. 計算屬性的基本使用

之前有提到過 mustache 語法，可以簡單的顯示資料，如果一個資料沒什麼大礙，但有很多資料的話呢? 以下示範。

`firstName` 跟 `LastName` 如果中間想有空格，會有兩種寫法，如下。

```html
<div id="app">
  <h2>{{firstName +' '+ LastName}}</h2>
  <h2>{{firstName}} {{LastName}}</h2>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello World',
    firstName: 'Lebron',
    LastName: 'Jamse',
  },
})
```

會顯示下圖
![](https://i.imgur.com/eW0GGIz.png)

那如果今天要顯示 5~10 個呢? 如下

```html
<div id="app">
  <h2>{{firstName +' '+ LastName}}</h2>
  <h2>{{firstName}} {{LastName}}</h2>
  <h2>{{firstName}} {{LastName}}</h2>
  <h2>{{firstName}} {{LastName}}</h2>
  <h2>{{firstName}} {{LastName}}</h2>
  <h2>{{firstName}} {{LastName}}</h2>
  <h2>{{firstName}} {{LastName}}</h2>
</div>
```

這樣的話太長了，如果綁定的 key 值變更的話上面就要改 5 次，如果只需要改一次的話就會比較輕鬆，這時候有兩種方法可以使用 : methods 、 computed。

#### ( 一 ) methods 寫法

```html
<div id="app">
  <h2>{{firstName +' '+ LastName}}</h2>
  <h2>{{firstName}} {{LastName}}</h2>
  <h2>methods 寫法 : {{getFullName()}}</h2>
</div>
```

上面第 4 行比第 2、3 行簡潔多了。
把重複的動作寫成函式，再呼叫實例裡面的函式。

```javascript
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello World',
    firstName: 'Lebron',
    LastName: 'Jamse',
  },
  methods: {
    getFullName() {
      return this.firstName + ' ' + this.LastName
    },
  },
})
```

這樣就算 data 裡面的 key 值變更，也只要更改 methods 裡面的的 key 值，而且只改一次就全部完成。

顯示如下
![](https://i.imgur.com/fPvACnw.png)

[DEMO](https://codepen.io/gleofgja/pen/BaQwOqZ?editors=1011)

不過一般 mustache 語法裡面只通常只放變數，放函式感覺很奇怪，這時候就可以用 computed 。

#### ( 二 ) computed

當資料裡面產生<font color=#FF0000>變化</font>的時候才會執行。

```html
<div id="app">
  <h2>{{firstName +' '+ LastName}}</h2>
  <h2>{{firstName}} {{LastName}}</h2>

  <!--   methods 有小括號，是函式 -->
  <h2>methods 寫法 : {{getFullName()}}</h2>

  <!--   computed 沒有小括號，是變數 -->
  <h2>computed 寫法 : {{fullName}}</h2>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello World',
    firstName: 'Lebron',
    LastName: 'Jamse',
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.LastName
    },
  },
  methods: {
    getFullName() {
      return this.firstName + ' ' + this.LastName
    },
  },
})
```

顯示如下。
![](https://i.imgur.com/eitEos0.png)

`methods` 寫法會在 mustache 裡面加上小括號，那是一個函式，
`computed` 寫法只會在 mustache 裡面放變數，不會有小括號。

[DEMO](https://codepen.io/gleofgja/pen/mdOqbLp?editors=1010)

### 2. 計算屬性的複雜操作

計算陣列內的總價格

```html
<div id="app">
  <h2>Total Price : {{totalPrice}}</h2>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {
    books: [
      { id: 1, name: 'html、css 書籍', price: 110 },
      { id: 2, name: 'JavaScript 書籍', price: 220 },
      { id: 3, name: 'Vue 書籍', price: 330 },
      { id: 4, name: 'React 書籍', price: 440 },
    ],
  },
  computed: {
    totalPrice() {
      let total = 0
      // for( let i=0; i< this.books.length; i++){
      //   total+= this.books[i].price
      // }
      // return total

      // for in 寫法
      // for( let i in this.books){
      //   total+= this.books[i].price
      // }
      // return total

      // for of 寫法
      for (let book of this.books) {
        total += book.price
      }
      return total
    },
  },
})
```

![](https://i.imgur.com/xR6WUEd.png)

[DEMO](https://codepen.io/gleofgja/pen/qBqVWLr?editors=1010)

### 3. 計算屬性的 setter & getter

```html
<div id="app">
  <h2>{{firstName + ' ' + lastName}}</h2>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {
    firstName: 'Lebron',
    lastName: 'Jamse',
  },
})
```

![](https://i.imgur.com/mqO38pT.png)

由於用 mustache 語法寫的話太複雜了，加上如果要重複利用的話有太冗長，所以都會使用 computed 計算屬性。

```html
<div id="app">
  <h2>{{firstName + ' ' + LastName}}</h2>

  <h2>對應 computed 寫法: {{fullName}}</h2>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {
    firstName: 'Lebron',
    lastName: 'Jamse',
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    },
  },
})
```

顯示下圖
![](https://i.imgur.com/voadrLG.png)

就跟上面所寫的一樣，不過接下來要加上 get & set 屬性，這才是 computed 屬性的完整寫法。

如果沒有 set 方法的話都是默認 get 方法的值，也就是<font color=#FF0000>只讀屬性</font>。
例如我只在 get 方法裡面返回 hello 字串。

```javascript
// html 模板一樣
const app = new Vue({
  el: '#app',
  data: {
    firstName: 'Lebron',
    lastName: 'Jamse',
  },
  computed: {
    // fullName(){
    //   return this.firstName+ ' '+ this.LastName
    // }
    fullName: {
      set() {},
      get() {
        return 'hello'
      },
    },
  },
})
```

顯示下圖
![](https://i.imgur.com/CXbFJLV.png)

一般情況下我們只會用到 get 方法，不會使用到 set 方法，因為不希望別人隨便設定一些奇怪的值，寫法如下。

```javascript
const app = new Vue({
  el: '#app',
  data: {
    firstName: 'Lebron',
    lastName: 'Jamse',
  },
  computed: {
    fullName: {
      get() {
        // return 'hello'
        return this.firstName + ' ' + this.lastName
      },
    },
  },
})
```

![](https://i.imgur.com/QbBmqZq.png)

也因為一般情況下都會使用到 get 方法，所以上面的寫法會簡化成最一開始的寫法。

```javascript
const app = new Vue({
  el: '#app',
  data: {
    firstName: 'Lebron',
    lastName: 'Jamse',
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName
    },
    // fullName:{
    // set(){

    // },
    // get(){
    // return 'hello'
    // return this.firstName+ ' '+ this.lastName
    // }
    // }
  },
})
```

![](https://i.imgur.com/AHOs9WN.png)

所以當我們在使用 computed 屬性時， mustache 語法裡面就不需要家小括號，因為在使用 computed 屬性時他會去調用 `computed` 裡面的 `get`。

那如果真想要在 computed 裡面加上 set 的話也可以。
在 set 方法裡面必須傳入參數。

```html
<div id="app">
  <h2>{{fullName}}</h2>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {
    firstName: 'Lebron',
    lastName: 'Jamse',
  },
  computed: {
    // fullName(){
    //   return this.firstName+ ' '+ this.LastName
    // }
    fullName: {
      set(newValue) {
        const names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      },
      get() {
        // return 'hello'
        return this.firstName + ' ' + this.lastName
      },
    },
  },
})
```

在還沒 set 之前顯示下圖
![](https://i.imgur.com/tCcyaJ6.png)

還沒更改前是 Lebron Jamse ，用開發者工具使用更改 `fullName` 之後如下圖
![](https://i.imgur.com/h2NFSD7.png)

會改變的原因是更改了 `data` 裡面的 `firstName` & `lastName` 這兩個更改就代表 `get` 方法裡面的 `this.firstName+ ' '+ this.lastName` 也會跟著更改，那`this.firstName+ ' '+ this.lastName` 更改就代表 `fullName` 被更改了。

總結一下，90%情況下 set 方法是不會寫的所以會省略掉，那省略掉後就會有更簡潔的寫法，如下。

```javascript
const app = new Vue({
  el: '#app',
  data: {
    firstName: 'Lebron',
    lastName: 'Jamse',
  },
  computed: {
    fullName() {
      return this.firstName + ' ' + this.LastName
    },
  },
})
```

[DEMO](https://codepen.io/gleofgja/pen/WNoXbpj?editors=1011)

## 監聽事件

### 1. v-on

監聽是前端在開發時常常用到的屬性，主要是監聽事件的發生，例如:滑鼠點擊、拖曳、鍵盤點擊...等等。

那在 Vue 當中監聽事件的語法為 `v-on` ，語法糖為 `@`。

以下示範用監聽滑鼠點擊來做一個簡單的計數器

```html
<div id="app">
  <h2>{{count}}</h2>
  <button @click="add">+</button>
  <button @click="minus">-</button>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {
    count: 0,
  },
  methods: {
    add() {
      this.count++
    },
    minus() {
      this.count--
    },
  },
})
```

利用間聽 click 事件來判斷當前要做的事。
當我們點擊 + 號按鈕的時候用 v- on 監聽同時綁定 add 事件，那 add 事件會綁定到 methods 裡面的函式，同理 - 號按鈕也一樣。
![](https://i.imgur.com/USHnefS.png)

[DEMO](https://codepen.io/gleofgja/pen/OJbOVKa?editors=1011)

以上皆為 v-on 最基本的使用。接下來要示範傳參數的問題。

### 2. v-on 參數問題

在 methods 觸發 click 事件的時候，要注意傳參數的問題。

1. 如果不需要另外傳參數的話，那方法後面的小括號就甭加。
2. 如果需要傳入參數，同時又需要 event 這時就可以用 `$event` 傳到事件裡面。

#### ( 一 )事件不傳參數

以下示範在沒傳參數的情況下小括號加與不加的差別。

```html
<div id="app">
  <button @click="btn1()">按鈕1</button>
  <button @click="btn2">按鈕2</button>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {},
  methods: {
    btn1() {
      console.log('我是按鈕1，有小括號')
    },
    btn2() {
      console.log('我是按鈕2，沒有小括號')
    },
  },
})
```

如下圖，結果是一樣的，所以在沒傳入參數的話一般都會省略小括號。
![](https://i.imgur.com/rK9e5za.png)

[DEMO](https://codepen.io/gleofgja/pen/yLVPYWb?editors=1011)

#### ( 二 ) 定義事件，模板省略的小括號，但是 methods 本身需要傳入一個參數。

把按鈕 2 的參數拿掉，用 methods 傳入參數的話怎麼樣?

```html
<div id="app">
  <button @click="btn1(123)">按鈕1</button>
  <button @click="btn2">按鈕2</button>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {},
  methods: {
    btn1(abc) {
      console.log('我是按鈕1，有小括號', abc)
    },
    btn2(abc) {
      console.log('我是按鈕2，沒有小括號', abc)
    },
  },
})
```

如下圖，用開發者工具看 log
![](https://i.imgur.com/nuTivWl.png)

點擊 按鈕 1 會正常出現，但是 按鈕 2 要用瀏覽器的開發者工具查看
![](https://i.imgur.com/49MfVdV.png)

會回傳 MouseEvent ，就是回傳瀏覽器的 event ，因為 Vue 會把默認瀏覽器產生的 event 事件當作參數傳到函式裡面。

所以按鈕 2 的參數要寫 `event` 不是 `abc` 。

[DEMO](https://codepen.io/gleofgja/pen/dyOZYxa?editors=1011)

#### ( 三 ) 定義函式時，需要傳入參數跟 event

```html
<div id="app">
  <button @click="btn1(123, event)">按鈕1</button>
</div>
```

```javascript
const app = new Vue({
  el: '#app',
  data: {},
  methods: {
    btn1(abc, event) {
      console.log('我是按鈕1，有小括號', abc, event)
    },
  },
})
```

![](https://i.imgur.com/SLBqBB9.png)

不過傳入的第一個參數是數字型別，如果改成 abc 的話就會報錯，如下圖
![](https://i.imgur.com/7w7itVd.png)

因為改成 abc 後第一個參數就是<font color=#FF0000>變數</font>了，所以他會去 `data` 裡面找 value 值

```html
<div id="app">
  <!--   <button @click='btn1(123, $event)'>按鈕1</button> -->
  <button @click="btn1(abc, $event)">按鈕1</button>
</div>
```

在 `data` 裡面添加 `abc` 的 `value` 值。

```javascript
const app = new Vue({
  el: '#app',
  data: {
    abc: '第一個參數變成變數了',
  },
  methods: {
    btn1(abc, event) {
      console.log('我是按鈕1，傳入兩個參數', abc, event)
    },
  },
})
```

這樣就可以正常顯示了。
同理第一個參數改成字串，那他就會顯示字串!
![](https://i.imgur.com/LsK9vBj.png)

[DEMO](https://codepen.io/gleofgja/pen/bGBYErg?editors=1011)

### 3. v-on 修飾符

在 JavaScript 裡面，都會監聽一些事件，例如 submit
但是我們都會用 event.preventDefault() 來阻擋事件冒泡，同理 v-on 也可以。
寫法也較為簡單:

1. `event.stopPropagation()` 會寫成 `.stop`
2. `event.preventDefault()` 會寫成 `.prevent`
3. 只觸發一次 `.once`
4. 只監聽特定按鍵，如:` @keyup.enter` 、 `@keyup.按鍵碼`

## 參考資料

[2019 年最全最新 Vue、Vuejs 教程，从入门到精通](https://www.bilibili.com/video/BV15741177Eh?p=14)
[[筆記][JavaScript]所謂的「停止事件」到底是怎麼一回事？](https://ithelp.ithome.com.tw/articles/10198999)
