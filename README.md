# PK's 回憶錄

以 Hexo 與專案內的 Minos 主題建立的靜態部落格。

## 本機啟動

需要 Node.js 與 npm。本次已在 Node.js 26.13.0、npm 11.20.0 驗證建置及預覽。

```sh
npm ci
npm run server -- --ip 127.0.0.1
```

開啟 http://127.0.0.1:4000/，按 Ctrl+C 停止預覽。若埠號已被占用：

```sh
npm run server -- --ip 127.0.0.1 --port 4001
```

此時開啟 http://127.0.0.1:4001/。

## 建置

```sh
npm run build
```

網站輸出至 `public/`。此專案既有版本控制包含產出檔案；文章位於 `source/_posts/`。
使用的主題是 `themes/hexo-theme-minos-master/`，其 `_config.yml` 設定中文導覽與站內搜尋。

## 亮／暗色模式

導覽列的月亮／太陽按鈕可切換配色，手機上亦可直接使用。
首次造訪跟隨系統外觀；手動切換後會以 `localStorage` 記住選擇，跨頁及重新開啟皆沿用。
若瀏覽器禁止儲存，當頁仍可切換，但無法保留選擇。

```sh
npm test
```

測試涵蓋系統預設、儲存偏好、手動切換與儲存被禁止的情況，使用 Node.js 內建測試工具，無額外依賴。

## 已知限制

舊版 Hexo 及其依賴仍有 npm audit 安全警告；本次僅升級既有 Sass renderer 至 0.5 以恢復建置，未全面升級框架。
Sass 建置仍會顯示舊語法棄用警告。主題 CDN 與文章外部圖片需要網路連線。

`npm run deploy` 會發布至根目錄 `_config.yml` 設定的 GitHub 儲存庫；執行前請確認目的地及 Git 權限。本次未執行部署。
