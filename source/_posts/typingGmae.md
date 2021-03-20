---
title: JavaScript 實作 - 打字遊戲
date: 2021/01/29
tags:
  - JavaScript
  - 作品集
categories:
  - JavaScript
  - 作品集
---

## 功能敘述：

1. 在時間內輸入顯示的單字可以得分。
2. 依照難度調整獎勵時間。
3. 時間內未輸入完成會顯示新訊息。

![](https://i.imgur.com/uVuOz1v.png)

[Github](https://github.com/PKTseng/Web-Side-Project/tree/gh-pages/mission27)
[Demo](https://pktseng.github.io/Web-Side-Project/mission27/index.html)

<!--more-->

## 功能需求

1. 進入頁面後隨機產生文字。
2. 可以直接在輸入框輸入單字(不需要滑鼠點擊輸入框)，輸入正確得一分。
3. 進入頁面後時間開始倒數，若輸入正確倒數時間會增加。
4. 時間內沒寫完會顯示時間到的訊息。
5. 增加的時間可以依照難度調整獎勵時間。
6. 難度選單可以選擇隱藏或是顯示。
7. 刷新頁面後難度不會被回復預設值。

## 模板架構

1. button 顯是隱藏難度。
2. 難度選單。
3. 顯示隨機產生的文字。
4. 輸入框。
5. 顯示時間跟分數。

#### 1. 顯示隱藏難度

```html
<button id="settings-btn" class="settings-btn">
  <i class="fas fa-cog"></i>
</button>
```

#### 2. 難度選單

```html
<div id="settings" class="settings">
  <form id="settings-form">
    <div>
      <label for="difficulty">Difficulty</label>
      <select id="difficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  </form>
</div>
```

#### 3. 顯示隨機產生的文字、輸入框、顯示時間跟分數

```html
<div class="container">
  <h2>👩‍💻 Speed Typer 👨‍💻</h2>
  <small>Type the following:</small>

  <h1 id="word"></h1>

  <input
    type="text"
    id="text"
    autocomplete="off"
    placeholder="Type the word here..."
  />

  <p class="time-container">Time left: <span id="time">10s</span></p>

  <p class="score-container">Score: <span id="score">0</span></p>

  <div id="end-game-container" class="end-game-container"></div>
</div>
```

架構完成圖
![](https://i.imgur.com/hkQyRRM.png)

CSS 樣式可以依照個人喜好來設定。

## 功能撰寫 ( JavaScript )

### 1. 將 DOM 跟元素做綁定

```javascript
const word = document.getElementById('word')
const text = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const endgameEl = document.getElementById('end-game-container')
const settingsBtn = document.getElementById('settings-btn')
const settings = document.getElementById('settings')
const settingsForm = document.getElementById('settings-form')
const difficultySelect = document.getElementById('difficulty')
```

### 2. 進入頁面後隨機產生文字。

文字資料可以透過 API 獲取。
或是像作者直接給陣列值再用 `Math.random`、`Math.floor`、`words.length`的方式隨機抓取一個值。

打 API 要資料的方法有三種 Ajax、axios、fetch，以下用 axios 示範，選用 axios 是因為比較簡單，直接給 API [url](https://random-word-api.herokuapp.com/home) ，再用 `then` 抓取回傳的資料就可以了，如果資料回傳錯誤就會走 `catch` 。
用 `console` 查看 `response` 的資料如下圖
![](https://i.imgur.com/4paTkbD.png)

有了這值後再把值賦予到 `randomWord` 變數上，讓其他函示可以取用。

```javascript
// 用 Axios 打 API 抓取 response 的值
function getRandomWord() {
  axios
    .get('https://random-word-api.herokuapp.com/word?number=1')
    .then((res) => {
      // console.log(res);
      randomWord = res.data[0]
      // console.log(randomWord);
      word.innerHTML = randomWord
    })
    .catch((error) => {
      console.log('沒抓到單字資料')
    })
}
getRandomWord()
```

### 3. 比對輸入的值是否吻合再給予獎勵

`focus()` : 打開視窗就可以直接輸入單字了。

把 `e.target.value` 抓到的值賦予到 `inputText` 變數上，方便跟上面拆分的 `randomWord` 做比對，要注意 `randomWord` 不能用 `cosnt` 、`let`、`var` 宣告，不然會抓不到，比對成功後，分數會加 1，同時給予獎勵增長時間 5 秒。

```javascript
text.focus()

// 答對加分，同時把分數綁到 DOM 上
function updateScore() {
  score++
  scoreEl.innerHTML = score
}

// 在輸入框輸入文字同時跟顯示的文字做對比
text.addEventListener('input', (e) => {
  let inputText = e.target.value
  if (inputText === randomWord) {
    getRandomWord()
    updateScore()
    e.target.value = '' //只能用 e.target.value 來清空值

    time += 5

    updateTime()
  }
})
```

### 4. 時間內沒寫完會顯示時間到的訊息。

輸入文字的同時時間也會開始倒數，倒數的數字要設置停損點 ( clearInterval )，不然會數到負的。

- `setInterval` : 是設定固定時間重複循環的語法。

```javascript
const initTime = setInterval(updateTime, 1000)

function updateTime() {
  // 時間開始倒扣
  time--
  // 倒扣的時間顯示在 DOM 上
  timeEl.innerHTML = time + ' s '
  if (time === 0) {
    clearInterval(initTime) //少了這個停損點倒數的數字會變成負的

    // 時間到的訊息用字串模板的方式載入
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `
    endgameEl.style.display = 'flex'
  }
}
```

### 5. 難度選單可以選擇隱藏或是顯示。

用 `toggle` 搭配 css style 就可以了。

```javascript
settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide')
})
```

### 6. 刷新頁面後難度不會被回復預設值。

要刷新頁面選單的值不會恢復成預設值就會使用到 `localStorage` ，把選擇的難度寫入到瀏覽器裡面。

1. 選擇難度是一個`event`，把選到的難度用 `setItem` 寫到瀏覽器記憶體 `localStorage` 裡面
2. 再用 `difficulty` 抓取選到的難度同時判斷輸入單字的時間要多還是要少
3. 到目前為止頁面刷新後難度還是會恢復成預設值，所以要把選單的值寫到 value 裡面

```javascript
// 1. 選擇難度，把資料寫進瀏覽器記憶體裡面
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value
  localStorage.setItem('difficulty', difficulty)
})

