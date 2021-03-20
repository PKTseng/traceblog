---
title: 在 Windows 上安裝 WSL1
date: 2020/12/17
tags:  WSL1
categories: WSL1
description: 在 window 作業系統下執行 linux 指令
--- 

為了在 window 作業系統上執行 linux ，所以會需要安裝 WSL
WSL 又有分1 跟 2，1 的話較為簡單，以下只示範 WSL1
<!-- more -->
---
## 安裝 WSL1
依照官網的**手動安裝步驟**
用系統管理員身分開啟 PowerShell 並輸入:
`dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`

如下圖
![](https://i.imgur.com/FgEeIdc.jpg)

然後再依照說明跳到**步驟6**，到 Microsoft Store 搜尋 Ubuntu ，這邊選用 18.04 LTS 的版本
![](https://i.imgur.com/VTHHBhF.jpg)

或是點選下面附上的連結也可以
![](https://i.imgur.com/aPlBSSk.png)
安裝好後再開啟 **Ubuntu 18.04 LTS**

如果開啟後看到以下訊息也不要慌張~
這代表我還未安裝 Windows 子系統
```
Installing, this may take a few minutes...
WslRegisterDistribution failed with error: 0x8007019e
The Windows Subsystem for Linux optional component is not enabled. Please enable it and try again.
See https://aka.ms/wslinstall for details.
Press any key to continue...
```
![](https://i.imgur.com/2H0A0Ww.png)

解決方法:
用系統管理員開啟 PowerShell ，並輸入以下指令
`Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux`
![](https://i.imgur.com/wVsWMYa.png)

<font color=#FF0000>這邊請不要急著按!!! 請先把該存檔的資料存檔在按 Y ，因為電腦會直接重新開機</font>

重開後會顯示要輸入使用者名字跟密碼
<font color=#FF0000>注意! 請不要輸入特殊字元，不然會叫你重新輸入</font>
輸入密碼時會有第二次確認，而且螢幕不會顯示出來，所以請慢慢輸入~
完成後會顯示下圖:
![](https://i.imgur.com/YMn39pB.png)

---
## WSL2
WSL2 官網有特別說明，若要更新至 WSL 2，必須是 **Windows 10**，除此之外組建編號必須是 <font color=#FF0000>18362.1049+</font> 或 <font color=#FF0000>18363.1049+</font>這兩種版本



![](https://i.imgur.com/4GsUaf3.png)
確認 window 10 的版本號，確認方法是:**按住 Windows + R 然後在對話方塊，接著輸入「winver」**
就會出現下圖
![](https://i.imgur.com/mKs4ll2.png)

因我的組建編號不符，故不更新

---
## 參考資料
[Windows 10 上適用於 Linux 的 Windows 子系統安裝指南](https://docs.microsoft.com/zh-tw/windows/wsl/install-win10)
[win10自带Bash安装的坑（Error Code: 0x8007019e，0x8000000D）](https://zhuanlan.zhihu.com/p/47541491)
[撰寫 Hexo 文章 - Markdown 語法大全](https://ed521.github.io/2019/08/hexo-markdown/)
