---
title: JavaScript 實作 - 簡易表單驗證
date: 2020/12/31
tags:
  - JavaScript
  - 作品集
categories:
  - JavaScript
  - 作品集
---

功能敘述：
確認使用者輸入的資料是否正確。

![](https://i.imgur.com/vTeKNB1.png)
[Github](https://github.com/PKTseng/Web-Side-Project/tree/gh-pages/mission21)
[Demo](https://pktseng.github.io/Web-Side-Project/mission21/index.html)

<!--more-->

## 第一部分: 刻板+上色

先寫好要一般 form 表單要填寫的資料，

1. 使用者名稱
2. 使用者信箱
3. 密碼
4. 密碼 2 次驗證

上色跟輸入框的間隔可依照個人喜好設定

```html
<div class="container">
<!-- 輸入使用者名稱 -->
<form class='form' id='form'>
  <h1>表單驗證</h1>
  <div class="formControl">
    <label for="username">UserName:</label>
    <input type="text" id="username" placeholder="Key in UserName">
    <small class='failMessage'>Error message</small>
  </div>
  <!-- 輸入使用者e-mail -->
  <div class="formControl">
    <label for="email">E-mail:</label>
    <input type="text" id="email" placeholder="Key in E-mail">
    <small class='failMessage'>Error message</small>
  </div>
  <!-- 輸入使用者密碼 -->
  <div class="formControl">
    <label for="password">Password:</label>
    <input type="password" id="password" placeholder="Key in password">
    <small class='failMessage'>密碼錯誤</small>
  </div>
  <!-- 確認使用者密碼 -->
  <div class="formControl">
    <label for="confirmPassword">Confirm Password:</label>
    <input type="password" id="confirmPassword" placeholder="Key in password again">
    <small class='failMessage'>請重新輸入密碼</small>
  </div>
  <button type="submit">Submit</button>
</form>
</div>
<script src="./all.js"></script>
</body>
```

## 第二部分: 驗證

### 1. 抓取 DOM

先抓取 dom 元素，因為是抓 id 所以是用 `#`

```javascript
// 抓取 dom 元素
const form = document.querySelector('#form')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const confirmPassword = document.querySelector('#confirmPassword')
```

### 2. 常用的獨立寫出來

因為只要寫錯就會顯示錯誤訊息，這動作很重複所以將這些函式獨立拉出來，
利用 callback function 的方式重複使用
要特別注意以下兩點

1. 是第 3 行 `formControl` 必須要用 `父元素` 的方式不能用 class 選擇器，不然它只會抓取 class 選擇器的最後一個，不會抓到每個 input 輸入框的父層
2. 第 5 行的 `small` 必須用 `formControl` 的方式抓，不能用 `document` ，不然會抓不到

```javascript
// 失敗顯示
function showFail(input, message) {
  const formControl = input.parentElement
  formControl.className = 'formControl fail'
  const small = formControl.querySelector('small')
  small.innerText = message
}

// 成功顯示
function showSuccess(input) {
  const formControl = input.parentElement
  formControl.className = 'formControl success'
}

// 第一字體變大寫
function getFiledName(input) {
  return input.id.slice(0, 1).toUpperCase() + input.id.slice(1).toLowerCase()
}
```

### 3. 取消重複性

因為每個 dom 的 `input` 都要驗證的話就會有很多 `if else` 判斷式，這時候可以用 javascript 的 `forEach` 來讀取每個 dom ，然後再寫一次 `if else` 就可以每個都判斷

`checkInput` 裡面的值用陣列顯示，那每個質都要被讀取到就用 `forEach` ，在陣列中的 dom 因為綁了 `input` 所以直接帶入是否是空值得判斷式，因為如果寫在裡面會太大包，造成日後不好維護，外加太醜，所以這邊直接用 callback function 的方式

```javascript
// 輸入框輸入確認
function checkInput(inputId) {
  inputId.forEach(inputArr)
}

// 輸入框 callback function
function inputArr(input) {
  if (input.value.trim() === '') {
    showFail(input, `${getFiledName(input)} is require`)
  } else {
    showSuccess(input)
  }
}
```

### 4. 驗證

#### ( 1 ) 使用者名稱長度的驗證

為了防止使用者名字長度過長或是過短，所以要設定一個卡關機制

```javascript
// 輸入使用者名稱跟密碼長度限制
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showFail(input, `${getFiledName(input)} must be at least ${min} characters`)
  } else if (input.value.length > max) {
    showFail(
      input,
      `${getFiledName(input)} must be  less than ${max} characters`
    )
  } else {
    showSuccess(input)
  }
}
```

#### ( 2 ) 信箱驗證

```javascript
// 信箱正規表達驗證
function checkMail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  // return re.test(String(email).toLowerCase())
  if (re.test(input.value)) {
    showSuccess(input)
  } else {
    showFail(input, 'email is not valid')
  }
}
```

#### ( 3 ) 密碼雙重驗證

```javascript
// 密碼雙重驗證
function checkPasswordMatch(password, confirmPassword) {
  if (password.value !== confirmPassword.value) {
    showFail(confirmPassword, 'password is not match')
  }
}
```

#### ( 4 ) 執行

```javascript
// 執行
form.addEventListener('submit', function (e) {
  e.preventDefault()
  checkInput([username, email, password, confirmPassword])
  checkLength(username, 3, 8)
  checkLength(password, 3, 12)
  checkMail(email)
  checkPasswordMatch(password, confirmPassword)
})
```

### [Demo](https://codepen.io/gleofgja/pen/JjRpOje?editors=1010)

## 參考資料

[20 Web Projects With Vanilla JavaScript](https://www.udemy.com/course/web-projects-with-vanilla-javascript/learn/lecture/17842050#overview)
