---
title: JavaScript - 陣列的進階方法
date: 2021/01/19
tags:
  - JavaScript
  - map
  - filter
  - forEach
  - find
categories:
  - JavaScript
---

## 前言

這幾天在練習寫作品集的時候發現幾個 JavaScrip 蠻常用的陣列語法，所以決定來寫一篇關於這些語法的文章。

<!-- more -->

## Array.prototype.map()

`map(item, index, arry)` : 透過函式處理陣列中每個元素，最後會回傳出一個新的陣列，如果沒有回傳就是 `undefine。`

函式內要傳入三個參數 :

- 第一個參數是要帶入的<font color=#FF0000>每個元素 ( 必填 )</font>。
- 第二個參數是帶入<font color=#FF0000>值的索引值 ( 選填 )</font>。
- 第三個參數是帶入的<font color=#FF0000>陣列 ( 選填 )</font>。

### map 進階寫法

```javascript
let people = ['ken', 'Bob', 'Marry']

let result = people.map(function (man) {
  return 'userName : ' + man
})

console.log(result)
```

![](https://i.imgur.com/TBgNFBW.png)

但如果把第 4 行註解掉，就會出現下圖，因為沒有回傳任何值。
![](https://i.imgur.com/q7HrNjw.png)

### Data structure 寫法

```javascript
let people = ['ken', 'Bob', 'Marry']

function mapA(people) {
  let result = []
  for (let i = 0; i < people.length; i++) {
    // console.log(people[i]) //確認 people[i] 有抓到
    let str = 'userName : ' + people[i]
    // console.log(str) //確認 str 有被賦值
    result.push(str)
  }
  return result
}
```

輸入 `mapA(people)` 如下圖，結果是一樣的
![](https://i.imgur.com/CYBcbxX.png)

如果剛接觸 JavaScript 的話還是建議用資料結構相關的寫法，訓練基本功。

[DEMO](https://codepen.io/gleofgja/pen/JjRxZXr)

## Array.prototype.forEach()

`forEach(item, index, arry)` : 會將陣列中每個元素套用到指定的函式裡進行運算。

函式內要傳入三個參數 :

- 第一個參數表示<font color=#FF0000>每個元素的值 ( 必填 )</font>。
- 第二個參數為該<font color=#FF0000>元素的索引值 ( 選填 )</font>。
- 第三個參數則表示<font color=#FF0000>原本的陣列 ( 選填 )</font>。

### map & forEach 進階寫法的差異

**`forEach` 跟 `map` 的差別在於 `forEach` 不會回傳出新的值，`map` 會回傳並產生新的陣列**。

```javascript
let people = ['ken', 'Bob', 'Marry']

//forEach
let forEachResult = people.forEach(function (man) {
  return 'userName : ' + man
})

//map
let mapResult = people.map(function (man) {
  return 'userName : ' + man
})
```

在 `console.log` 輸入 `forEachResult` 會得到 `undefined` ，在 `mapResult` 會得到 return 的回傳值
顯示結過如下
![](https://i.imgur.com/naX3yTS.png)

### forEach & Data structure 兩種寫法

```javascript
// forEach
let forEachResult = people.forEach(function (man) {
  console.log('userName : ' + man)
})

// Data structure
for (let i = 0; i < people.length; i++) {
  // console.log(people[i]) //確認 people[i] 有抓到
  let str = 'userName : ' + people[i]
  // console.log(str) //確認 str 有被賦值
  console.log(str)
}
```

用 `console.log` 查看，如下圖
![](https://i.imgur.com/CinKSDr.png)

[DEMO](https://codepen.io/gleofgja/pen/mdrvZwJ?editors=0011)

## Array.prototype.filter()

`filter()` : 將陣列中的「每一個」元素帶入指定的函式內做判斷，如果元素符合判斷條件，就回傳並產生新的陣列。

### filter 進階寫法

給一個新的陣列，塞選出大於 5 的數，如下

```javascript
let a = [1, 2, 3, 4, 5, 6, 7, 8]

let result = a.filter(function (e) {
  return e > 5
})
```

在 `console.log` 輸入 `result` ，顯示下圖
![](https://i.imgur.com/Gx8nF0M.png)

---

或是限制區間，要記得括號，不然 `return` 會認不出來

```javascript
let result = a.filter(function (e) {
  return e > 2 && e < 6
})
```

會顯示下圖
![](https://i.imgur.com/xbOszxf.png)

[DEMO ](https://codepen.io/gleofgja/pen/BaLMgvR?editors=0011)

## Array.prototype.find()

`find()` : 將陣列中的「每一個」元素帶入指定的函式內做判斷，只會傳<font color=#FF0000>第一個</font>符合判斷條件的元素，如果沒有元素符合則會回傳 undefined。

- `filter` 是回傳<font color=#FF0000>所有</font>符合條件的元素，但 `find` 只會傳<font color=#FF0000>第一個</font>符合判斷條件的元素

```javascript
let a = [1, 2, 3, 3, 3, 3]

// find
let resultFind = a.find(function (e) {
  return e > 2
})

// filter
let resultFilter = a.filter(function (e) {
  return e > 2
})
```

分別在 `console.log` 輸入兩個參數，顯示如下圖
![](https://i.imgur.com/WwPkaYN.png)

可以看到，輸入 :
`resultFind` 只會回傳符合條件的**第一個**，
`resultFilter` 會回傳**所有**符合條件的值同時產生新的陣列。

[DEMO](https://codepen.io/gleofgja/pen/MWjLNWz?editors=0011)

---

## 參考資料

[JavaScript Array 陣列操作方法大全 ( 含 ES6 )](https://www.oxxostudio.tw/articles/201908/js-array.html#array_filter)
[JS 語言基礎 06 陣列的進階方法](https://codeshiba.teachable.com/courses/1230968/lectures/29642888)
