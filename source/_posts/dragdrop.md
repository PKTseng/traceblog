---
title: JavaScript 實作 - 拖曳效果
date: 2021/02/08
tags:
  - JavaScript
  - 作品集
  - dragDrop
categories:
  - JavaScript
  - 作品集
---

## 功能描述:

1. 刷新頁面打亂排列順序。
2. 可以拖曳方塊排列順序。
3. 確認排列順序是否正確。

![](https://i.imgur.com/1xYdtS0.png)

[Github](https://github.com/PKTseng/Web-Side-Project/tree/gh-pages/mission30)
[Demo](https://pktseng.github.io/Web-Side-Project/mission30/index.html)

<!--more-->

## 架構

```html
<h1>苗栗國必去前10名景點</h1>
<p>請利用拖曳排列出這10名的順序</p>
<ul class="draggable-list" id="draggable-list"></ul>
<button class="check-btn" id="check-btn">
  Check Attractions
  <i class="fas fa-paper-plane"></i>
</button>
```

拖曳方塊不能寫死，因為每次刷新頁面順序會打亂，打亂的順序排名用 javascript 撰寫。

## CSS 樣式

拖曳的時候會呈現色差

```css
.draggable-list li.over .draggable {
  background-color: #eaeaea;
}
```

用顏色確認目前排列順序是否正確。

```css
.draggable-list li.right .person-name {
  color: #3ae374;
}

.draggable-list li.wrong .person-name {
  color: #ff3838;
}
```

按鈕縮放效果

```css
.check-btn:active {
  transform: scale(0.98);
}
```

點擊按鈕不要有邊框線條

```css
.check-btn:focus {
  outline: none;
}
```

## JavaScript

### 1. 綁定 DOM ，給初始值

```javascript
const draggableList = document.querySelector('#draggable-list')
const checkBtn = document.querySelector('#check-btn')

const attractions = [
  '客家大院',
  '後龍鎮半天寮休閒文化園區 - 好望角',
  '天空之城',
  '九華山 天空步道',
  '苗栗客家圓樓',
  '雅聞七里香玫瑰森林',
  '龍騰斷橋(魚藤坪斷橋)',
  '飛牛牧場',
  '銅鑼炮仗花海公園',
  '舊銅鑼隧道',
]

let dragStartIndex
const listItems = []
```

### 2. 產生 DOM 並呈現在畫面上

> 展開運算符 ( Spread Operator ) :
> 是把一個陣列展開成個別值，這個運算符後面必定接著一個陣列。
> 最常見的是用來組合 ( 連接 ) 陣列。

> 其餘運算符 ( Rest Operator ) :
> 是收集其餘的 ( 剩餘的 ) 這些值，轉變成一個陣列。它會用在函式定義時的傳入參數識別名定義 ( 其餘參數, Rest parameters )，以及解構賦值時
>
> 以上兩點引述自 : [展開運算符與其餘運算符](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/rest_spread.html)

`setAttribute( 'data-名稱', 'value 值')` : 設定元件屬性，就是在元件上賦予名字跟值。
不過這命名不能亂命，為了方面辨識或是避免搞混，在名稱前面會加上 `data-` 。
以下範例用 `console` 查看
![](https://i.imgur.com/tx1LA4c.png)

不過上面值是 `number` ，如果是字串要用 `string`，以下示範

```javascript
// 加兩個屬性
listItem.setAttribute('data-id', 'dataId')
listItem.setAttribute('data-name', 'dataName')
```

![](https://i.imgur.com/DuEqPBg.png)

利用**展開運算符**把陣列內的景點變成個別的值，再用 `forEach` 產生每筆資料，每筆資料用 `setAttribute` 設定索引值，再把資料加入倒 `ul` 元件底下。

```javascript
creatListItem()

function creatListItem() {
  ;[...attractions].forEach((person, index) => {
    const listItem = document.createElement('li')
    listItem.setAttribute('data-Index', index) //這不是設定className，單純的 name 跟 value

    listItem.innerHTML = `
    <span class='number'>${index + 1}</span>
    <div class='draggable' draggable='true'>
      <p class='person-name'>${person}</p>
      <i class='fas fa-grip-lines'></i>
    </div>
    `
    listItems.push(listItem)
    draggableList.appendChild(listItem)
  })

  addEventListeners()
}
```

### 3. 資料隨機排列

有了資料後，每次刷新頁面資料要隨機排列。
要隨機排列就要有亂數，並且把亂數跟字串綁定，這樣每次刷新頁面順序就會是亂的。

把陣列內的字串用 map 產生出新的陣列 :
將字串賦予到 value 裡面，再用 `Math.random()` 產生亂數，把這些亂數賦予到 sort 裡面，但是目前排列順序還是不對，必須依照我設定的順序跟數字綁定

```javascript
;[...attractions].map((a) => ({ value: a, sort: Math.random() }))
```

![](https://i.imgur.com/asWCFfa.png)

- ` sort()` : 把資料依照正確順序排列。[Codepen](https://codepen.io/gleofgja/pen/LYbNwoE?editors=0011)

```javascript
// 本來陣列內數字是亂的，經過 sort 會依照大小排列
const numbers = [1, 3, 9, 6, 20, 15]
console.log(
  numbers.sort(function (a, b) {
    return a - b
  })
)

// arrow function
console.log(numbers.sort((a, b) => a - b))
```

![](https://i.imgur.com/rRpF2i2.png)

看過上面的解釋後，接下來要把陣列內的字串跟正確的數字順序做綁定。

```javascript
;[...attractions].sort((a, b) => a.sort - b.sort)
```

![](https://i.imgur.com/WRDnx5f.png)
比照上面那張圖，原本是亂掉的，現在依照陣列內的順序讓數字由小到大排列。

有了順序後，數字不被看見，只要取 value 就好。

```javascript
.map((a) => a.value)
```

### 4. 拖曳效果

下表參考自 : [HTML5 Drag and Drop API 筆記](https://hff2.github.io/2021/02/02/HTML5-Drag-and-Drop-API-%E7%AD%86%E8%A8%98/)
| | Drag Source | Drag Target |解釋 |
| -------- | -------- | -------- |-------- |
| 1 | dragstart| |**開始**拖曳元素時觸發此事件|
| 2 | drag | dragenter |拖曳元素時觸發此事件|
| 3 | | dragover |當元素拖曳到**有效位置放置**則觸發此事件|
| 4 | | dragleave |拖曳的元素**離開**有效的位置時觸發|
| 5 | | drop |在**有效位置**上**放置**元素時觸發此事件|
| 6 | dropend | |當拖曳**結束**時會觸發此事件|

> 這段來自 : [製作可拖曳的元素（HTML5 Drag and Drop API）](https://pjchender.blogspot.com/2017/08/html5-drag-and-drop-api.html) > ![](https://i.imgur.com/BoqFTzM.png)
>
> - **Drag Source** 指的是被點擊要拖曳的物件，也就是藍色的圓，通常是一個 element。
> - **Drop Target** 指的是拖曳的物件被放置的區域，也就是右邊的綠色區域，通常是一個 div container。
> - **drag**：在 drag source 被拖曳時會持續被觸發。
> - **dragover**：當拖曳的 drag source 在 drop target 上方時會持續被觸發。

```javascript
function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable')
  const dragListItems = document.querySelectorAll('.draggable-list li')
  //選到 ul 底下所有 li ( 因為 li 沒有 calssName ，所以這樣寫)

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart)
  })

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver)
    item.addEventListener('drop', dragDrag)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave', dragLeave)
  })
}
```

拖曳時更換顏色

```javascript
function dragEnter() {
  // console.log('Event: ', 'dragEnter')
  this.classList.add('over')
}

function dragLeave() {
  // console.log('Event: ', 'dragLeave')
  this.classList.remove('over')
}
```

當我拖曳時 `dragstart` 就會開始抓取當前的索引值

```javascript
function dragStart() {
  // console.log('Event: ', 'dragStart')
  //拖曳的時候抓取索引值
  dragStartIndex = +this.closest('li').getAttribute('data-Index')
  //上面設定索引值，這裡抓索引值，+ 號改型別用
  // console.log(dragStartIndex)
  // console.log(typeof dragStartIndex)
}
```

如果沒有 `+` 號，當我拖曳第一個，用 `console` 看會顯示下圖
![](https://i.imgur.com/lQOGwH6.png)

有 `+` 號
![](https://i.imgur.com/ZTQX984.png)

抓到索引值後把拖曳到該欄位的索引值對換。

```javascript
function dragDrag() {
  // console.log('Event: ', 'dragDrag')
  const dragEndIndex = +this.getAttribute('data-Index')
  swapItems(dragStartIndex, dragEndIndex)
  this.classList.remove('over')
}

function swapItems(from, to) {
  const itemOne = listItems[from].querySelector('.draggable')
  const itemTwo = listItems[to].querySelector('.draggable')

  listItems[from].appendChild(itemTwo)
  listItems[to].appendChild(itemOne)
}
```

### 5. 確認清單順序是否正確

```javascript
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim()

    if (personName !== attractions[index]) {
      listItem.classList.add('wrong')
    } else {
      listItem.classList.remove('wrong')
      listItem.classList.add('right')
    }
  })
}

checkBtn.addEventListener('click', checkOrder)
```

## 參考資料

[展開運算符與其餘運算符](https://eyesofkids.gitbooks.io/javascript-start-from-es6/content/part4/rest_spread.html)
[HTML5 Drag and Drop API 筆記](https://hff2.github.io/2021/02/02/HTML5-Drag-and-Drop-API-%E7%AD%86%E8%A8%98/)
[製作可拖曳的元素（HTML5 Drag and Drop API）](https://pjchender.blogspot.com/2017/08/html5-drag-and-drop-api.html)
[20 Web Projects With Vanilla JavaScript](https://www.udemy.com/course/web-projects-with-vanilla-javascript/learn/lecture/17842252#overview)
