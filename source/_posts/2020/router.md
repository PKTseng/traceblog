---
title: Vue - Router
tags: Router
categories: Vue
description: 介紹整個 Vue 骨架的重點，與解說
---

## 新增路由路徑及連結

[ Vue-router:官方文件](https://router.vuejs.org/zh/installation.html)

透過切換網址來決定要顯示的組件內容，而切換網址就要用 router 來幫你達成!

<!-- more -->

在終端機切換到自己命名的資料夾並安裝 `npm install vue-router --save`

到 index.js 引入 `Vue.use()` ，啟用路由功能

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'
//以上為官方元件

// 這邊路徑就是左邊檔案路徑，保險起見一律都不加 .vue 字尾!!!
// 路徑除了 from 要加入根目錄的 '@' 以外，其他地方不要加
import home from '@/components/HelloWorld'
import page from '@/components/pages/page'

Vue.use(VueRouter) //路由啟用。這行很重要!!

export default new VueRouter({
  // 這邊路徑是自訂的
  routes: [
    {
      name: '元件呈現的名稱',
      path: '對應的虛擬路徑',
      component: 對應的元件,
    },
    {
      path: '/index',
      name: 'home',
      component: home,
    },
    {
      path: '/page',
      name: 'page',
      component: page,
    },
  ],
})
```

[export 解釋](export:)
路由載入完啟用後，再到 main.js 載入路由配置

```javascript
import Vue from 'vue'
import App from './App'

import router from './router' //新增這行
Vue.config.productionTip = false

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router, //跟這行
})
```

這邊示範一下透過設定的路徑來顯示組件內容

因為首頁(HelloWorld.vue)的路徑(path)我定義為 /index ，
所以在網址上如果沒有輸入定義路徑會顯示下圖
![](https://i.imgur.com/OpDIjWn.png)
可以看到，畫面只會顯示 app.vue 的圖片沒有其他內容，但如果在網址後面輸入 /index ，就會顯示下圖
![](https://i.imgur.com/s8j7vel.png)
這樣就可以看到 HelloWorld.vue 的內容

---

#### 接下來使用 BS4 套件，來快速顯示組件的內容

首先，在 index.html 引入 [BS4](https://getbootstrap.com/docs/4.4/getting-started/introduction/) cdn
有分頁才會有不同路徑，所以在 components 底下新增 pages 資料夾，裡面新增 page.vue
![](https://i.imgur.com/u1kUcmR.png)

到 page.vue 新增模板記得在模板內加上 div (這邊用 hello 標籤示範)。
接著在標籤內貼上 BS4 套件(這邊用 card 套件示範)，`src` 裡面的 ...記得刪除!!，不然會錯誤!!

```html
<template>
  <div class="hello">
    <div class="card" style="width: 18rem;">
      <img src="" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</template>
```

再來要製做可以切換組件內容的 navbar
先把 app.vue 內容刪除，留下 app 標籤跟 router-view，img 也可以留下做分隔，
並在裡面套入 BS4 導覽列套件，然後把不要的內容刪掉並補上 vue 的連結標籤，這邊的連結已經不是< a href="#" > 了，而是 `router-link` ，連結路徑用 `to` ，這個路徑是 index.js 裡面自定義的路徑，記得要寫 router-view 這樣才可以顯示組件，如下圖

> 這邊說明一下 router-view：
> router-view 是呈現 router/index.js 裡面的元件，
> 而 router/index.js 是設定各元件之間的連結

![](https://i.imgur.com/mJyGWw8.png)

完成後會看到畫面如下
![](https://i.imgur.com/MkY1IT5.png)
沒有任何組件，因為網址還沒輸入任何自定義路徑

按一下 index，會顯示下圖
![](https://i.imgur.com/qNPA2Nv.png)

按一下 page，會顯示下圖
![](https://i.imgur.com/C7LFYrj.png)

---

## 製作巢狀路由頁面

接下來要做巢狀路由

**注意!!!!在巢狀裡面一律不加斜號 '/' !!!**

[參考文件](https://dotblogs.com.tw/wasichris/2017/03/06/235449)
繼續在 pages 資料夾下新建立 3 個組件(這邊用 childX 示範)，然後再引入 BS4 套件的，只是要辨別而以所以用簡單的 alert 套件就好(其實是懶)

```html
這是 child1 範本
<template>
  <div>
    <div class="alert alert-primary" role="alert">child1</div>
  </div>
