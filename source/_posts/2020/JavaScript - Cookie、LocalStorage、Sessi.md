---
title: JavaScript - Cookie、LocalStorage、SessionStorage 的差異跟使用
date: 2021/01/18
tags:
  - JavaScript
categories:
  - Cookie
  - LocalStorage
  - SessionStorage
---

## 前言

利用 Javascript 將資料存到瀏覽器裡面，但是因為 `http request` 的關係，瀏覽器並不會知道上一個跟目前的使用者是誰，這時候就需要把使用者的資料帶到後端 sever 上。

例如我在 A 電腦開啟購物網頁選購商品並存取選購的商品資料但是在 B 電腦開啟同樣的網頁但是卻沒有剛才在 A 電腦選購的資料，這是因為資料是存在自己本地的瀏覽器裡面而不是存在後端的 sever 上，如果是存在後台的 sever 上，那不管我使用哪一台點腦，都可以開啟我在 A 電腦上選購的資料。

接下來就要介紹瀏覽器是如何存取資料的。

<!-- more -->

## Cookie

### 介紹

Cookie 本身非常小，只有 4k 所以載入速度很快，瀏覽器也會記錄使用者的資料，最多可以記錄 300 多個 Cookie，但一個網站最多只能記錄 20 個左右的 Cookie 。那 Cookie 是透過 `Set-Cookie header response` 給客戶端的瀏覽器，每當我們開啟瀏覽器發出 request 時， sever 端都會自動把該網站 (domain) 的 Cookie 自動載入。

### 用途

通常都會被使用在登入頁面的狀態、購物網站的選購資訊或是追蹤客戶的廣告上。

### 特點

1. 大小只有 4Kb 左右
2. 紀錄使用者的個資
3. 每當瀏覽器發出 request 都會自動載入該使用的資料
4. 將資料存在客戶端
5. 只能在該網站 (domain) 內開啟
6. 可以設定關閉瀏覽器後失效的時間

### Set-Cookie header

如果要讓無狀態的 http 知道客戶目前的狀態，就要用 `Set-Cookie` 把使用紀錄存到 Cookie 裡面，這樣下次在別的瀏覽器上向同個網站 (domain) 的 sever 發出 request 的時候，`Request Headers` 就可以透過 sever 查看 Cookie 的內容同時確認目前客戶的狀態。

Set-Cookie 寫法如下:

```javascript
Set-Cookie: key = value
```

瀏覽器會依照 `Set-Cookie` 設定的內容建立 `key` 跟 `value`。之後當瀏覽器發出 request 的時候，就會自動載入 `key` 跟 `value`。

### Cookie 屬性

除了 `Set-Cookie` 外，還有其他要知道的屬性。

- `domain` : Cookie 一定要在同個網站 (domain)，下輸入使用者資料，不可能拿 A 網站的 Cookie ，用在 B 網站上。
- `path` : 只能讀取到指定路徑下的 Cookie，如果要讓整個網站都能讀取到就寫 `path = /` 。
- `Max-Age` : 設定有效期限，<font color=#FF0000>單位為秒</font>，設定的數字是正值時才有效，負值時為本次 session 有效，寫 0 就是刪除 Cookie。
- `Expires` : 一樣是設定有效時間，但在 HTTP 1.1 之後已經被 `max-age` 取代。
- `secure` : 當這個屬性被設為 true 時， Cookie 只能在安全的協議 (https) 中傳送。

### Create a Cookie

在 JavaScript 裡面，一次只能建立一個 Cookie ，語法如下:

```javascript
document.cookie = newCookie
// newCookie 指的就是 key = value
```

當一個 cookie 沒有設定失效時間，就是 session cookie ，該 cookie 會在使用者關閉瀏覽器後被自動刪除。

```javascript
// 設定兩個 cookie 叫 one, two
// 在瀏覽器關閉後會自動被刪除
document.cookie = 'one=cookieOne'
document.cookie = 'two=cookieTwo'

// 設定一個 age cookie 裡面的值是 22，儲存一分鐘
document.cookie = 'age=22; max-age=60; path=/'
```

### Read a Cookie

