---
title:  jQuery - 選擇器的進階 Traversal 
date: 2021/01/15
tags:  jQuery
--- 
## 1. 選擇器的進階 Traversal(遍歷) 鄰居、爸爸與小孩
遍歷示意圖:
![](https://i.imgur.com/t0TNBN2.png)
Traversal 這觀念就是透過 API 操作相鄰隔壁的元素，以下示範
<!-- more -->
```html
<ul id="ul-1">
  <li>ul-1</li>
  <li>ul-1</li>
  <li>ul-1</li>
</ul>

<ul id="ul-2">
  <li>ul-2</li>
  <li>ul-2</li>
  <li>ul-2</li>
</ul>

<ul id="ul-3">
  <li>ul-3</li>
  <li>ul-3</li>
  <li>ul-3</li>
</ul>
```
原圖如下:
![](https://i.imgur.com/vvusGy1.png)

接下來套用 jQuery 三步驟，讓 dom 變色

```javascript
$('document').ready(function(){
  $('#ul-1').css('color', 'red')
})
```
![](https://i.imgur.com/zX89w0H.png)

確定可以變色後，接下來要使用 Traversal 的效果，而這效果的 API 是 `siblings`
```javascript
$('document').ready(function(){
  $('#ul-1').siblings().css('color', 'red')
})
```
會顯示下圖，自己不變動，周圍的變動
![](https://i.imgur.com/X8ujRzt.png)

也可以透過鄰居再做其他動作，如下
```javascript
$('document').ready(function(){
  $('#ul-1').siblings().first().css('color', 'red')
})

```
抓取鄰居的第一個，顯示如下
![](https://i.imgur.com/pUKeHjY.png)


除了這方法還可以用陣列的方式抓取，但是如果用陣列的話會變成純元素，所以外面還是要用 `$()` ，將 `$('#ul-1').siblings().[1] `包起來，由於<font color=#FF0000>在 js 陣列裡面第一個索引都是從 0 開始算</font>，所以如果寫 `[1]` 就會顯示第二個，如下圖
```javascript
$('document').ready(function(){
  $($('#ul-1').siblings().[1]).css('color', 'red')
})
```
![](https://i.imgur.com/9dXHwVn.png)

[DEMO](https://codepen.io/gleofgja/pen/eYdQEKg?editors=1011)


## 2. 鍊式( Chaining )寫法
jQuery 的鍊式( Chaining )寫法。就是 API 可以依照需求一直接下去。

利用上面的範例在各 `ul` 外再加上父層 `.ul-father` ，注意! 是 `className` 不是 `id`
```html
<div class='ul-father'>
  <ul id="ul-1">
    <li>ul-1</li>
    <li>ul-1</li>
    <li>ul-1</li>
  </ul>
</div>

<div class='ul-father'>
  <ul id="ul-2">
    <li>ul-2</li>
    <li>ul-2</li>
    <li>ul-2</li>
  </ul>
</div>

<div class='ul-father'>
  <ul id="ul-3">
    <li>ul-3</li>
    <li>ul-3</li>
    <li>ul-3</li>
  </ul>
</div>
```
樣式排版一下如下圖
![](https://i.imgur.com/efGHN12.png)

假設我們要讓 `ul-3` 的第一個變紅色的話，可以先透過父層的 `.ul-father` 再找到子層的第一個元素，這會用到練式寫法下

---
找到父層中的最後一個
```javascript
$('document').ready(function(){
  $('.ul-father') 
    .last() 
    .css('color', 'red')
})
```
![](https://i.imgur.com/pNnB0el.png)
![](https://i.imgur.com/iCOm7Iu.png)

---
用 `.children()` 進到子層裡面，這時已經到 `ul` 層了
```javascript
$('document').ready(function(){
  $('.ul-father')
    .last()
    .children()
    .css('color', 'red')
})
```
![](https://i.imgur.com/gTq9yI1.png)
![](https://i.imgur.com/GMGSUOj.png)

---
再用 `.children()` 進到 `li` 層
```javascript
$('document').ready(function(){
  $('.ul-father')
    .last()
    .children()
    .children()
    .css('color', 'red')
})

```
![](https://i.imgur.com/EgaRJqn.png)
![](https://i.imgur.com/N3pKSgH.png)

---
再用 `.first()` 選 `li` 裡面的第一個 `元素`
```javascript
$('document').ready(function(){
  $('.ul-father')
    .last()
    .children()
    .children()
    .first()
    .css('color', 'red')
})

```
![](https://i.imgur.com/ROhVoju.png)
![](https://i.imgur.com/at5rcAH.png)

---
[DEMO](https://codepen.io/gleofgja/pen/yLaQzyM?editors=1011)
以上就是鍊式寫法的示範 ~

## 3. Traversing 中的 first(), last(), find()
以下示範是為了練習，方法很多種，這裡單純練習 API 的使用。
在 jquery 中利用 `first()` 找到指定的元素，以下示範
```html
<div id='ul-father-2'>
  <div class='ul-father'>
    <ul id="ul-1">
      <li>ul-1</li>
      <li>ul-1</li>
      <li>ul-1</li>
    </ul>
  </div>
</div>

<div class='ul-father'>
  <ul id="ul-2">
    <li>ul-2</li>
    <li>ul-2</li>
    <li>ul-2</li>
  </ul>
</div>

<div class='ul-father'>
  <ul id="ul-3">
    <li>ul-3</li>
    <li>ul-3</li>
    <li>ul-3</li>
  </ul>
</div>

```
---
### first()
![](https://i.imgur.com/AqW29aA.png)
透過用 `className` 的方式讓 `ul-1` 亮紅色，因為相同的 `className` 有三個所以會選到其他的元素，這時就可以用 `first()`，來指定我們只要選第一個就好，以下示範
```javascript
// 第一個顯示顏色
$(document).ready(function(){
  $('.ul-father').first().css('color', 'red')
})
```
![](https://i.imgur.com/SAkfFZ4.png)

---
### last()
同理，換成最後一個就是 `last()`
```javascript
// 最後一個個顯示紅色
$(document).ready(function(){
  $('.ul-father').last().css('color', 'red')
})
```
![](https://i.imgur.com/fKRl7j8.png)

---

### find()
在 `ul-father` 外再加一層父層，然後稍為更改一下 HTML 結構。
```html
<div id='ul-father-2'>
  <div class='ul-father'>
    <ul id="ul-1">
      <li>ul-1</li>
      <li>ul-1</li>
      <li>ul-1</li>
    </ul>
  </div>
  <div class='ul-father'>
    <ul id="ul-2">
      <li>ul-2</li>
      <li>ul-2</li>
      <li>ul-2</li>
    </ul>
  </div>
  <div class='ul-father'>
    <ul id="ul-3">
      <li>ul-3</li>
      <li>ul-3</li>
      <li>ul-3</li>
    </ul>
  </div>
</div>
```
將所有 `ul-father` 移到 `ul-father-2` 裡面，如果想要改變 `ul-1` 裡面的 `li` 元素就可以用 `find()`
```javascript
$(document).ready(function(){
  $('#ul-father-2').find('#ul-1').css('color', 'red')
})
```
![](https://i.imgur.com/m2VkEZd.png)
這樣就可以抓到`ul-1` 並更改樣式了~

[DEMO](https://codepen.io/gleofgja/pen/mdrQLMG?editors=1011)

---
## 4. Traversal 中的 eq(), filter() 與 not()
以下示範單純為了練習 api 而使用。
### eq() 
`eq()` 就是等於，功能類似指定
```html
<div class="a">A</div>
<div class="a">A</div>
<div class="a">A</div>

<div class="b">B</div>
<div class="b">B</div>
<div class="b">B</div>

<div class="c">C</div>
<div class="c">C</div>
<div class="c">C</div>
```
![](https://i.imgur.com/rcWztWl.png)

把 B 變紅色 `$('.b').css('color', 'red')`
![](https://i.imgur.com/YU3Zlpj.png)

但如果只要第一個 B 變紅色的話就加上 `eq()`，
完整寫法 `$('.b').eq('0').css('color', 'red')`，要注意的是 jquery 的 API 還是用陣列的芳來指定索引，在陣列中第一個索引是 0，但還是要以官方文件為主。
![](https://i.imgur.com/2ITawWg.png)

---
### filter()
`filter()` 就是塞選
在 HTML 結構下方加入 `<span class='a'>this is span</span>`， className 設定為 a，如果單純寫 `$('.a').css('color', 'red')` 這樣會抓到所有 className 為 a 的元素，如下圖
![](https://i.imgur.com/uue7VEI.png)

這時候就可以用 filter()，來指定 span 標籤，`$('.a').filter('span').css('color', 'red')`
這樣就只會更改用 span 的標籤
![](https://i.imgur.com/Rjz8dNX.png)

### not()
概念就是除了誰以外，其他都可以，例如除了 `.a` 以外的其他都更改樣式
`$('div').not('.a').css('color', 'red')`，這樣除了 `.a` 的以外其他就都更改到樣式了

![](https://i.imgur.com/TL2eO4d.png)


[DEMO](https://codepen.io/gleofgja/pen/MWjZYmw?editors=1011)

---
## 參考資料
[jQuery 幼幼班](https://codeshiba.teachable.com/courses/1255270/lectures/29538918)