</template>
```

![](https://i.imgur.com/yWI4RJb.png)

因為我們要在 page 裡面切換 child 組件，所以先把 card 套件內的內容通通刪掉並補上 `router-view`

```html
<template>
  <div class="hello">
    <div class="card" style="width: 18rem;">
      <router-view></router-view>
    </div>
  </div>
</template>
```

接下來要自定義路徑，但這是巢狀路徑，所以要在 page 底下加上 children，這 children 是使用陣列，裡面內容就跟外面的物件一樣，但在的第一個子元件的路徑可以是空直，這樣只要切到 page 頁面就會自動載入 child1 元件，子元件下陣列內的路徑也甭加 '/' ，直接寫路徑名字就好。
下面組件新增完後上面也要引入組件路徑。
範例如下：

```javascript
import Vue from 'vue'
import Router from 'vue-router'
//以上為官方元件

// 這邊路徑就是左邊檔案路徑
import home from '@/components/HelloWorld'
import page from '@/components/pages/page'
import child1 from '@/components/pages/child1'
import child2 from '@/components/pages/child2'
import child3 from '@/components/pages/child3'

Vue.use(Router) // 路由啟用。這行很重要!!

export default new Router({
  // 這邊路徑是自訂的
  routes: [
    {
      path: '/index', //對應的虛擬路徑
      name: 'home', //元件呈現的名稱
      component: home, //對應的元件
    },
    {
      path: '/page', //對應的虛擬路徑
      name: 'page', //元件呈現的名稱
      component: page, //對應的元件
      children: [
        {
          path: '', //對應的虛擬路徑
          name: 'child1', //元件呈現的名稱
          component: child1, //對應的元件
        },
        {
          path: 'child2', //對應的虛擬路徑
          name: 'child2', //元件呈現的名稱
          component: child2, //對應的元件
        },
        {
          path: 'child3', //對應的虛擬路徑
          name: 'child3', //元件呈現的名稱
          component: child3, //對應的元件
        },
      ],
    },
  ],
})
```

OK，到目前為止我們只要切換網址就可以看到 child 組件了，先試試 page 頁
我有在 app.vue 用 container 限制寬並置中
![](https://i.imgur.com/VQac8sW.png)

可以看到目前在 page 頁，並自動帶入 child1
輸入 child2 如下圖
![](https://i.imgur.com/Oo9tIoy.png)

接下來要在 page 頁面下新增子分頁的連結，

```html
<template>
  <div class="hello">
    <router-link to="/page/">child1</router-link>
    <router-link to="/page/child2">child2</router-link>
    <router-link to="/page/child3">child3</router-link>

    <!--     也可以用 v-bind 動態綁定 name 的方式來連結路徑，下面示範 -->
    <router-link :to="{ name: 'child3' }">child3</router-link>

    <div class="card" style="width: 18rem;">
      <router-view></router-view>
    </div>
  </div>
</template>
```

結果如下圖，本想把 card 套件移除，但發現他剛好可以把 alert 套件框住不會滿版，就索性留著
![](https://i.imgur.com/KsCUrFh.png)
然後注意網址!!!
在點擊子組件的時候就會切換到自訂義的網址，同時也顯示不同子頁面
![](https://i.imgur.com/vEjYlxE.png)
![](https://i.imgur.com/0hV0ukO.png)

---

### 參考資料：

### [Vue 出電商網站](https://courses.hexschool.com/courses/670031/lectures/11949226)

### [Vue 官方文件](https://router.vuejs.org/zh/guide/#html)

### [搞搞就懂部落格](https://dotblogs.com.tw/wasichris/2017/03/06/235449)
