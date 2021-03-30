---
title: JavaScript 實作 - 音樂播放器
date: 2021/01/22
tags:
  - JavaScript
  - 作品集
categories:
  - JavaScript
  - 作品集
---

功能描述:

1. 點擊進度條可以選擇播放時段
2. 撥放完後自動撥放下一曲
3. 可選擇上一曲或下一曲

![](https://i.imgur.com/pfv9RIb.png)

[Github](https://github.com/PKTseng/Web-Side-Project/tree/gh-pages/mission25)
[DEMO](https://pktseng.github.io/Web-Side-Project/mission25/index.html)

<!-- more -->

## 模板

給個容器，將內容包在裡面，方便控制容器內的通用樣式跟監聽

```html
<div class="music-container" id="music-container"></div>
```

撥放音樂的時候顯示音樂名稱跟進度條

```html
<div class="music-info">
  <h4 id="title"></h4>
  <div class="progress-container" id="progress-container">
    <div class="progress" id="progress"></div>
  </div>
</div>
```

撥放歌曲

```html
<audio src="music/ukulele.mp3" id="audio"></audio>
```

音樂圖片

```html
<div class="img-container">
  <img src="images/ukulele.jpg" alt="music-cover" id="cover" />
</div>
```

音樂撥放按鈕，按鈕使用是 [Font Awesome](https://fontawesome.com/) 顯示

```html
<div class="navigation">
  <button id="prev" class="action-btn">
    //上一首
    <i class="fas fa-backward"></i>
  </button>
  <button id="play" class="action-btn action-btn-big">
    //暫停或是撥放
    <i class="fas fa-play"></i>
  </button>
  <button id="next" class="action-btn">
    //下一首
    <i class="fas fa-forward"></i>
  </button>
</div>
```

完成圖
![](https://i.imgur.com/LxSk2FZ.png)

## 樣式

樣式可以依照個人喜好來設定。
因為案例中在撥放音樂的時候，音樂圖片會像 CD 被讀取一樣一直旋轉，所以這裡介紹一下 CSS 的動畫效果 ( animation )。

`@keyframes` : 動畫影格，控制 CSS 從哪移動到哪的概念。

在這案例中撥放音樂的時候會圖片會旋轉，旋轉就會用 rotate 來控制旋轉角度，再用 deg 為單位。

```css
@keyframes rotate {
  from {
    transform: rotate(0deg); //從甚麼角度開始
  }

  to {
    transform: rotate(360deg); //到什麼角度
  }
}
```

CSS 動畫還有其他屬性可以使用。
以下圖片來自 : [完整解析 CSS 動畫 ( CSS Animation )](https://www.oxxostudio.tw/articles/201803/css-animation.html)
![](https://i.imgur.com/eiIhcRF.png)

## JavaScript

### 1. 抓取 DOM 元素

```javascript
const musicContainer = document.querySelector('#music-container')
const progressContainer = document.querySelector('#progress-container')
const progress = document.querySelector('#progress')
const audio = document.querySelector('#audio')
const cover = document.querySelector('#cover')
const PrevBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')
const title = document.querySelector('#title')
```

### 2. 撥放音樂的時候要顯示的歌曲名稱跟圖片

```javascript
const songs = ['hey', 'summer', 'ukulele']

let songsIndex = 2

loadSong(songs[songsIndex])

function loadSong(song) {
  title.innerText = song
  audio.src = `music/${song}.mp3`
  cover.src = `images/${song}.jpg`
}
```

### 3. 撥放跟暫停

監聽撥放跟暫停按鈕，再把這動作寫成 `callback function`。
在撥放音樂的時候要在 `musicContainer` DOM 上面加上 `classList play` ，才會產生動畫效果同時 `icon` 也會變更，撥放時是暫停的 `icon` ，暫停時是撥放的 `icon` 。

```javascript
function playSong() {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play')
  playBtn.querySelector('i.fas').classList.add('fa-pause')

  audio.play()
}

function pauseSong() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.add('fa-play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause')

  audio.pause()
}

playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')
  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})
```

### 4. 切換歌曲

利用陣列的數量跟索引值決定下一首，但陣列中的索引值最小是 0，如果一直按上一首歌曲，到索引值 0 的時候就會卡住了，不會從最後面的歌曲開始往回推，所以要用函式判斷，當小於歌曲陣列的索引值時，要從陣列的最後一個索引開始往回推。

#### 上一首

判斷式中 `songs.length - 1` 是因為陣列內長度是 3 ，但索引值是 2 ，所以
`3 - 1` 會回到歌曲索引值的 2 也就是最後一首，這樣一直按上一首的話就可以變成無窮迴圈了

#### 下一首

同理，如果點擊的數字大於陣列中的索引值 ( 最後一首歌 )，那就讓陣列回索引值為 0 的第一首歌曲開始。

```javascript
function preSong() {
  songsIndex--

  if (songsIndex < 0) {
    songsIndex = songs.length - 1
  }

  loadSong(songs[songsIndex])

  playSong()
}

function nextSong() {
  songsIndex++

  if (songsIndex > songs.length - 1) {
    songsIndex = 0
  }

  loadSong(songs[songsIndex])

  playSong()
}

PrevBtn.addEventListener('click', preSong)
nextBtn.addEventListener('click', nextSong)
```

### 5. 顯示進度讀取條

撥放音樂的時候時間軸會更新同時觸發 `updateProgress` function ，function 會帶出 progress bar 讀取進度。

- `timeupdate` : 在更新時間的時候會觸發
- `e.srcElement` 是目前事件觸發的來源，用 `console.log` 查看，顯示下圖
  ![](https://i.imgur.com/u1ixS8l.png)
- `duration` : 時間的總長度
- `currentTime` : 當下讀取的時間軸
  ![](https://i.imgur.com/ulsD1u7.png)

`progress` 會隨著音樂時間的長度顯示 bar 條。

```javascript
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}

audio.addEventListener('timeupdate', updateProgress)
```

### 6. 指定音樂撥放的時間軸

有了 progress bar 就可以利用 bar 條指定時間軸。
`clientWidth` : 是這個元素下的總寬度。
而這裡的 `clientWidth` 是指向 ，`progress` 的總寬度，如下圖![](https://i.imgur.com/W6jadN3.png)

有了總寬度還需要音樂時間軸的寬度
用 `console.log` 看 `clientWidth`、`clickX`，如下圖
![](https://i.imgur.com/jL6oaR9.png)

當我點擊時間軸後，會跳出總長度跟該元素的長度，將這兩個元素相除的結果等於當下元素的長度，在乘上時間軸就可以把點擊當下 bar 條跟音樂時間軸同時綁定，這樣點擊時間軸會跳到該時段 bar 條也會同時顯示長度。

下圖比較能理解 `offset` 跟 `clint` 語法:
![](https://i.imgur.com/WFOOzc5.png)
[上圖來源](https://www.pianshen.com/images/124/09a28ef42af91b0b7d5fff6c74bd3a0c.png)

```javascript
function setProgress(e) {
  const width = this.clientWidth
  const clickX = e.offsetX
  const duration = audio.duration

  audio.currentTime = (clickX / width) * duration
}

progressContainer.addEventListener('click', setProgress)
```

---

## 參考資料

[CSS 動畫](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_Animations/Using_CSS_animations)
[完整解析 CSS 動畫 ( CSS Animation )](https://www.oxxostudio.tw/articles/201803/css-animation.html)
[Animate.css](https://animate.style/)
[HTMLMediaElement：timeupdate](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLMediaElement/timeupdate_event)
[20 Web Projects With Vanilla JavaScript](https://www.udemy.com/course/web-projects-with-vanilla-javascript/learn/lecture/17842308#overview)
