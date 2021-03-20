---
title:  jQuery - 介紹
date: 2021/01/14
tags:  jQuery

--- 
## 三大重點
- 選擇器 (selector)
- 事件觸發 (event)
- 事件處發的回調函數
<!--more-->
**撰寫步驟如下:**
1. 選擇: 顯示、隱藏元素
2. 事件: 改變樣式
3. 動作: DOM 操作

## 選擇器 (Selector)
### id 選擇器
利用按下 `button` 按鈕改變字體顏色

以下示範:
首先給個 `id` 元素跟 `button`
```html
<div id="color">color</div>
<button id='changeColor'>Button</button>
```
再來是執行步驟:
1. 選擇要改變的元素 `#color`
2. 改變顏色 `css('color', 'red')`
3. 在 click 動作下執行

```javascript
$('#changeColor').click(function(){
  $('#color').css('color', 'red')
})

```
[DEMO](https://codepen.io/gleofgja/pen/LYRXxMx?editors=1011)

### class 選擇器
來看一下跟 `id` 選擇器有什麼差別

給同個 `id` & `className` 再用 `console.log` 查看
```html
<div id="dog" class="dog">dog 1</div>
<div id="dog" class="dog">dog 2</div>
```

先示範選擇器抓 `id` 的效果
然後在 `console.log` 下 `$('#dog').text()`，顯示如下
![](https://i.imgur.com/HjZsX8q.png)
只會抓到第一個 `id` 的 `dog` 而已

再試試選擇器抓 `className` 的話呢?
輸入 `$('.dog').text()` ，顯示如下紅框處
![](https://i.imgur.com/FdkEjg8.png)

綠色是選擇器的差別上面是 `id` ，下面是 `className`
可以看如果用 `className` 選擇器的話兩個都會顯示

[DEMO](https://codepen.io/gleofgja/pen/LYRXWPy?editors=1011)

### 元素選擇器
觀念跟 `class` 很像，可以同時更改多個元素內容或樣式，但會有點風險，因為同個檔案裡面或有多個相同元素

給三個 `p` 元素跟一個 `button` ，透過按下 `button` 可以更改元素內的內容，以下示範
```html
<p>p1</p>
<p>p2</p>
<p>p3</p>

<button id="changeWord">change-Word</button>
```

jQuery 步驟:
1. 選擇要改變的元素 `p`
2. 改變的樣式 `.text('changeWord')`
3. 按下 `button` 的動作

```javascript
$('#changeWord').click(function(){
  $('p').text('changeWord')
})

```

[DEMO](https://codepen.io/gleofgja/pen/GRjwWNX?editors=1011)

---
## 總結 `id` 、 `className` & 元素的差別:
- id: 若有很多相同 id ，<font color=#FF0000>只會選取第一個</font>
- className: 會同時選取<font color=#FF0000>所有</font>相同的 className
- 元素: 會同時選取<font color=#FF0000>所有</font>相同的元素

會用到 `className` 的原因是為了方便選更改多個樣式，可以用在相同的商品列表上，但如果選擇 `id` 的話就只會更改單一樣式而且是第一個，之後相同 `id` 的不會更改到

---
## 參考資料:
[jQuery 幼幼班](https://codeshiba.teachable.com/courses/1255270/lectures/29521035)