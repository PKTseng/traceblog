---
title: Vue - loading 效果
date: 2021/03/10
tags: Loading
categories: Loading
---

<!--more-->

[套件](https://github.com/ankurk91/vue-loading-overlay)
首先安裝 npm: `npm install vue-loading-overlay`
再到 main.js 載入

```javascript
// Import component
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'

// 因為是全域每個 component 都會用，所以用 Vue.component
Vue.component('Loading', Loading)
```

![](https://i.imgur.com/NxbUi4i.png)

---

## 全域 Loading

接下來要在 components 裡面加入讀取的判斷式跟綁定
先將 lading 預設好，只有在等待的時間下才會轉 ` isLoading: false,`

![](https://i.imgur.com/cLak0kf.png)

然後把範例拿過來用

在 div 內一層加上 `<loading :active.sync="isLoading"></loading>`

![](https://i.imgur.com/kX4o8Kv.png)

接下來要在 AJAX 的行為上面新增 ` isLoading: false,`
在啟用 `getProducts` 的時候就會觸發 loading ( true )，在完成的時候結束( false )
範例如下:

```javascript
getProducts() {
  const api = `${process.env.APIPATH}/api/${process.env.MYPATH}/products`
  this.isLoading = true
  this.$http.get(api).then((response) => {
    this.products = response.data.products
    this.isLoading = false
  })
},
```

然後再重新整理，畫面中間就會出現 Loading 的效果，
再試試按下編輯或是新增然後直接按下確認也會有 Loading 的效果

這樣全域就完成了!!

---

## 局部 Loading

再來要做局部的，我們要在新增或是編輯圖片那邊加上 loading 的效果

要加的地方在下圖紅框處
![](https://i.imgur.com/SKEI2vd.png)

這邊偷懶一下直接用 CDN 載入 [font-awesome](https://cdnjs.com/libraries/font-awesome) 到 index.html

![](https://i.imgur.com/fszYHjw.png)
![](https://i.imgur.com/jBEiM1M.png)

然後再到 [Animating Icons](https://fontawesome.com/how-to-use/on-the-web/styling/animating-icons) 選一個自己喜歡的 loading 樣式
這邊用 `fa-spinner fa-spin` 作範例
因為要在上傳圖片的旁邊顯示 loading 效果，所以我們把 `fa-spinner fa-spin` 加在 label 旁邊，

![](https://i.imgur.com/t3XKdnP.png)

再到 data 函式加入決定局部 loading 的變數

![](https://i.imgur.com/oQk38Gg.png)

再到模板那邊用 v-if 判斷做動態綁定

![](https://i.imgur.com/doiggrR.png)

然後在上傳圖片的函示( uploadImg )內加入局部 loading 判斷

```javascript
uploadImg() {
    // 在拉圖片進去讀取的時候 fileUpLoading 會是 true
  this.status.fileUpLoading =  true
  const uploadFile = this.$refs.files.files[0]
  const formData = new FormData()
  formData.append('file-to-upload', uploadFile)
  //接下來定義路徑
  const url = `${process.env.APIPATH}/api/${process.env.MYPATH}/admin/upload`
  this.$http
    .post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => {
      console.log(res.data)
      // AJAX 結束後 fileUpLoading 就 false
      this.status.fileUpLoading = false
      if (res.data.success) {
        // this.tempProduct.imgUrl = res.data.imageUrl
        console.log(this.tempProduct)
        this.$set(this.tempProduct, 'imgUrl', res.data.imageUrl)
      }
    })
}
```
