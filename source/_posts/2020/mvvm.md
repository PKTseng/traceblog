---
title: Vue - MVVM 簡介
date: 2021/02/22
tags: MVVM
categories:
  - Vue
---

## 介紹

MVVM 是由 Model、View 跟 ViewModel 這三個東西之間的作用，可以比較好管理開發者的內容。

<!-- more -->

- Model：管理資料來源如 API 和本地資料庫
- View：顯示 UI 和接收使用者動作
- ViewModel：從 Model 取得 View 所需的資料

![](https://i.imgur.com/KBZjJJN.png)

使用者透過 view 操作來影響 view model ，只要在 view 裡面操做， view model 同時也會跟著變動，同時也修改 model 的內容，那 view model 資料發生變動，又會同時改變 View 顯示的內容，所以他們三個是互相交互作用的。

Vue 強大的地方在於 Vue 組件，他可以把龐大的 App 分裝，把相關的功能集中，讓這些組件獨立封裝而且好維護也好測試。

![](https://i.imgur.com/u71Nukr.png)

---

## 參考資料

[精通 VueJS 前端開發完全指南](https://hiskio.com/courses/145)
[MVVM 架構](https://ithelp.ithome.com.tw/articles/10192829)
