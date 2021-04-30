---
title: JavaScript 實作 - 電影訂位
date: 2021/01/16
tags:
  - JavaScript
  - 作品集
categories:
  - JavaScript
  - 作品集
---

## 功能

1. 上方可以選擇要看的電影
2. 選取位子同時計算電影價格

完成圖
![](https://i.imgur.com/AHsrrmk.png)

[Github](https://github.com/PKTseng/Web-Side-Project/tree/gh-pages/mission22)
[DEMO](https://pktseng.github.io/Web-Side-Project/mission22/index.html)

## <!-- more -->

## HTML

HTML 結構分成以下幾點:

### 1. 下拉選單可以選擇電影

```html
<div class=".movieContainer">
  <label>Pick a movie:</label>
  <select id="movie">
    <option value="10">Avengers: Endgame ($10)</option>
    <option value="12">Joker ($12)</option>
    <option value="8">Toy Story 4 ($8)</option>
    <option value="9">The Lion King ($9)</option>
  </select>
</div>
```

---

### 2. 告示座位狀態圖

```html
<ul class="showcase">
  <li>
    <div class="seat"></div>
    <small>N/A</small>
  </li>
  <li>
    <div class="seat selected"></div>
    <small>Selected</small>
  </li>
  <li>
    <div class="seat occupied"></div>
    <small>Occupied</small>
  </li>
</ul>
```

---

### 3. 點選尚未選擇、已選擇的跟可以選擇的座位

```html
<div class="container">
  <div class="screen"></div>
  <div class="row">
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
  </div>
  <div class="row">
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
  </div>
  <div class="row">
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
  </div>
  <div class="row">
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
  </div>
  <div class="row">
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
  </div>
  <div class="row">
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
    <div class="seat"></div>
  </div>
</div>
```

---

### 4. 顯示選擇的座位數量跟電影票價

```html
<p class="text">
  You have selected
  <span id="count">0</span>
  seats for a price of $
  <span id="total">0</span>
</p>
```

---

### 完成的結構圖如下:

![](https://i.imgur.com/042hQLy.png)

---

## 樣式

載入字體 `@import url('https://fonts.googleapis.com/css?family=Lato&display=swap');`

依照 HTML 結構來增加樣式

### 1. 全域設定

移到視窗正中央

```scss
* {
  box-sizing: border-box;
}

body {
  background-color: #242333;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Lato', sans-serif;
  margin: 0;
}
```

![](https://i.imgur.com/vDuzvY2.png)

---

### 2. 給選單樣式

```scss
.movieContainer {
  margin: 20px 0;
  select {
    background-color: #fff;
    border: 0;
    border-radius: 5px;
    font-size: 14px;
    margin-left: 10px;
    padding: 5px 15px 5px 15px;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
  }
}
```

![](https://i.imgur.com/DXj1pmX.png)

---

### 3. 座位樣式

```scss
.seat {
  background-color: #444451;
  height: 12px;
  width: 15px;
  margin: 3px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.container {
  perspective: 1000px;
  margin-bottom: 30px;
  .row {
    display: flex;
  }
}
```

![](https://i.imgur.com/AEuoijm.png)

---

### 4. 屏幕樣式

```scss
.screen {
  background-color: #fff;
  height: 70px;
  width: 100%;
  margin: 15px 0;
  transform: rotateX(-45deg);
  box-shadow: 0 3px 10px rgba(255, 255, 255, 0.7);
}
```

![](https://i.imgur.com/n1si14x.png)

---

### 5. 選擇座位數量跟票價的樣式

```scss
p.text {
  margin: 5px 0;
  span {
    color: #6feaf6;
  }
}
```

![](https://i.imgur.com/U2033ZX.png)

---

### 6. 排列一下座位

```scss
.showCase {
  background: rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  border-radius: 5px;
  color: #777;
  list-style-type: none;
  display: flex;
  justify-content: space-between;
  &.seat:not(.occupied):hover {
    cursor: default;
    transform: scale(1);
  }
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    small {
      margin-left: 2px;
    }
  }
}
```

![](https://i.imgur.com/lz2FabD.png)

---

### 7. 排列電影座位

因為是 scss 寫法所以寫在 seats 裡面

```scss
.seat {
  background-color: #444451;
  height: 12px;
  width: 15px;
  margin: 3px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  &.selected {
    background-color: #6feaf6;
  }
  &.occupied {
    background-color: #fff;
  }
  &:nth-of-type(2) {
    margin-right: 18px;
  }
  &:nth-last-of-type(2) {
    margin-left: 18px;
  }
  &:not(.occupied):hover {
    cursor: pointer;
    transform: scale(1.2);
  }
}
```

![](https://i.imgur.com/AGT0L4B.png)

---

以上切版就算完成了~~~

## JavaScript

接下來要進行 JavaScript 事件的撰寫

### 1. 抓取 DOM 元素

用選擇器抓取 dom 元素，在賦值到各個變數上，會使用 const 是因為此變數之後不能在更動。

```javascript
const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.querySelector('#count')
const total = document.querySelector('#total')
const movieSelect = document.querySelector('#movie')
```

### 2. 選擇座位時觸發的事件

當點擊座位時會先判斷 class 是否有 seat 同時不包含 occupied 的，再用 contains 讓值變成布林值，如果回傳 true 就會用 toggle 增加 selected 屬性，這樣當我們選擇座位時就會更改樣式了。

下面再放一個 `updateSelectCount` 函式，在我們更動座位時就會觸發。

```javascript
// 監聽容器內座位數值的變化
container.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected')
    updateSelectCount()
  }
})
// 執行
updateSelectCount()
```

### 3. 計算座位數量跟電影票價

當我們選擇座位的時候同時計算座位數量跟電影價格，再將數量跟價格賦予到 DOM 元素裡面。
利用 `querySelectorAll` 把 `.row .seat.selected` 選起來，再以陣列的方式傳回，
用 `console.log(selectedSeats)` 會看到下圖

![](https://i.imgur.com/B92hT1v.png)

![](https://i.imgur.com/YPyzIup.png)

有了陣列後就可以計算數量，用 `console.log(selectedSeatCount)` 可以看到選擇的數量，例如我選 4 個座位
![](https://i.imgur.com/xgbbFI1.png)

![](https://i.imgur.com/BVUtWeY.png)

再把選擇座位的數量賦予到 `count` DOM 元素裡面，就是最下面會顯示的座位數量，再利用這數量去計算票價後，賦直到 `total` 裡面。
![](https://i.imgur.com/MJr3DwM.png)

- `ticketPrice` 會用 `+` 號的原因是要將字串轉成數字型式

這段程式碼如下:

```javascript
let ticketPrice = +movieSelect.value

// 計算選擇的座位數量價格
function updateSelectCount() {
  // 將所選取到的座位塞入 selectedSeats 這個變數中
  const selectedSeats = document.querySelectorAll('.row .seat.selected')

  const selectedSeatCount = selectedSeats.length
  count.innerText = selectedSeatCount // 將選到的座位數量塞到 count 裡面
  total.innerText = selectedSeatCount * ticketPrice // 計算座位數量跟票價
}
```

### 4. 選擇電影同時計算票價

這函式是為了當我們在切換電影的時候，重新計算座位跟票價。

在選擇電影的時候就會觸發，計算當下所選的電影價格，再將電影的索引跟選擇的價格放到 `setMovieData` callback function 裡面，同時更新座位數量跟票價。

- `+e.target.value` 前面的 `+` 為了確保是數字型別。

```javascript
// 依照選擇的電影變更價格
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value

  // 查看我們選擇的電影索引跟價格
  // console.log(e.target.selectedIndex, e.target.value)

  setMovieData(e.target.selectedIndex, e.target.value)
  // 將電影索引跟價格的參數塞到 setMovieData 裡面
  updateSelectCount() //執行
})
```

到目前為止，我們已經完成選擇座位的數量跟票價的計算。接下來要進入到 localStorage 裡面進行設定，因為目前以目前的成是馬刷新頁面，資料就會不見，所以要記錄到瀏覽器的資料庫裏面。

### 5. 將資料紀錄到瀏覽器的數據庫裡面

這麼做的原因是防止我們刷新頁面的時候剛才所選的資料全部都消失，這時候就會用到 localStorage、setItem、getItem、JSON.parse 等觀念。

上段 `movieSelect` 函式是在監聽選擇電影價格跟位字的索引，當我們在選擇座位或是電影的同時就會觸發到 `setMovieData` 函式，而 `setMovieData` 函式帶入的那兩個值就是要記錄到瀏覽器資料庫裡面的參數。

- #### localStorage
  如果想把資料存在瀏覽器的資料庫裡裡面就會用到 localStorage，但要注意的是 localStorage 會只接受字串，所以要將資料轉成字串 (string) 的型式。

課程中有使用到 ES6 解構語法，將所選擇的座位 `selectedSeats` 變成陣列，再利用 map 語法處理陣列中的每個元素，然後回傳出新的值。

- map: (第一個是每個元素的值 ( 必填 )，第二個是當前元素的索引值 ( 選填 )，第三個是當前的陣列 ( 選填 ))
- indexOf: 會判斷陣列中是否包含某個值，判斷的方式為「由左而右」，如果有包含就回傳這個值在陣列中的索引值

這段函式的意思是當我選擇了座位 `selectedSeats` ，將這些選擇的座位化成陣列型式`[...selectedSeats] `，再把陣列內的座位拿去判斷 (indexOf) 索引值再回傳，如果找不到索引值就會顯示 -1。

用 console 查看，當我選擇了第 1、第 2 跟第 7 個座位就會顯示索引值跟陣列。
![](https://i.imgur.com/azBL9mU.png)

而此段函式要放到 `updateSelectCount` 函式中，這樣再選取座位的時候就會把索引值傳存到 localStorage 裡面。

```javascript
// 將[...selectedSeats]解構的值塞到函式裡面運算，再把結果 return 出來
const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat))
```

- #### setItem
  當我們將資料設定到瀏覽器數據庫裡面時，這個設定就是 setItem ，
  寫法是這樣 `setItem('key', value)`
  `key` 值就像是我們在填寫表單的時候會有姓名、年紀、電話這些的開頭
  `value` 值就是依照表單中的開頭依序填寫的內容，如: ken、100 歲、0910xxxxx

在 `setMovieData` 函式中我們將座位索引的 `key` 設定成 `selectedMovieIndex`， `value` 設定成 `movieIndex`，同理，價格也是這樣設定，目的是將資料存入 localStorage 裡面。

```javascript
// 透過 localStorage 抓取電影索引值跟價格
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
}

localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
```

- #### getItem
  用 setItem 設定好 key 跟 value 的值後，要將 value 值取出的話就要用 getItem 抓 key 值。

```javascript
localStorage.getItem('selectedSeats')
```

- #### JSON.parse
  因為 localStorage 只能讀字串型式的資料，所以當我們在讀取或是抓取資料的時候必須是物件的型式，這時就會用到 `JSON.parse`。

```javascript
const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
```

### 6. populateUI function

在選好座位數量並透過 setIetm 存放到 localStorage 資料庫裡面，現在要使用這些資料，所以會先用 getItem 抓取，然後在轉成物件格式，轉物件是因為資料如果是字串會抓不到，轉完之後在賦值到 `selectedSeats` 變數裡面

接下來就用`selectedSeats`變數來判斷是不是空值同時數量又必須大於 1，如果回傳的是 true ，再用 `forEach` 運算 `seats` 裡的每個參數，看看選擇的值是否都大於-1，因為陣列第一個值為 0，如果回傳 true ，再將 className 添加到 seat 裡面。

執行 populateUI 函式時也會同時執行另一項函式，剛才已經把電影的索引值設定好並丟到 localStorage 裡面，當我們在選擇電影時會先判斷我們選擇的是否是空值，如果不是就將這項索引值賦予到 `movieSelect` 函式裡。

- forEach: 會將陣列中每個元素套用到指定的函式裡進行運算

```javascript
// 紀錄資料，刷新後記錄仍然在
function populateUI() {
  // 因為剛才是轉成字串，這裡要轉成物件
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex
  }
}
// 執行
populateUI()
```

---

### 完整程式碼

```javascript
const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.querySelector('#count')
const total = document.querySelector('#total')
const movieSelect = document.querySelector('#movie')
let ticketPrice = +movieSelect.value

// 計算選擇的座位數量價格
function updateSelectCount() {
  // 將所選取到的座位塞入 selectedSeats 這個變數中
  const selectedSeats = document.querySelectorAll('.row .seat.selected')

  const selectedSeatCount = selectedSeats.length
  count.innerText = selectedSeatCount // 將選到的座位數量塞到 count 裡面
  total.innerText = selectedSeatCount * ticketPrice // 計算座位數量跟票價

  // 將[...selectedSeats]解構的值塞到函式裡面運算
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat))
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
}

// 依照選擇的電影變更價格
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value

  // 查看我們選擇的電影索引跟價格
  // console.log(e.target.selectedIndex, e.target.value)

  // 將電影索引跟價格的參數塞到 setMovieData 裡面
  setMovieData(e.target.selectedIndex, e.target.value)
  updateSelectCount() //執行
})

// 透過 localStorage 抓取電影索引值跟價格
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
}

// 紀錄資料，刷新後記錄仍然在
function populateUI() {
  // 因為剛才是轉成字串，這裡要轉成物件
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex
  }
}
populateUI()

// 監聽容器內座位數值的變化
container.addEventListener('click', (e) => {
  // contains 會返回一個 boolean 值
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected')
    updateSelectCount()
  }
})

updateSelectCount()
```

---

## 參考資料

[JavaScript Array 陣列操作方法大全 ( 含 ES6 )](https://www.oxxostudio.tw/articles/201908/js-array.html#array_foreach)
[20 Web Projects With Vanilla JavaScript](https://www.udemy.com/course/web-projects-with-vanilla-javascript/learn/lecture/17842068#questions)
