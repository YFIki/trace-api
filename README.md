# TRACE REST API

## インストール

```
npm install
```

## VS Code から実行

左側の虫のマークでデバッグビューに切り替え、「▷」ボタンを押下する

## コンソールから実行

```
npm start
```

## テスト実行

1. 環境変数設定
   1. linux
   ```bash
   export NODE_ENV=test
   ```
   1. windows
   ```powershell
   $env:NODE_ENV="test"
   ```
1. サーバ立ち上げ(linux,windows 共通)

```bash
npm start
```

1. テストコード実行(linux,windows 共通)

```bash
npm run test
```

## Swagger の確認

`http://localhost:4000/api-docs`にブラウザから接続
