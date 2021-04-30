---
title: JavaScript 實作 - 明年倒數計時
date: 2021/02/05
tags:
  - JavaScrip
  - 作品集
  - 偽元素
categories:
  - JavaScript
  - 作品集
---

## 功能描述:

1. 網頁載入會顯示 loading 效果。
2. loading 完會顯示距離明年倒數時間。

![](https://i.imgur.com/lv6I4AW.png)

[Github](https://github.com/PKTseng/Web-Side-Project/tree/gh-pages/mission29)
[Demo](https://pktseng.github.io/Web-Side-Project/mission29/index.html)

<!--more-->

## 架構

用容器把顯示內容放在裡面，方便 loading 效果結束時控制這個容器要不要顯示。
容器放置內容

1. 跨年標題。
2. 顯示倒數時間的天、時、分、秒。
3. Loading 效果。

```html
<div class="container">
  <h1>Happy New Year</h1>
  <ul id="countdown" class="countdown">
    <li class="times">
      <p id="days">00</p>
      <small>days</small>
    </li>
    <li class="times">
      <p id="hours">00</p>
      <small>hours</small>
    </li>
    <li class="times">
      <p id="minutes">00</p>
      <small>minutes</small>
    </li>
    <li class="times">
      <p id="seconds">00</p>
      <small>seconds</small>
    </li>
  </ul>
</div>

<img src="./image/spinner.gif" id="loading" />
```

架構完成圖
![](https://i.imgur.com/TOa6NkA.png)

## CSS 樣式

### 偽元素 ( before & after )

因為背景圖片太亮的關係導致文字顏色不是很明顯，可以透過偽元素將背景圖片的顏色刷黑一點，再用` z-index` 屬性把文字呈現在最上層，這樣不只看到背景圖片又可以清楚看到文字。

偽元素必須要有 `content` 屬性，如果沒有效果會呈現不出來。

```css
body::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
```

- `z-index: 數字` : 數字越大代表越優先被排在畫面最上層。

我把文字內容放在 `container` 容器裡面，只要加入 `z-index` 屬性，就可以把文字內容放在暗色調的上一層。

```css
.container {
  z-index: 1;
}
```

沒用偽元素
![](https://i.imgur.com/DKSnH25.png)

有用偽元素，字體顏色會比較清楚
![](https://i.imgur.com/C4gRveP.png)

## JavaScript

### 1. 計算公式

查看目前還剩多少時間到明年元旦，可以用以下公式

```javascript
// 剩下時間 = 現在的年份 + 1 ( 明年元旦 ) - 現在的時間 ( 現在 )
const totalTime = newYear - newTime
```

### 2. 現在時間

用 `new Date` 抓取現在時間，有了現在時間的值再把值賦予到變數裡面，但要注意目前抓到的值是物件型別。
![](https://i.imgur.com/1jB2jRX.png)

有了完整時間後，可以用 `getFullYear` 抓取現在年份同時轉換型別。

- `getFullYear` : 用來取得一個 Date 物件的<font color=#FF0000>年份</font>，時區是本地時間。

沒有 `getFullYear` 抓到的值會試完整時間，型別是物件型式。

```javascript
const times1 = new Date()
console.log(times1)
console.log(typeof times1)
```

![](https://i.imgur.com/TmmMHfe.png)

---

有 `getFullYear` 就抓取當前的年份，同時轉成數字型別，轉型別的目的是為了方便把目前時間 +1 變成明年。

```javascript
const nowYear = new Date().getFullYear()
console.log(nowYear)
console.log(typeof nowYear)
```

![](https://i.imgur.com/H5hLrok.png)

### 3. 明年元旦時間

把剛才用 `getFullYear` 轉換的年份 +1 就是明年年份。

```javascript
// 現在的年份 + 1 ( 明年 )
const newYear = new Date(`January 01 ${nowYear + 1} 00:00:00`)
```

### 4. 倒數計時

用 `console` 查看 `totalTime` 為<font color=#FF0000>總毫秒</font>。
( 毫秒 / 1000 ) = 秒
( 毫秒 / 1000 ) % 60 = 當下的<font color=#FF0000>秒數</font>。
( 毫秒 / 1000 / 60 ) % 60 = 當下的<font color=#FF0000>分鐘數</font>。
( 毫秒 / 1000 / 60 /60 ) % 24 = 當下的<font color=#FF0000>小時數</font>。
( 毫秒 / 1000 / 60 /60 / 24) = 當下的<font color=#FF0000>天數</font>。
把算出來的值綁定到 dom 上，讓呈現在畫面上。

在不管是小時、分鐘、秒數都會有個位數，出現個位數前面可加 `"0"`，用三源判斷式。

```javascript
function getTime() {
  const newTime = new Date()
  // console.log(newTime)
  const totalTime = newYear - newTime
  // console.log(totalTime)

  const day = Math.floor(totalTime / 1000 / 60 / 60 / 24)
  // console.log(day)
  const hours = Math.floor(totalTime / 1000 / 60 / 60) % 24
  // console.log(hours)
  const minutes = Math.floor(totalTime / 1000 / 60) % 60
  // console.log(minutes)
  const seconds = Math.floor(totalTime / 1000) % 60
  // console.log(seconds)

  dayEl.innerHTML = day
  hourEl.innerHTML = hours < 10 ? '0' + hours : hours
  minutesEL.innerHTML = minutes < 10 ? '0' + minutes : minutes
  secondsEl.innerHTML = seconds < 10 ? '0' + seconds : seconds
}
// getTime() 每秒執行一次
setInterval(getTime, 1000)
```

### 5. loading 效果

每刷新頁面就會顯示一下 loading 效果。

畫面載入一秒後移除 loading 效果，同時顯示時間。

```javascript
setTimeout(() => {
  loading.remove()
  countdown.style.display = 'flex'
}, 1000)
```

## 參考資料

[JavaScript Date getFullYear()](https://www.fooish.com/javascript/date/getFullYear.html)
[CSS 偽元素 ( before 與 after )](https://www.oxxostudio.tw/articles/201706/pseudo-element-1.html)
[重新認識 JavaScript: Day 06 運算式與運算子](https://ithelp.ithome.com.tw/articles/10191180)
