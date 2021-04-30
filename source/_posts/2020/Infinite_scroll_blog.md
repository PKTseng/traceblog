---
title: JavaScript 實作 - 滾動顯示文章
date: 2021/01/26
tags:
  - JavaScript
  - 作品集
categories:
  - JavaScript
  - 作品集
---

功能敘述：
當捲動到頁尾時，會自動讀取更多的文章。

![](https://i.imgur.com/ufC6HbH.png)

[Github](https://github.com/PKTseng/Web-Side-Project/tree/gh-pages/mission26)
[DEMO](https://pktseng.github.io/Web-Side-Project/mission26/index.html)

<!-- more -->

## 模板

主要有兩個: filter bar 跟渲染資料。

```html
<!-- search bar -->
<div class="filterContainer">
  <input type="text" id="filter" class="filter" placeholder="Filter posts" />
</div>

<!-- 渲染內容 -->
<div id="postsContainer">
  <!-- 渲染資料的內容使用 JavaScript 寫出來 -->
</div>

<!-- 小點 -->
<div class="loader" id="loader">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>
```

架構完成圖
![](https://i.imgur.com/6pZd8BM.png)

CSS 樣式可依照個人喜好來設定。

## JaScript

三大重點:

1. 打 API，拿資料。
2. 滾輪往下滑載入資料。
3. 輸入關鍵字找到文章。

### 1. 將 DOM 跟 HTML 綁在一起

1. 輸入文字會需要 filter bar
2. 在網頁內顯示資料內容
3. 往下滑時會出現 loading 動畫

```javascript
const filter = document.querySelector('#filter')
const postContainer = document.querySelector('#postsContainer')
const loading = document.querySelector('#loader')
```

### 2. 打 API 獲取資料

API [URL](https://jsonplaceholder.typicode.com/posts?)
在網址後面加入 `limit` & `page`，可以指定一個頁面下可以顯示多少內容，例如
`limit = 4` : 顯示 4 個內容
`page = 1` : 頁數

打 API 方法有三種: AJAX、Axios、Fetch。
原作使用 `fetch` 是現在比較新穎的技術但還是要注意瀏覽器有沒有支援到。
使用 `fetch` 打 API ，response 回來的資料要轉 `json` 格式才可以使用。
轉完後再把資料 `return` 出來給其他函式使用。

```javascript
let limit = 4 // 限制一頁顯示多少個
let page = 1

async function getPost() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  )
  const data = await res.json()
  return data
}
```

### 3. 拿到資料後，將資料渲染出來

上面模板 `postsContainer` 內的資料有提到要用 javascript 呈現，現在要將拿到的資料利用 ES6 字串模板的方式呈現出來。

先將拿到的資料賦予到 `posts` 變數裡面，再將這些資料用 `forEach()` 的方式放到字串模板裡面，到這資料還不會呈現出來，必須再把這些資料放到 `postContainer` 大 "容器" 裡面，這樣資料就會依照模板的架構跟樣式來呈現。

```javascript
async function showPost() {
  const posts = await getPost()
  // console.log(posts);
  posts.forEach((post) => {
    const postEl = document.createElement('div') //新增 div 標籤
    postEl.classList.add('post') // div 標籤名為 post
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="postInfo">
        <h2 class="postTitle">${post.title}</h2>
        <p class="postBody">${post.body}</p>
      </div>
    `

    // 將這些 div 輸入到 postContainer 裡面
    postContainer.appendChild(postEl)
  })
}

showPost() // 執行
```

### 4. 讓條件觸發，渲染出更多資料

到目前為止資料只會呈現 "一筆" 而已，即使滾輪往下拉資料還是不會出現，這也不是我們要的功能，必須在滾輪往下拉的同時在網頁最底部會顯示小點點的動畫跟載入 "下一筆" 資料。

> 一筆資料有 4 個內容，就是上面設定的 `let limit = 4`

滾輪滾動是觸發的條件，所以要用監聽 ( `addEventListener` )，視窗到最底部時，會顯示 `loading` 效果，要判斷怎樣算是最底部就用 `scrollTop`、`scrollHeight`、`clientHeight`

以下參考自 MDN

1. scrollTop : 目前是瀏覽器視窗距離元素最頂端的距離。
   ![](https://i.imgur.com/bNGxeml.png)

2. scrollHeight : 整個元素的總高度。
   ![](https://i.imgur.com/tDYgWSp.png)

3. clientHeight : 元素內部包含 padding 的高度。
   ![](https://i.imgur.com/SNz8f01.png)

利用解構的方式抓取三個值，再用這三個值用來判斷是否該載入資料。

```javascript
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading()
  }
})
```

觸發後顯示 loading 效果，效果 1 秒後結束，並在 0.3 秒內載入資料。

```javascript
function showLoading() {
  loading.classList.add('show') // 顯示小點CSS

  // 移除小點時機
  setTimeout(() => {
    loading.classList.remove('show') // 1秒後，移除小點CSS

    // 增加頁面同時，0.3秒內打 API 抓新資料
    setTimeout(() => {
      page++
      showPost()
    }, 300)
  }, 1000)
}
```

### 5. 輸入關鍵字顯示相關文章

輸入關鍵字是觸發條件，一樣用監聽 ( `addEventListener` )，不過函式實在太大了，可以善用 `callback function`。

將 `post` `div` 裡所有的內容賦予到 `posts` 變數上，再用 `forEach` 讀取裡面的每一筆資料，再用 `indexOf` 判斷式，判斷輸入的值有沒有跟 posts 變數上的相符並依照書入的值顯示相關文字的文章。

```javascript
filter.addEventListener('input', filterPost)

function filterPost(e) {
  // console.log(e.target.value);
  const term = e.target.value.toUpperCase()
  const posts = document.querySelectorAll('.post')

  posts.forEach((post) => {
    const title = post.querySelector('.postTitle').innerText.toUpperCase()
    const body = post.querySelector('.postBody').innerText.toUpperCase()

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex'
    } else {
      post.style.display = 'none'
    }
  })
}
```

## 參考資料

[Element.clientHeight](https://developer.mozilla.org/zh-TW/docs/Web/API/Element/clientHeight)
[Element.scrollHeight](https://developer.mozilla.org/zh-TW/docs/Web/API/Element/scrollHeight)
[Element.scrollTop](https://developer.mozilla.org/zh-TW/docs/Web/API/Element/scrollTop)
[String.prototype.toUpperCase()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)
[20 Web Projects With Vanilla JavaScript](https://www.udemy.com/course/web-projects-with-vanilla-javascript/learn/lecture/17842308#overview)