// 2. 把選到的值賦予到 difficulty 變數裡面，用來判斷難增加的時間
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium'

// 3. 這是選完後抓取選單的值，確保頁面刷新後不會恢復成預設值
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium'
```

### 7. 增加的時間可以依照難度調整獎勵時間。

如果難度越高，獎勵時間就越少，反之同理。

```javascript
// 依照難度調整增加輸入時間
if (difficulty === 'hard') {
  time += 2
} else if (difficulty === 'medium') {
  time += 3
} else {
  time += 5
}
```

## 功能撰寫 ( jQuery )

### 1. 進入頁面後隨機產生文字。

上面 JS 是用 Axios 打 API 獲取資料，jQuery 只能用 AJAX 打 API
本來是打 [RANDOM USER GENERATOR](https://randomuser.me/) 的 API，但發現 username 會有其他國家非英文的名字，所以改成打 [Word](https://random-word-api.herokuapp.com/home) 的 API 獲取單字資料。

- AJAX 起手式 :
  `url` : 打 API 的網址。
  `method` : 拿資料的方法。
  `dataType` : 資料的格式。
  `success` : 拿到資料後會打要做什麼事。

```javascript
function randomUser() {
  $.ajax({
    url: 'https://random-word-api.herokuapp.com/word?number=1',
    method: 'get',
    dataType: 'json',
    success: function (res) {
      // console.log(res);
      data = res[0]
      // console.log(data);
      $('#word').text(data)
    },
  })
  time--
  $('#time').val(time)
}
```

### 2. 比對輸入的值是否吻合再給予獎勵

給個分數的初始值，把值設定成 number 型式，判斷書入的值跟單字一樣後會重打一次 API 同時刷新時間，輸入正確後會給獎勵分數。

```javascript
let score = 0
$('#text').on('input', function (e) {
  const textInput = $(this).val()
  // console.log(textInput);
  if (textInput === data) {
    randomUser()
    updateTime()
    $('#text').val('')
    score++
    $('#score').text(score)
  }
})
```

### 3. 時間內沒寫完會顯示時間到的訊息。

設定時間初始值順便把型別轉成 number。
把時間寫入 DOM 元素裡面，當時間到未輸入完單字就會顯示新訊息。

```javascript
let time = 20
const initTime = setInterval(updateTime, 1000)

function updateTime() {
  time--
  $('#time').text(time + ' s ')
  if (time === 0) {
    clearInterval(initTime)
    $('#end-game-container').html(`
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
    `)
    $('#end-game-container').css('display', 'flex')
  }
}
```

### 4. 難度選單可以選擇隱藏或是顯示。

用 `toggleClass` 可以顯示或是隱藏某個元素。

```javascript
$('#settings-btn').on('click', () => {
  $('#settings').toggleClass('hide')
})
```

### 5. 刷新頁面後難度不會被回復預設值。

難度選完後不要恢復成預設值的方法就是把資料寫進瀏覽器記憶體裡面，寫入後每次更換難度都會刷新一次頁面。

```javascript
$('#difficulty').change(function () {
  difficulty = $('#difficulty').val()
  console.log(difficulty)
  localStorage.setItem('difficulty', difficulty)
  location.reload()
})

$('#difficulty').val(
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium'
)
```

## 參考資料

[Axios](https://github.com/axios/axios)
[20 Web Projects With Vanilla JavaScript](https://www.udemy.com/course/web-projects-with-vanilla-javascript/learn/lecture/17842354#overview)
[談談 JavaScript 的 setTimeout 與 setInterval](https://kuro.tw/posts/2019/02/23/%E8%AB%87%E8%AB%87-JavaScript-%E7%9A%84-setTimeout-%E8%88%87-setInterval/)
[RANDOM USER GENERATOR](https://randomuser.me/)
