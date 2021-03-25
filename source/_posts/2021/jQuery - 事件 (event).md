---
title: jQuery - 基本使用
date: 2021/01/13
tags:
  - eventListener
  - callback function
  - event
  - onSubmit
categories: JavaScript
description: 了解 eventListener 與 callback function
---

## 事件

**分以下四種事件:**

1. 單擊 (click)
2. 雙擊 (dblclick)
3. 滑鼠移入 (mouseenter)
4. 滑鼠移出 (mouseleave)
<!--more-->

### 1. 單擊 (click) & 雙擊 (dblclick)

為了方便區分，將 `id` 設定成 `click` & `dbiclick`。

接下來就是 jquery 三步驟:

1. 選擇要改變的元素 `id`
2. 更改的樣式 `.css('color', 'red')`
3. 動作: 單擊 or 雙擊

```html
<h1 id="click">click</h1>
<h1 id="dblclick">dbiclick</h1>
```

```javascript
$('#click').click(function () {
  $(this).css('color', 'red')
})

$('#dblclick').dblclick(function () {
  $(this).css('color', 'blue')
})
```

原圖:
![](https://i.imgur.com/CYKyNfz.png)

當我單擊的時候會顯示下圖:
![](https://i.imgur.com/pALzfBQ.png)

雙擊如下圖:
![](https://i.imgur.com/o4MRJ2x.png)

[DEMO](https://codepen.io/gleofgja/pen/MWjzpPb?editors=1011)

如何知道 API 可以參考 [W3Schools](https://www.w3schools.com/jquery/jquery_events.asp)

### 2. 滑鼠事件，移入(mouseenter)與移出(mouseout)

給兩個方塊測試，當滑鼠移入或移出方塊的時候就會顯示移入或移出的 log。

其中 mouseenter 事件跟 hover 一樣，在移入時都會有相同動作。

```html
<div id="red"></div>
<div id="blue"></div>
```

```css=
#red{
  width: 100px;
  height: 100px;
  background: red;
}

#blue{
  width: 100px;
  height: 100px;
  background: blue;
}
```

```javascript
$('#red').mouseenter(function () {
  console.log('滑鼠移入紅色')
})

$('#blue').mouseleave(function () {
  console.log('滑鼠移出藍色')
})
```

當滑鼠移入的時候
![](https://i.imgur.com/d5BLbbQ.png)

當滑鼠移出的時候
![](https://i.imgur.com/oiRfeKq.png)

[DEMO](https://codepen.io/gleofgja/pen/QWKJvdd?editors=0011)

### 3.

---

[W3Schools](https://www.w3schools.com/jquery/jquery_events.asp)
