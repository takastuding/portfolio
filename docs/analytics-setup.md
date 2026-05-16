# Google Analytics 4 設定メモ

作成日: 2026-05-16

このメモは、橋本社会保険労務士事務所のホームページに Google Analytics 4 を設定した作業内容を、あとから見返せるように残したものです。

## 結論

ホームページ `https://www.sharoushi-t.com/` に Google Analytics 4 の計測を入れました。

GA4 のリアルタイム画面でアクセスが `1` と表示されるところまで確認済みです。

## 設定したもの

- Google Analytics 4 測定ID: `G-89JPXYGCH0`
- GA4 ウェブストリーム名: `sharoushi-t.com`
- 対象サイト: `https://www.sharoushi-t.com/`
- Vercel 本番環境変数: `VITE_GA_MEASUREMENT_ID=G-89JPXYGCH0`

`G-89JPXYGCH0` は公開サイトのJavaScript内に入る値です。パスワードのような秘密情報ではありません。

## 変更したファイル

### `src/lib/analytics.ts`

GA4 を読み込んで、ページ閲覧を送る処理を追加しました。

主な内容:

- `VITE_GA_MEASUREMENT_ID` から測定IDを読む
- Google公式の `gtag.js` を読み込む
- 初回表示時に `gtag('config', ...)` で page view を送る
- SPA のページ移動にも対応するため、`hashchange` / `popstate` でも page view を送る
- 自分の端末をGA計測から除外するための opt-out 機能を入れる

### `src/main.tsx`

アプリ起動時に `initAnalytics()` を呼ぶようにしました。

### `.env.local.example`

ローカル開発用のサンプルとして、以下を追加しました。

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

本物の値は `.env.local` や Vercel の環境変数に入れます。

## 途中で起きたこと

最初はタグ自体は見つかっていましたが、Google Tag Assistant の「送信されたヒット」に何も出ませんでした。

原因候補として、こちらの実装が Google公式スニペットと少し違っていたため、最終的に公式に近い形へ直しました。

特に直した点:

- `dataLayer.push(args)` ではなく、公式どおり `dataLayer.push(arguments)` に変更
- 初回 page view は `event('page_view')` ではなく、`gtag('config', 測定ID, page情報)` で送る形に変更

この修正後、GA4 のリアルタイムでアクセスが表示されることを確認しました。

## 自分のアクセスを除外する方法

自分のスマホやPCでホームページを見ると、アクセス数に自分自身が混ざってしまいます。

そこで、端末ごとにGA計測を止める専用URLを作りました。

### 除外する

自分の端末で、以下のURLを一度開きます。

```text
https://www.sharoushi-t.com/?ga_opt_out=1
```

これを開いたブラウザだけ、以後 GA4 を起動しません。

注意:

- スマホの Safari と Chrome は別扱いです。
- LINEアプリ内ブラウザも別扱いです。
- 使うブラウザごとに一度開く必要があります。
- ブラウザの履歴やサイトデータを消すと、この設定も消えることがあります。

### 除外を解除する

その端末をまた計測対象に戻したい場合は、以下を開きます。

```text
https://www.sharoushi-t.com/?ga_opt_out=0
```

## 確認したこと

### ローカル確認

以下のコマンドでビルドが通ることを確認しました。

```bash
npm run build
```

### 本番確認

Vercel の本番デプロイが `READY` になっていることを確認しました。

また、本番配信中のJavaScriptに以下が含まれていることを確認しました。

- `G-89JPXYGCH0`
- `googletagmanager.com/gtag/js`
- `dataLayer.push(arguments)`
- `ga_opt_out`
- `sharoushi.ga.optOut`
- `ga-disable-`

### Google Analytics 側の確認

Google Analytics のホーム画面で、以下を確認しました。

- 過去30分のアクティブユーザー数: `1`
- 国: `Japan`

## 関連コミット

GA4 関連で入れた主なコミットです。

- `a98b474 feat: add GA4 tracking`
- `5aa63c0 fix: send GA4 page views explicitly`
- `568a677 fix: align GA4 snippet with gtag defaults`
- `9f6e4d0 feat: add GA4 device opt-out link`

## 今後見る場所

普段は Google Analytics の以下を見ると十分です。

- リアルタイム: 今アクセスしている人がいるか
- レポート > エンゲージメント > ページとスクリーン: どのページが見られているか
- レポート > 集客: どこから来たか

最初の数日はデータが少ないので、リアルタイム以外の通常レポートは反映に時間がかかることがあります。

## 注意点

GA4 の数値は、完全なアクセスログではありません。

以下の理由で、実際のアクセスと少しズレます。

- 広告ブロックを入れている人は計測されないことがある
- ブラウザのプライバシー設定で計測されないことがある
- 自分の端末を opt-out すると、その端末のアクセスは入らない
- GA4 の通常レポートはリアルタイムより反映が遅い

そのため、細かい1アクセス単位よりも、「増えているか」「どのページが見られているか」「どこから来ているか」を見るのが向いています。
