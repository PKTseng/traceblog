---
title: JavaScript 實作 - 簡易版匯率轉換
date: 2021/01/08
tags:
  - JavaScript
  - 作品集
categories:
  - JavaScript
  - 作品集
---

功能敘述：
切換匯率計算各國的匯率。

![](https://i.imgur.com/noQPS8F.png)
[Github](https://github.com/PKTseng/Web-Side-Project/tree/gh-pages/mission23)
[Demo](https://pktseng.github.io/Web-Side-Project/mission23/index.html)

<!--more-->

---

## 1. 用 JS 撰寫

#### 利用選擇器抓取 DOM 元素

```javascript
const currencyElOne = document.querySelector('#currencyOne')
const currencyElTwo = document.querySelector('#currencyTwo')
const amountElOne = document.querySelector('#amountOne')
const amountElTwo = document.querySelector('#amountTwo')
const swapEl = document.querySelector('#swap')
const rateEl = document.querySelector('#rate')
```

---

#### 監聽抓取 dom 的操作事件，同時綁定事件的操作

```javascript
// 監聽 DOM 狀態
currencyElOne.addEventListener('change', caclulate)
currencyElTwo.addEventListener('change', caclulate)
amountElOne.addEventListener('input', caclulate)
amountElTwo.addEventListener('input', caclulate)
```

---

#### 事件操作

[API](https://www.exchangerate-api.com/)
這邊要注意的是 Fetch API 的方式，在打完 API ，response 資料的時候，雖然資料已經是 JSON 格式，但 Fetch 必須再轉一次 JSON，變成 `json promise`，否則是抓不到後端回傳的資料的。
[參考文章](https://www.oxxostudio.tw/articles/201908/js-fetch.html)

```javascript
// 操作 DOM 同時執行運算
function caclulate() {
  // 透過選取的 DOM 將該 DOM的值塞到新變數中
  const currencyOne = currencyElOne.value
  const currencyTwo = currencyElTwo.value

  // 發送 request ，開始打 API
  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
    // 後端傳送 response 回傳結果
    .then((res) => res.json()) //將回傳結果轉換成 json 格式
    .then((data) => {
      // console.log(data)

      // 用陣列的方式抓去 keyValue，再將值塞到 rate 變數中
      const rate = data.rates[currencyTwo]
      // console.log(rate)

      //將計算後的值放到綁定的 rate dom 中，同時計算當前匯率
      rateEl.innerHTML = `1 ${currencyOne} = ${rate} ${currencyTwo}`

      // 幣值2的值 = 幣值1的值*匯率，將值四捨五入
      amountElTwo.value = (amountElOne.value * rate).toFixed(2)
    })
}
```

---

#### 切換匯率，將匯率互相對調

這邊要注意的是，必須要先將`currencyElOne.value` 塞到 `temp` 變數中，方便待會賦值，會這樣做是有原因的

以下列這段程式碼為例，分別用 `console.log` 查看值

```javascript
swapEl.addEventListener('click', function () {
  const temp = currencyElOne.value

  currencyElOne.value = currencyElTwo.value
  console.log('currencyElOne.value', currencyElOne.value)

  currencyElTwo.value = currencyElOne.value
  console.log('currencyElTwo.value', currencyElTwo.value)

  // currencyElTwo.value = temp
  // console.log('temp', temp)
  caclulate()
})
```

結果如下圖
![](https://i.imgur.com/qQYix3x.png)

兩個轉換的匯率都會長一樣，而且匯率永遠都會卡 1，無法轉換，如下圖
![](https://i.imgur.com/1AO39Zg.png)

為防止這樣的情況發生，可以先將 `currencyElOne.value` 塞到 `temp` 中，再確認 `temp` 值的是否有抓到，如下圖
![](https://i.imgur.com/f4LpfCR.png)

然後再將 `temp` 賦予到`currencyElTwo.value`，這樣就可以避免匯率卡 1 的問題，最後要記得執行計算。

完整函式如下

```javascript
swapEl.addEventListener('click', function () {
  const temp = currencyElOne.value
  currencyElOne.value = currencyElTwo.value
  currencyElTwo.value = temp
  caclulate()
})
```

---

## 2. 用 jQuery 撰寫

#### 抓取 DOM ，同時綁定事件

先將每個 DOM 事件切割成一小部分，撰寫方法也要為簡單，步驟如下:

1. 抓取 DOM 元素 `$('#currencyOne')`
2. 後面再接事件`change`，
3. 事件裡面會包發生的動作 `caclulate()`
4. 執行 `caclulate()`

```javascript
// 將 dom 切割成小事件
// 監聽 currencyOne 選取值
$('#currencyOne').change(function () {
  caclulate()
})

// 監聽 amountOne 選取值
$('#amountOne').change(function () {
  caclulate()
})

// 監聽 currencyTwo 選取值
$('#currencyTwo').change(function () {
  caclulate()
})

// 監聽 amountTwo 選取值
$('#amountTwo').change(function () {
  caclulate()
})

caclulate()
```

---

#### 事件裡面會包發生的動作

這邊示範用 jquery ajax 打 api

```javascript
// 變動容器內的 dom，同時計算匯率
function caclulate() {
  // 用 jquery 的方式命名變數
  let currencyOne = $('#currencyOne').val()
  let currencyTwo = $('#currencyTwo').val()
  let rate = $('#rate').val()

  // 用 ajax 打 api
  $.ajax({
    methods: 'GET',
    url: `https://api.exchangerate-api.com/v4/latest/${currencyOne}`,
  })
    // 後端 respose 資料，將資料用 res 命名
    .done(function (res) {
      // 可用 console.log(res) 查看 response api
      // 將後端的資料塞到 rate 裡面，[currencyTwo] 是抓取物件 keyValue
      let rate = res.rates[currencyTwo]
      // 用 console.log(rate) 查看是否有抓到 keyValue

      // 將匯率轉換後的值塞到 amountTwo dom 裡面，並4捨5入取到第2位
      $('#amountTwo').val(($('#amountOne').val() * rate).toFixed(2))

      // 將轉換的匯率顯示在各匯率之間
      $('#rate').text(`1 ${currencyOne} = ${currencyTwo} * ${rate}`)
    })
}
```

---

#### 動作的匯率對調

函式邏輯跟上面 js 的一樣，差別寫法上會有些微的不同

```javascript
// 按下 swap dom 會將匯率對調
$('#swap').click(function () {
  let temp = $('#currencyOne').val()
  $('#currencyOne').val($('#currencyTwo').val())
  $('#currencyTwo').val(temp)
  caclulate()
})
```

---

## 參考資料:

[JavaScript Fetch API 使用教學](https://www.oxxostudio.tw/articles/201908/js-fetch.html)
[20 Web Projects With Vanilla JavaScript](https://www.udemy.com/course/web-projects-with-vanilla-javascript/learn/lecture/17842116#questions)
