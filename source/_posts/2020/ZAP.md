---
title: OWASP ZAP 網頁測試
date: 2020/12/15
tags: OWASP
categories: ZAP
description: 如何使用 ZAP 網頁滲透工具，測試網站的漏洞
---

## ZAP 網頁滲透工具

ZAP 測試分兩種方法: GUI 介面測試跟 Docker 測試
到官網下載 [Cross Platform Package](https://www.zaproxy.org/download/) 測試程式(此版本為 2.9.0)

<!-- more -->

### GUI 介面測試

開啟 GUI 前要先安裝 [jdk-8u271-windows-x64](https://www.oracle.com/tw/java/technologies/javase/javase-jdk8-downloads.html)，否則無法開啟，

安裝好後將 Cross Platform Package 資料夾內 ZAP_2.9.0 檔開啟
![](https://i.imgur.com/stovEwL.png)
![](https://i.imgur.com/Al98tGQ.png)

第一次開啟會問是否要將 session 存起來
![](https://i.imgur.com/a8c3i5z.png)
[圖片來源: EPH 的程式日記](https://ephrain.net/pentest-%E7%94%A8-owasp-zap-%E5%81%9A%E6%BB%B2%E9%80%8F%E6%B8%AC%E8%A9%A6%EF%BC%8C%E6%89%BE%E5%B0%8B%E7%B6%B2%E7%AB%99%E5%8F%AF%E8%83%BD%E7%9A%84%E5%BC%B1%E9%BB%9E/)

開啟後要先設定 report 的儲存位置，
這裡示範在桌面創建資料(report)夾並將檔名命名為 test
![](https://i.imgur.com/Zeryray.png)

設定 ok 後，按下 Save

接下來左上角可以設定測試模式(這邊選用標準模式示範)，右邊視窗選擇掃描模式(這邊用自動掃描)
![](https://i.imgur.com/jRxM6uQ.png)

選擇自動掃描後，在將要測試的網址寫入
![](https://i.imgur.com/X8axeQO.png)

按下 Attack ，下面區塊就開始掃描了
![](https://i.imgur.com/QRQpLS1.png)

測試完成，左邊旗子的顏色就是威脅的等級，以下測出我們有一個中威脅跟三個低威脅
(威脅等級分成高中低還有訊息，高威脅的旗子會是紅色的，中威脅的旗子是橘色，低威脅的旗子是黃色)
![](https://i.imgur.com/Uv0BPEg.png)

點開其中一個威脅，右邊視窗會跳出(由上而下)威脅等級、問題描述、解法跟可以參考的資料
![](https://i.imgur.com/MkQC55j.png)

然後再依照這些提示訊息加以修正

以上是使用 GUI 介面測試的示範

---

## Docker ZAP 測試

此測法較為詳細，[ZAP Docker Documentation](https://www.zaproxy.org/docs/docker/)
掃描方法分成兩種

### 開啟虛擬機

[BIOS 開啟方法](https://ofeyhong.pixnet.net/blog/post/221133558)
因為要使用 docker 就要到 BIOS 開啟虛擬機，回到桌面開啟工作管理員/效能，確認虛擬機是否有開啟，如下圖
![](https://i.imgur.com/xcDrs8C.png)

---

### 安裝環境

[Docker 官網](https://www.docker.com/get-started)下載 docker
![](https://i.imgur.com/zOgNtC2.png)

安裝
![](https://i.imgur.com/Savy4T5.png)

安裝好 docker 後，會要求重新開機

接下來要用 cmd 測試，指令可參考 [ZAP Docker User Guide](https://www.zaproxy.org/docs/docker/about/)
有穩定版跟每周更新版，這邊示範穩定版
開啟 cmd 安裝 docker zap: `docker pull owasp/zap2docker-stable`

等大概 5~10 分鐘，安裝好後如下圖
![](https://i.imgur.com/yr8ncmq.png)

這樣就可以開始測試了

---

### Baseline Scan

[ZAP Docker Documentation](https://www.zaproxy.org/docs/docker/)

如果只是單純測試的話可以參考官方給的範例:
`docker run -t owasp/zap2docker-stable zap-baseline.py -t https://www.example.com`

由於專案關係要將測試結果做成 report 並存到指定位置，所以將指令改寫成如下:
`docker run -v C:\Users\ken.tseng\Desktop\zap:/zap/wrk/ -t owasp/zap2docker-stable zap-baseline.py -t https://xxxxxx.com/ -w report_md`

將指令輸入並打開 docker ，確認是否有在 run
![](https://i.imgur.com/TRDOX7S.png)
前面測試大概會花 5~10 分鐘左右，只要 docker 顯示 RUNNING 就代表有在 Run

以下為測結果

```
PASS: Cookie No HttpOnly Flag [10010]
PASS: Cookie Without Secure Flag [10011]
PASS: Cross-Domain JavaScript Source File Inclusion [10017]
PASS: Content-Type Header Missing [10019]
PASS: X-Frame-Options Header [10020]
PASS: Information Disclosure - Debug Error Messages [10023]
PASS: Information Disclosure - Sensitive Information in URL [10024]
PASS: Information Disclosure - Sensitive Information in HTTP Referrer Header [10025]
PASS: HTTP Parameter Override [10026]
PASS: Information Disclosure - Suspicious Comments [10027]
PASS: Open Redirect [10028]
PASS: Cookie Poisoning [10029]
PASS: User Controllable Charset [10030]
PASS: User Controllable HTML Element Attribute (Potential XSS) [10031]
PASS: Viewstate [10032]
PASS: Directory Browsing [10033]
PASS: Heartbleed OpenSSL Vulnerability (Indicative) [10034]
PASS: X-Backend-Server Header Information Leak [10039]
PASS: Secure Pages Include Mixed Content [10040]
PASS: HTTP to HTTPS Insecure Transition in Form Post [10041]
PASS: HTTPS to HTTP Insecure Transition in Form Post [10042]
PASS: User Controllable JavaScript Event (XSS) [10043]
PASS: Big Redirect Detected (Potential Sensitive Information Leak) [10044]
PASS: Retrieved from Cache [10050]
PASS: X-ChromeLogger-Data (XCOLD) Header Information Leak [10052]
PASS: Cookie Without SameSite Attribute [10054]
PASS: X-Debug-Token Information Leak [10056]
PASS: Username Hash Found [10057]
PASS: X-AspNet-Version Response Header [10061]
PASS: PII Disclosure [10062]
PASS: Timestamp Disclosure [10096]
PASS: Hash Disclosure [10097]
PASS: Cross-Domain Misconfiguration [10098]
PASS: Weak Authentication Method [10105]
PASS: Reverse Tabnabbing [10108]
PASS: Modern Web Application [10109]
PASS: Absence of Anti-CSRF Tokens [10202]
PASS: Private IP Disclosure [2]
PASS: Session ID in URL Rewrite [3]
PASS: Script Passive Scan Rules [50001]
PASS: Insecure JSF ViewState [90001]
PASS: Charset Mismatch [90011]
PASS: Application Error Disclosure [90022]
PASS: Loosely Scoped Cookie [90033]
WARN-NEW: Incomplete or No Cache-control and Pragma HTTP Header Set [10015] x 1
        https://xxxxxx.com/ (200 OK)
WARN-NEW: X-Content-Type-Options Header Missing [10021] x 2
        https://xxxxxx.com/ (200 OK)
        https://xxxxxx.com/favicon.ico (200 OK)
WARN-NEW: Strict-Transport-Security Header Not Set [10035] x 4
        https://xxxxxx.com/ (200 OK)
        https://xxxxxx.com/robots.txt (404 Not Found)
        https://xxxxxx.com/sitemap.xml (404 Not Found)
        https://xxxxxx.com/favicon.ico (200 OK)
WARN-NEW: Server Leaks Version Information via "Server" HTTP Response Header Field [10036] x 4
        https://xxxxxx.com/ (200 OK)
        https://xxxxxx.com/robots.txt (404 Not Found)
        https://xxxxxx.com/sitemap.xml (404 Not Found)
        https://xxxxxx.com/favicon.ico (200 OK)
WARN-NEW: Server Leaks Information via "X-Powered-By" HTTP Response Header Field(s) [10037] x 4
        https://xxxxxx.com/ (200 OK)
        https://xxxxxx.com/robots.txt (404 Not Found)
        https://xxxxxx.com/sitemap.xml (404 Not Found)
        https://xxxxxx.com/favicon.ico (200 OK)
WARN-NEW: Content Security Policy (CSP) Header Not Set [10038] x 1
        https://xxxxxx.com/ (200 OK)
WARN-NEW: CSP: Wildcard Directive [10055] x 2
        https://xxxxxx.com/robots.txt (404 Not Found)
        https://xxxxxx.com/sitemap.xml (404 Not Found)
FAIL-NEW: 0     FAIL-INPROG: 0  WARN-NEW: 7     WARN-INPROG: 0  INFO: 0 IGNORE: 0PASS: 44
```

測出結果有 7 項 WARN-NEW ，後面顯示有問題的項目提示，WARN-NEW 下面顯示的是有問題的 URL 有哪些，詳細的弱點描述跟解法資訊請看 report

---

## 參考資料

[官方文件](https://www.zaproxy.org/docs/)
[用 OWASP ZAP 做滲透測試，找尋網站可能的弱點](https://ephrain.net/pentest-%E7%94%A8-owasp-zap-%E5%81%9A%E6%BB%B2%E9%80%8F%E6%B8%AC%E8%A9%A6%EF%BC%8C%E6%89%BE%E5%B0%8B%E7%B6%B2%E7%AB%99%E5%8F%AF%E8%83%BD%E7%9A%84%E5%BC%B1%E9%BB%9E/)
[EPH 的程式日記](https://ephrain.net/pentest-%E7%94%A8-owasp-zap-%E5%81%9A%E6%BB%B2%E9%80%8F%E6%B8%AC%E8%A9%A6%EF%BC%8C%E6%89%BE%E5%B0%8B%E7%B6%B2%E7%AB%99%E5%8F%AF%E8%83%BD%E7%9A%84%E5%BC%B1%E9%BB%9E/)
