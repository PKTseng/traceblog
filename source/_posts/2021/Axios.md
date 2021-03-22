---
title: Vue - Axios & Bootstrap 引入
date: 2020/08/10
tags: Vue
categories: 電商網站
description: 註冊課程專屬練習 API、啟用一個 Vue Cli 並且 引用帶入專屬 API、引用 Bootstrap 套件，並客製化樣式
---

## 相關文件

[API](https://vue-course-api.hexschool.io/)
[文件](https://github.com/hexschool/vue-course-api-wiki/wiki)
[進度 commit](https://github.com/hexschool/vue-course-api-wiki/wiki/%E9%80%B2%E5%BA%A6-Commit)

由於 Google Chrome 在後續 80 版本後會預設封鎖第三方 Cookie，所以在登入 Vue 課程 API 就會出現無法登入的問題，在這邊老師也補充相關解決方式
[連結](https://paper.dropbox.com/doc/Vue-API-28OrjdvBouPMjspZUM7h7)

---

## 啟用一個 Vue Cli 並且 引用帶入專屬 API

#### 申請 API ，並載入

先申請 API ，取得資料
再安裝 [Vue-Axios](https://www.npmjs.com/package/vue-axios) ，然後把 Vue-Axios 載入到 main.js
**main.js 載入順序是第三方套件盡量往上放，下面再放自己撰寫的組件**

```javascript
// 第三方套件
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

// 自己撰寫
import App from './App'
import router from './router'
```

main.js 載入後到 app.vue 組件，透過 [apiurl](https://github.com/hexschool/vue-course-api-wiki/wiki/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9-%5B%E5%85%8D%E9%A9%97%E8%AD%89%5D) 網址來取得遠端資料，
在 [apiurl](https://github.com/hexschool/vue-course-api-wiki/wiki/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9-%5B%E5%85%8D%E9%A9%97%E8%AD%89%5D) 下面有範本，可以直接取用

```javascript
<script>
export default {
  name: 'App',

  // 取得遠端資料
  created() {
    const api = 'https://vue-course-api.hexschool.io/api/pkt/products'
        //api申請的路經
        //所申請的API path
        this.$http.get(api).then((response) => {
        console.log(response.data)
    })
  },

}
</script>
```

然後用 console 確認 API 資料有沒有載入(記得刷新頁面)，查看產品裡面有個測試分類，確認是否跟自己的 API 一樣
![](https://i.imgur.com/TU0kFnx.jpg)
![](https://i.imgur.com/wfOguTk.png)

#### 修改 API 路徑，確認是否有抓到

API 路徑在開發時段有可能會修改，為了方便管理，所以要去 config/dev.env.js 新增變數
(dev.env.js 是開發中的環境，prod.env.js 是正式上線的環境)

```javascript
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIPATH:'"https://vue-course-api.hexschool.io"',// 這是伺服器路徑
  COSTOMPATH:'"pkt"',// 這是自定義的路徑
})

------------下面這塊是重要提醒!!!!!!-------------------
APIPATH路經尾巴不能有"/"，不然會出現"你所查看的API不存在"
路徑是外面一個單引號，裡面再用雙引號包住

錯誤示範:
APIPATH:'https://vue-course-api.hexschool.io/',

正確示範:
APIPATH:'"https://vue-course-api.hexschool.io"',
```

新增好變數後就可以把路徑用字串模板跟變數的方式來呈現
我們要確認 dev.env.js 的路徑是否有啟用，所以在 app.vue 輸入
`console.log(process.env.APIPATH, process.env.COSTOMPATH);`

![](https://i.imgur.com/IZgZInK.png)

輸入完若直接刷新頁面會出現下圖，顯示抓不到路徑
![](https://i.imgur.com/Vof0WEE.png)
這是正常的，解決方法是重新起動 vue `npm run rdv` !!!
![](https://i.imgur.com/w2tbfNI.png)

再用 console 查看，就會正常顯示了
![](https://i.imgur.com/2d2UQDH.jpg)

#### 將路徑改成字串模板+變數

確認變數有抓到後，接下來要把路經改用字串模板+變數來呈現(單引號記得改反引號)

```javascript
<script>
export default {
  name: 'App',

  // 取得遠端資料
  created() {
  // 字串模板記得改成 反引號!!!
    const api = `${process.env.APIPATH}/api/${process.env.COSTOMPATH}/products`;
    // console.log(process.env.APIPATH, process.env.COSTOMPATH);
        //api申請的路經
        //所申請的API path
        this.$http.get(api).then((response) => {
        console.log(response.data)
    })
  },

}
</script>
```

然後重開 npm，確認是否抓到
![](https://i.imgur.com/fEYr4jg.png)

---

## 引用 Bootstrap 套件，並客製化樣式

接下來要將 Boostrap4 變數修改成自定義的變數，在此之前要先建立新的檔案並且把原本的變數檔存到要修改的資料夾內。
[Dashboard](https://getbootstrap.com/docs/4.1/examples/dashboard/) 模板
首先用 npm 載入 Boostrap4
`npm install Boostrap --save`
`npm install --save-d sass-loader@7.1.0`
會限制版本是為了避免在`<style lang="scss">` 出錯，如下圖，此圖來源為 [Simon](https://courses.hexschool.com/courses/670031/lectures/11949315) 同學的範例
![](https://i.imgur.com/I9aSB6O.png)
為避免這狀況發生，所以這邊用舊版本示範

安裝好 npm 後重開，到 node_modules 資料夾下確認是否有載入
![](https://i.imgur.com/8tQvaXh.jpg)

然後到 app.vue 把預設的 CSS 刪掉，並載入 Bootstrap4

```css
<style lang='scss'>
@import '~bootstrap/scss/bootstrap';
//~bootstrap  是指載入 Boostrap 這個模組
</style>
```

這時候有可能是 sass-loader 沒裝，每個 cli 出來的 webpaack 版本可能會不一樣，如果沒跳錯就沒問題，如果有跳錯(如下圖)
![](https://i.imgur.com/2W5i1QM.png)
那就裝一下 `npm i node-sass sass-loader --save` ，再重開就好了
![](https://i.imgur.com/syXb01r.png)

---

#### 建立資料夾，新增檔案，拉連結

接下來要客製化一些變數，這時候就需要將 Boostrap4 獨立出來，方便自定義跟管理

先在 assets 資料夾下新增 helper 資料夾，在到 node_modules / Bootstrap4 / SCSS / variables.scss，
把 variables 另存新檔到 helper 資料夾內，這樣透過修改 variables 就可以將原本 Boostrap4 樣式進行客製化了

然後建立一個新的 all.scss 檔案，並載入方法跟要客製化的檔案

```css
@import '~bootstrap/scss/functions'; //載入 Boostrap4 套用變數的方法
@import './helper/variables'; //有了上面的方法，才可以啟用自己定義的變數
@import '~bootstrap/scss/bootstrap';
```

再把 app.vue 的 style 改成下圖

```css
@import './assets/all'; //不要複製造抄，請確認 all.scss 放在哪
```

![](https://i.imgur.com/mRuU4rM.png)

到目前為止，畫面仍會是正常的(如下圖)
![](https://i.imgur.com/CAGku7A.png)

接下來要加入 Bootstrap4 樣式來看看會有什麼變化，這邊用 button 套件示範
把套件放在 app.vue 的 router-view 下方(如下圖)
![](https://i.imgur.com/Ca4wTqY.png)

這時候畫面就會顯示按鈕
![](https://i.imgur.com/m1Di9ip.png)

現在要改樣式，先到 variables.scss 找要改的變數，這邊用 'indigo' 示範
![](https://i.imgur.com/WvcRvjk.png)

找到主題色做更改，這時候 primary 的顏色會被改掉
![](https://i.imgur.com/3ulBYv5.png)

#### scoped

scoped 是將樣式限制在某個組件內，以下示範
先到 helloworld 組件看一下樣式會發現預設樣式是 scoped，代表這些樣式只會在 helloworld 組件內執行，
不會影響到外層 app 組件

我們先看 router 配置圖
![](https://i.imgur.com/hqibtwT.png)
可以看到 helloworld (內層)組件是被 app (外層)組件包住的，雖然是包住的但內外層是互不影響的，
因為有 scoped 的關係，讓它們之間天人永隔!

我們先看看 helloworld (內層) style 裡的 a 連結，預設是 #42b983 淡綠色，
![](https://i.imgur.com/stg9J3z.png)

然後我們在 app (外層)組件內加入 a 連結
![](https://i.imgur.com/BnAwgQe.png)

刷新畫面後，可以看到 a 連結的顏色會是紫色不是淡綠色，
這是因為在 helloworld 有下 scoped ，所以樣式不會互相影響
![](https://i.imgur.com/9Sv6Su8.png)

如果文字看不懂，就看這張吧
![](https://i.imgur.com/izM4poR.png)

如果不想讓各組件之間的樣式互相影響的話就必須在 style 加上 scoped !

---

## [資料來源: Vue 出電商網站](https://courses.hexschool.com/courses/670031/lectures/11949315)
