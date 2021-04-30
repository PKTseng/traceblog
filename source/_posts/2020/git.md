---
title: Git - 基本操作
date: 2020/12/20
tags: Git
categories: Git
description: 介紹 Git 基本指令的操作
---

## 簡介

Git 是一個可控制程式碼版本的工具
當我們在開發的時候為了不影響線上的產品，就會先開一個分支出來在分支上做開發，這樣既可以大膽的開發也不怕會影響到線上正在運行的版本，同時又做到程式碼的控管，是一個很方便的工具

<!-- more -->

## Git 指令

Git 有分幾個簡單寫常用的幾個指令
`git init`: 在我們 local 端建立數據庫
`git add .`: 加入索引
`git commit -m`: 將目前加入索引的資料提交出去
`git push origin`: 推送到遠端數據庫
`git pull`: 從遠端數據庫拉取最新的版本
`git branch`: 查看分支
`git checkout `: 切換到該分支
`git log`: 查看 git 歷史紀錄
`git status`: 查看目前資料狀態
`git merge`: 合併分支

工作上常用的大概是以上這幾種

---

## 安裝

OS: window
首先到 [Git 官網](https://git-scm.com/)下載 Git
![](https://i.imgur.com/A0KD6ji.png)

或是用 chcoclatey 安裝也可以 ，輸入`choco install git`

初次安裝的話會需要設定使用者名稱跟密碼

## 初始化

安裝完成後在桌面建立資料夾，並簡單新增檔案，然後再對資料夾案右鍵，選取 Git Bash Here
![](https://i.imgur.com/Tga7KCl.png)
會出現 Bash 視窗
![](https://i.imgur.com/Ae4RKtN.png)
這樣就初始化完成了

## 加入索引

接下來就可以開發了

本來是檔案內容是空的，現在加入一點基本資料，然後要將這資料加入索引
當我們新增或是更改完成時就要將資料新增到索引，同時放到一個暫存區裡面
因為 VScode 有內建 `git add` ，就是下圖紅框處，如果有更改某檔案的資料，在 changes 就會有紀錄，首先左邊選單選到 Source control 會看到有檔案變更，點擊紅框的 + 號，要加入索引就把滑鼠移至紅框，會出現 + 號，點擊就 add 了
![](https://i.imgur.com/FeAhBnc.png)

add 新增索引後，如下圖
![](https://i.imgur.com/7AHm6f6.png)

## 提交

當確定好更改的檔案並加入索引後，我們要 commit ，把暫存區裡面的資料丟到儲存庫裡面
通常 commit 後面都會接此次更改的資訊，寫法如下
`git commit -m "add index.html"`，要記得空格跟加雙引號
![](https://i.imgur.com/qQ0nwuq.png)

然後推送至遠端數據庫

## 建立遠端儲存庫

在推送至遠端數據庫之前，要先在遠端建立遠端數據庫，那這會用到 Github ，
如果沒有 Github 要先辦一下
登入後看到右上角有個 + 號，點擊候選取 `New repository`
![](https://i.imgur.com/TF4JMgd.png)
會出現以下畫面，然後再紅框處輸入遠端數據庫的名稱，這邊用 test1 示範，然後點擊下面的
Create repository
![](https://i.imgur.com/rEvAKi8.png)

接著會顯示以下畫面
![](https://i.imgur.com/vqMTP0o.png)

## 推送至遠端數據庫

當我們把資料都丟到數據庫後，接下來要將新增或是修改的檔案推送到遠端數據庫中
`git push origin test` ，意思是將 test 這個分之 push 到遠端的數據庫中
因為我剛剛已經 init、add、commit 了，所以現在就直接 push，點選右邊紅框的複製紐
直接貼上
![](https://i.imgur.com/zS5tHdk.png)

用 `git log` 指令確認一下狀態
![](https://i.imgur.com/9HjeMar.png)

在回到 Github 在刷新一次頁面，確認一下
![](https://i.imgur.com/1ZPugtq.png)

這樣不管是 loacal 或是 remote，前置作業就算是完成了

## 製造分支

接下來我們可以試著用分支開發
造分支有兩種方法:

1. `git checkout -b 分支名稱`: 這方法比較直接，輸入完直接造分支同時切到該分支上
   ![](https://i.imgur.com/1QXhPuf.png)

2. `git branch 分支名稱`: 這方法會造分支但不會切換到該分支，必須再下 `git checkout 分支名稱` 才會切過去，以下示範
   我先用 `branch` 創造分支 `dev2` ，然後再確認目前在哪個分支上
   (**亮綠色有星號的就是在該分支上**)
   但因為我創的是 `dev2` ，所以還沒轉過去，要用 `checkout` 才可以切換過去
   ![](https://i.imgur.com/XZGOfc8.png)

## 合併分支

接下來流程跟上面步驟一樣

1. 建立索引 add 或是 按 +
2. 提交至儲存庫` git commit`
3. 推送至遠端

---

### 實際操作:

1. 確認在哪個分之
2. 在分支上新增 `h2` 內容，並加入索引
3. 用 `git status` 確認目前更改的檔案有哪些

如下圖
![](https://i.imgur.com/oz44dB5.png)

提交到儲存庫後，左邊的暫存檔就會不見
![](https://i.imgur.com/WiXB10q.png)

再示範一次，新增 h3 內容
我們可以點擊更改的檔案查看哪邊有高亮，有代表變更的地方
![](https://i.imgur.com/q086OIx.png)

提交後。高亮就會不見
![](https://i.imgur.com/OfQeK2n.png)

再推送到遠端
`git push origin 分支名稱`
![](https://i.imgur.com/KcZ8GBP.png)

到遠端切換到分支上查看，確實有剛新增的內容
![](https://i.imgur.com/Zco4gdf.png)

### 接下來要合併了

**切回 主支( main )**
![](https://i.imgur.com/BrJ6tEq.png)

可以看到沒有 h2、h3 的內容
但再切回 dev1 分支查看是有的
![](https://i.imgur.com/efIhab5.png)

合併時我們要先切到要被合併的那個分支上，可以用 `git branch` 確認高亮跟星號在哪，如下圖
![](https://i.imgur.com/cvzd86T.png)
`merge` 完後 dev1 的內容就會被新增到主支(main)上，然後就可以繼續做開發了

---

## 參考資料

[把檔案交給 Git 控管](https://gitbook.tw/chapters/using-git/add-to-git.html)
