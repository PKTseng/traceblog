---
title: Html - Flex 上課筆記
date: 2020/06/13
tags: d-flex
categories: Flex
description: 了解 d-flex 屬性
---

## Note:

display:必備屬性
flex-direction:決定 flex 軸線
justify-content:主要軸線的對齊
align-items:交錯軸線的對齊

## Flex 外層屬性 (container) 介紹

父元素有 display:flex，內層子元素之間的比例就會自動調整位置

```pug
.container
 .item.item1 1
 .item.item2 2
 .item.item3 3
```

即使 item 寬度調成 200 5000 10000 px，也不會超出 container，因為父層有 display:flex，但內層如果單一設定高度，其他項目也會跟著一起變更高度
若在 item1、2、3 個別加上屬性值
會呈現下圖

```css
.container {
  width: 500px;
  background: #0099ff;
  margin: 0 auto;
}
.container .item {
  background: #00ffa2;
  color: #d32a2a;
  text-align: center;
  font-size: 36px;
  margin-bottom: 10px;
}
.container .item1 {
  height: 150px;
  width: 150px;
}
.container .item2 {
  height: 200px;
  width: auto;
  //因為沒設定寬度，所以會自適應延伸父元素，
  //父元素寬多少ex:500px，子元素寬就會多少ex:500px
}
.container .item3 {
  height: auto;
  width: 400px;
}
```

即使 item 寬度調成 200 5000 10000 px，也不會超出 container，因為父層有 display:flex，但內層如果單一設定高度，其他項目也會跟著一起變更高度

若在 item1、2、3 個別加上屬性值

```css
.container {
  width: 500px;
  background: #0099ff;
  margin: 0 auto;
}
.container .item {
  background: #00ffa2;
  color: #d32a2a;
  text-align: center;
  font-size: 36px;
  margin-bottom: 10px;
}
.container .item1 {
  height: 150px;
  width: 150px;
}
.container .item2 {
  height: 200px;
  width: auto;
  //因為沒設定寬度，所以會自適應延伸父元素，
  //父元素寬多少ex:500px，子元素寬就會多少ex:500px
}
.container .item3 {
  height: auto;
  width: 400px;
}
```

會呈現下圖
![](https://i.imgur.com/CI2KfeC.png)
若在.container css 加上 display: flex 跟 .item + margin: 0 0 10px 10px
會呈現下圖
![](https://i.imgur.com/8POvW8H.png)
item3 因為沒設定高度，所以會依照.item2 的高度自適應延伸
item1 因為"有"設定高度，所以不會自適應延伸
如果 item 都沒設定高度，就會依照元素內的內容設定高度
note: item 預設是等高(or 寬)的，會依照 container 內部距離自動調整

[codepen 範例](https://codepen.io/gleofgja/pen/wvaVmZB?editors=0100)

---

## Flex-direction 排版方向

### flex-direction: row

![](https://i.imgur.com/TM0sx6x.png)

### flex-direction: row-reverse

![](https://i.imgur.com/FFkZsKJ.png)

### flex-direction: colume

![](https://i.imgur.com/P8e2EUb.png)

### flex-direction: colume-reverse

![](https://i.imgur.com/7VOAUuk.png)

### justify-content — 決定主軸對齊方式

![](https://i.imgur.com/GiOy9xd.png)
![](https://i.imgur.com/v3otwc7.png)
![](https://i.imgur.com/kpyczNo.png)

```
display: flex
flex-direction: column
justify-content: space-between
```

![](https://i.imgur.com/VGGHA5f.png)
要改變方向要下 display: flex & flex-direction: column(垂直)
row 橫向本身是預設可不寫

[六角 Flex 模擬器](https://codepen.io/gleofgja/pen/gOpVKzo)
[TEST CSS FLEXBOX RULES](http://flexbox.help/)

---

## [資料來源:六角學院-Flex 網頁排版技巧](https://courses.hexschool.com/courses/enrolled/666803)

## [資料來源:職人必修的 RWD 網頁入門班](https://hahow.in/courses/591d96d300f58c070078c4c6/discussions?item=5a1e1759a2c4b000589ddcff)
