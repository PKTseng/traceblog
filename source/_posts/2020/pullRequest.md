---
title: Git - 如何發 PR 完成協作 ( Pull Request )
date: 2020/12/28
tags:
  - Pull Request
  - git clone
  - git pull
categories: Pull Request
# description: Pull Request、git clone、git pull 的基本介紹
---

1. `git clone`、`git pull` 這兩個指令有什麼不同，又分別代表什麼意思。
2. `Pull Request` 的流程是甚麼
3. 為什麼需要透過 `Pull Request` 來開發
<!-- more -->

---

## `git clone`、`git pull` 這兩個指令有什麼不同，又分別代表什麼意思。

兩個都是更新檔案，repository 更新的過程會不一樣，一個是整包下載，一個是下載本地端已經有只需要下載部分更新的檔案，兩個同樣都是把檔案更新到最新的狀態

- `git clone` :在本地( local )端還沒有 repository 的狀況下，我們就會需要使用到 `clone` ，把整包 repository 載下來，一般也只需要 clone 一次，之後就只需要 pull 了。

- `git pull` :就是我們本地( local )端已經有 repository 了，這時候就不需要在 `clone` ，只需要透過 `pull` 的方式，將遠端 ( remote )的 repository 載下來就可以了

以上就是 clone、pull 的差別

## 為什麼需要透過 `Pull Request` 來開發

一般在開發或是看到很有興趣的開源專案，如果想加入新功能或是加入開發專安的話就會需要使用到 `Pull Request`，也就是我們俗稱的 `PR`

## `Pull Request` 的流程是甚麼

**Pull Request 簡稱 PR**
如果已經是這個團隊的開者之一，那就單純 clone 就好，
如果是別的開源專案又不是這個專案的原始開發者之一，那就需要先將專案 fork 出來，再開始開發

以饅頭計畫的專案為例，我們已經是這個專案的開發人員之一，所以只需要 clone 下來就好，然後開分之並在分支上進行開發，做完之後我們會需要 push 到 remote repository，這時候就要發 PR 了，讓資深工程師確認我們寫的需求有沒有問題，如果沒問題就會 merge 到主支上

### 以下示範:

因為之前已經 clone 過了，<font color=#FF0000>**請記得先切換到主之上**</font>，然後再把本地端的檔案 pull 到最新的狀態，然後再用 `git checkout -b 分支名稱`，創建該分支同時切換到該分支上，如下圖
![](https://i.imgur.com/SIEMhnl.jpg)

接下來就是 Git 基本操作了
在分支上新增好內容後，把新增或是更改資料加入索引
![](https://i.imgur.com/YCKG1RJ.jpg)

然後提交(commit)上去
出現`git push --set-upstream origin example-mission`的原因可以參考[這篇文章](https://blog.csdn.net/benben_2015/article/details/78803753)
解決方法就是複製貼上...
![](https://i.imgur.com/X7JS8Fu.png)

上面太模糊..補上清晰版...
![](https://i.imgur.com/Fn1eXXI.png)

push 上去後到 Github 專案點選左上 Pull Request，
因為目前還沒有發 PR，所以沒看到我剛新增的內容。
要發 PR 的話要點選右邊那兩個紅框的，
![](https://i.imgur.com/KcQ30Je.png)

一種是 **Compare & pull request** ，另一種是**New pull request**，兩個都可以發，過程不一樣而已，以下兩種都會示範

### New pull request

點擊 **New pull request** 會顯示下圖畫面，
<font color=#FF0000>左邊 `base:main` 是主支千萬不要動到</font>，動右邊要 merge 的分支就好
因為我們要把剛才新增的內容合併到主之上，所以選擇剛才新增的分支名稱 `example-mission`
![](https://i.imgur.com/2lQZlxZ.png)

選完就會顯示剛才新增的內容，如下圖，確認 OK 後點選右邊的 `Create pull request`
![](https://i.imgur.com/vkAsffP.png)

接著會進入以下畫面，這邊就要寫一下大標題，還有較細項的更改內容，
填寫完後再按右下的 `Create pull request`
![](https://i.imgur.com/dJDi880.png)

按下後會進入以下畫面
![](https://i.imgur.com/MEOjzcS.png)

再回到 Pull Request 刷新一下，就會看到剛才新發的 PR 了
![](https://i.imgur.com/yA8Saeh.png)

接下來就等資深工程師確認我們寫的內容有無問題，
沒問題就會按下 `Merge pull request`，合併到主支(main)上

### Compare & pull request

這邊更簡單，也推薦使用這個
因為點選 Compare & pull request 後系統會自動選取剛才新建的分支上，會顯示下圖
![](https://i.imgur.com/dJDi880.png)

接著叫輸入大標題跟內容再 `Create pull request` ，這樣 PR 就發完了

## 參考資料

[與其它開發者的互動 - 使用 Pull Request（PR） - 為你自己學 Git | 高見龍](https://gitbook.tw/chapters/github/pull-request.html)
[git add、git commit - 提交版本](https://w3c.hexschool.com/git/b9be5b1e)
[Git master branch has no upstream branch 的解決](https://blog.csdn.net/benben_2015/article/details/78803753)
