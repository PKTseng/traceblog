---
title: Python - 用 python flask 在本地端架設後端 server 進行 api 串接練習
date: 2021/03/31
tags:
  - Python
  - WSL
categories:
  - Python
  - WSL
---

最近在寫個人的 side project ，由於 api 都是由後端提供，但是要讓 api 運作就是要開啟後端的 server ，這樣前端打 api 就可以會收到 response。

<!-- more -->

工作環境: window
執行系統: WSL
開發工具: VS Code
虛擬機: Ubuntu 18.04

如果沒有 Ubuntu 18.04 要先安裝。

## 切換 WSL 系統

在 VS Code 開啟終端機 ( ctrl + ~ )
把開發環境切換到 WSL
![](https://i.imgur.com/ItZDUVK.png)

選擇 WSL
![](https://i.imgur.com/OzW0mY2.png)

選擇 WSL 後再點擊 +
![](https://i.imgur.com/SxzRueQ.png)

就會多新增一個 WSL
![](https://i.imgur.com/8c8vn1b.png)

## 執行

開好 WSL 後執行

```python
sudo apt update
sudo apt -y upgrade
```

執行 `sudo apt update` 這段指令會安裝 10~20 分鐘左右。
![](https://i.imgur.com/fiRGUom.png)

結束後，在下 `sudo apt -y upgrade` 指令，繼續安裝。
![](https://i.imgur.com/GeXtUYX.png)

安裝好後，確認 python 版本 `python3 -V`

![](https://i.imgur.com/TiycTIk.png)
卻認為 python3 的版本

在執行 `sudo apt install -y python3-pip` 指令
![](https://i.imgur.com/wu6CRjq.png)

安裝好後還看看後端寫的啟動本地 server 的指令
![](https://i.imgur.com/AzQ9HFf.png)

```python
pip3 install -r requirements.txt


python3 init.py
python3 run.py
```

![](https://i.imgur.com/zyItzRY.png)

如果執行完出現
Could not open requirements file: [Errno 2] No such file or directory: 'req
的訊息就表示，檔案路徑不對，不應該是 window 下的檔案而是 linux 下的檔案，如下圖

一開始我的檔案路徑是在 window 下，然後我 cd 切回根目錄，再用 ls 看一下檔案， 再 cd 切到我要的檔案裏面，然後再執行一次 `pip3 install -r requirements.txt`。

![](https://i.imgur.com/9IHGfsA.png)

然後就可以順利安裝了。
![](https://i.imgur.com/F4xAXp3.png)

會出現 zsh: command not found: python 這個訊息是因為，我沒有將 python 指定成 python3 的版本，改用 python3 就可以正常運作了，如下圖。
![](https://i.imgur.com/4oCyUW0.png)

再執行 `python3 run.py` 就可以正常運作了。
![](https://i.imgur.com/laFZxIo.png)

但系統會告知你，此為開發使用的，請不要再線上的產品使用。

## 參考資料

[如何在 Ubuntu 18.04 上安裝 Python 3 並建立本地編程環境](https://www.digitalocean.com/community/tutorials/ubuntu-18-04-python-3-zh)