> `document.cookie` 用來讀取 cookie，但讀取出來是一個很長的字串，字串裡面是所有曾經儲存的 cookie，格式是 key=value，用分號 ; 分隔不同的 cookie。來自 [JavaScript Cookie](https://www.fooish.com/javascript/cookie.html)

### Change a Cookie

直接建立新的同名 cookie 覆蓋掉即可。

### Delete a Cookie

設定一個過期的時間即可。

---

## localStorage

### 介紹

1. LocalStorage 是 HTML5 提供給網頁的儲存庫，一樣只能在同個網站 (domain) 上使用，但是他不會跟 Cookie 一樣從 sever 端提取資料，資料只會存在客戶的 local 端，即使把瀏覽器關閉資料還是會存在除非使用了清除的 API，不然資料是不會消失的。

   > 舉個例子 : 我們在逛博客來書店的時候，只要點擊某本書，最下面有個最近瀏覽紀錄就會顯是我剛才選的書籍資訊，即使關掉網頁，剛才所點選的書籍資料也還是會存在。

2. 那 localStorage 要注意的地方是他只接受字串 (string) 型別，所以在寫入的時候 key 跟 value 要記得轉換!!

### 特點

1. 大小 5Mb 左右
2. 沒有過期時間，除非手動刪除，就算刷新頁面資料還是在
3. Storage 只會存在客戶端的瀏覽器上
4. 使用 key、value 的方式給值或取值

### 搭配使用的 API

```javascript
JSON.parse()
JSON.string()

setItem(key, value)
getItem(key)

removeItem(key)
clear()
```

### setItem、getItem、clear API 的應用

當我們要資料存到 localStorage 裡面就要用` setItem` 設定 `key` 跟 `value` 值，設定好後就可以用 `getItem` 去抓。

```javascript
// 型別是字串
let str = 'ken'
// localStorage.setItem('key', value)
// 設定 setItem
localStorage.setItem('userName', str)

// 取值 getItem
localStorage.getItem(str)

console.log(localStorage.getItem('userName'))
```

![](https://i.imgur.com/vDh5rtD.png)

如過查看發現 localStorage 有其他資訊請先打開 clear() 清掉，再執行一次。(要記得關掉 clear

[DEMO](https://codepen.io/gleofgja/pen/dypaWYm?editors=1011)

接下來加入輸入框，在點擊 `button` 按鈕的時候會跳出輸入框裡面的值，在把值輸入到 localStorage 裡面。

```html
<form>
  <label for="name">Name:</label>
  <input type="text" class="name" />
  <input type="button" value="點擊" class="btn" />
</form>
```

```javascript
let btn = document.querySelector('.btn')

function saveName() {
  let str = document.querySelector('.name').value
  localStorage.setItem('userName', str)
}

btn.addEventListener('click', saveName)
```

到目前為止我還沒輸入任何東西，如下圖
![](https://i.imgur.com/A1TQ70E.png)

但是當我在輸入框輸入 `ken` ，輸入框的資料就會進入到 localStorage，如下圖
![](https://i.imgur.com/45Pn0vT.png)

目前只是將資料<font color=#FF0000>輸入</font>，現在要將資料<font color=#FF0000>取出</font>，那要取出就要用 `getItem()` 的 API 。

在 html 多加一行

```html
<input type="button" value="取出" class="btnCall" />
```

在 JS 加入 `getItem function` (第 11 行)

```javascript
// localStorage.clear()
let btn = document.querySelector('.btn')
let call = document.querySelector('.btnCall')

//setItem
function saveName() {
  let str = document.querySelector('.name').value
  localStorage.setItem('userName', str)
}

//getItem
function callName() {
  let getStr = localStorage.getItem('userName')
  alert(getStr)
}

btn.addEventListener('click', saveName) //setItem
call.addEventListener('click', callName) //getItem
```

輸入，尚未點擊
![](https://i.imgur.com/QzZlk4G.png)

點擊後
![](https://i.imgur.com/e8OBtqs.png)

點取出，跳出 `alert` 視窗
![](https://i.imgur.com/DG4bIDy.png)

<font color=#FF0000>注意!!</font> 目前都是<font color=#FF0000>字串型別</font>。
分別在 `saveName`、`callName` 裡面加入 `console.log` 查看，如下圖
![](https://i.imgur.com/OEqCbVy.png)

[DEMO](https://codepen.io/gleofgja/pen/wvzNdrv?editors=1111)

### JSON.parse、JSON.string API 的應用

`JSON.parse()` 的做用是將 localStorage 的 `key` 跟 `value` 值轉成物件型別，轉換型別後會變成物件或是陣列，這樣在抓取資料的時候就會比較方便，以下來示範為麼要使用 `JSON.parse()`

1. 我先給一個陣列
2. 在用 `setItem` 設定 `key` & `value` 值
3. 用 `getItem` 抓取設定好的 `key` 值
4. 用 `console.log` 查看

```javascript
// 給個陣列
let arrCount = [{ userName: 'ken' }, { age: '22' }, { gender: 'male' }]

// 用 setItem 的把 key 、 value 值設定好
localStorage.setItem('arrCountItem', arrCount)

// 把設定好的值用 getItem 抓取，在賦直到 getArrCount 變數裡面
let getArrCount = localStorage.getItem('arrCountItem')

console.log(getArrCount)

console.log(getArrCount[0].userName)
```

顯示的結果如下圖
![](https://i.imgur.com/YMIF3Eh.png)

![](https://i.imgur.com/a7QAo5o.png)

可以看到用 `setItem()` 設定的 `value` 值 localStorage 完全看不懂 ，要讓 localStorage 看得懂 `value` 值就必須是<font color=#FF0000>字串型別</font>!!!

用 `console.log` 看，也確定有抓到但卻顯示未定義，用 `typeof` 看一下型別，如下圖
![](https://i.imgur.com/NjVZfgH.png)

透過上面這張圖就可以知道用 `getItem()` 抓到的是字串 (string) 型別並非是陣列，因為不管是陣列還是物件只要經過 localStorage 取出來的值都會變成字串 (string) 型別。然後第 16 行又用陣列的方式取值，所以會顯示 undefine 是正常的。

- <font color=#FF0000>懶人包 :
  進入 localStorage 之前必須要轉成字串型別 (JSON.string)，
  取值的時候要轉成物件型別 (JSON.parse)</font>。

以下示範正確方法:

1. 將陣列轉成字串型別
2. 確認抓到的是字串不是物件型別
3. 用 `setItem` 把 `key` & `value` 值設定到 localStorage 裡面
4. 再用 `getItem` 把 `key` 轉成物件並賦值到 getArrCount 變數裡面
5. 再將 getArrCount 轉成物件型別

```javascript
let arrCount = [{ userName: 'ken' }, { age: '22' }, { gender: 'male' }]

// 將陣列轉成字串型別
let arrCountString = JSON.stringify(arrCount)
// 確認抓到的是字串不是物件型別
console.log(arrCountString)

// 用 setItem 把 key & value 值設定到 localStorage 裡面
localStorage.setItem('arrCountItem', arrCountString)

// 抓取 localStorage 的值，再用 getItem 把 key 轉成物件並賦值到 getArrCount 變數裡面
let getArrCount = localStorage.getItem('arrCountItem')

// 再將 getArrCount 轉成物件型別
let arrCountArry = JSON.parse(getArrCount)

console.log(arrCountArry)
console.log(arrCountArry[0].userName)
console.log(typeof arrCountArry)
```

這樣 localStorage 就可以正常<font color=#FF0000>賦值</font>，而我們也可以從 localStorage <font color=#FF0000>取值</font>，顯示如下圖

![](https://i.imgur.com/2MxjQrg.png)

![](https://i.imgur.com/6CF4aju.png)

[DEMO](https://codepen.io/gleofgja/pen/LYRqyaX?editors=1011)

## SessionStorage

### 介紹

跟 localStorage 一樣，差別在於只要將瀏覽器關掉資料就會被清除，也不會跟 sever 拿資料，資料是存在客戶本地端。

### 特點

1. 資料只會存在目前單一分頁裡，開新的分頁後資料是不會傳到另一個分頁裡的
2. 當瀏覽器關掉後，資料就會被清除

---

## Cookie、LocalStorage、SessionStorage 縮圖:

![](https://i.imgur.com/W1wxk7Y.png)

[圖片來源: [JavaScript] Cookie、LocalStorage、SessionStorage 差異](https://medium.com/@bebebobohaha/cookie-localstorage-sessionstorage-%E5%B7%AE%E7%95%B0-9e1d5df3dd7f)

---

## 參考資料

[JavaScript Cookie](https://www.fooish.com/javascript/cookie.html)
[Day20 localStorage、sessionStorage](https://ithelp.ithome.com.tw/articles/10203525)
[Day19 要來塊餅乾嗎? Cookie & Session](https://ithelp.ithome.com.tw/articles/10203123)
[[JavaScript] Cookie、LocalStorage、SessionStorage 差異](https://medium.com/@bebebobohaha/cookie-localstorage-sessionstorage-%E5%B7%AE%E7%95%B0-9e1d5df3dd7f)
[Day20-網頁儲存！Web storage](https://ithelp.ithome.com.tw/articles/10207933)
[[第七週] 瀏覽器資料儲存 - Cookie、LocalStorage、SessionStorage](https://yakimhsu.com/project/project_w7_storage.html)
[27. [WEB] Cookie & Session 是什麼？](https://ithelp.ithome.com.tw/articles/10227602)
[[教學] 什麼是 Cookie？如何用 JS 讀取/修改 document.cookie?](https://shubo.io/cookies/)
[[JavaScript] Cookie、LocalStorage、SessionStorage 三種差異](https://medium.com/@jscinin/javascript-cookie-localstorage-sessionstorage-%E4%B8%89%E7%A8%AE%E5%B7%AE%E7%95%B0-fe7f38260439)
[JavaScript 入門篇 - 學徒的試煉](https://courses.hexschool.com/courses/670042/lectures/11952493)
