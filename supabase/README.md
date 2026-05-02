# Supabase セットアップ手順

このドキュメントは、橋本貴嗣社会保険労務士事務所のサイトで予約フローを動作させるための手順です。

- 予約 INSERT 時に運営者・申込者の両方へメール通知（`booking-notify`）
- 予約管理URL（メールリンク）から日時変更/キャンセル（`booking-manage`）

---

## 全体像

```
[予約フォーム] ──INSERT──▶ [public.bookings]
                                  │
                                  ▼ Database Webhook
                          [Edge Function: booking-notify]
                                  │
                       ┌──────────┴──────────┐
                       ▼                     ▼
                    Resend API           Resend API
                       │                     │
                       ▼                     ▼
                運営者通知メール       申込者確認メール（管理URL付き）

[管理URLクリック] ──fetch/reschedule/cancel──▶ [Edge Function: booking-manage]
                                                        │
                                                        ├─▶ Service Role で UPDATE
                                                        └─▶ 変更/キャンセル通知メール
```

---

## 前提

- Supabase プロジェクト: `mbkrtdlmgdzbuvlcnbco`
- `public.bookings` 初期スキーマは `supabase/migration.sql` 参照
- 予約管理機能のためのスキーマ拡張は `supabase/migrations/20260427_booking_management.sql` 参照

---

## Step 1. 初回スキーマ適用

予約管理機能（manage_token / reschedule_count / cancelled_at / updated_at）を有効化するため、以下を実行します。

### 方法A: Supabase Dashboard SQL Editor（推奨・簡単）

1. https://supabase.com/dashboard/project/mbkrtdlmgdzbuvlcnbco/sql/new を開く
2. `supabase/migrations/20260427_booking_management.sql` の内容を貼り付け
3. **Run** をクリック

### 方法B: Supabase CLI

```bash
cd /mnt/c/Users/user/Desktop/portfolio\（社労士\）
pnpm dlx supabase db push
```

**確認**: Table Editor で `bookings` を開き、`manage_token` / `reschedule_count` / `cancelled_at` / `updated_at` の4カラムが追加されていれば OK。既存行の `manage_token` も自動充足されています。

---

## Step 2. Resend アカウント作成と verified email 登録

### 2-1. APIキー取得

1. https://resend.com にサインアップ（Googleログイン可）
2. **API Keys** → **Create API Key**
   - Name: `portfolio-booking`
   - Permission: `Sending access`
3. 表示された API キー（`re_xxxxxxxxxx...`）をコピー（一度しか表示されません）

### 2-2. Verified email 登録（暫定運用に必須）

独自ドメインの DNS 認証が完了するまでの暫定として、以下の手順で受信用アドレスを verify します。

1. Resend → **Settings** → **Verified Emails** → **Add Email**
2. `sharoushi24.info@gmail.com` を入力 → 確認メール内の認証リンクをクリック
3. Verified バッジが付くことを確認

> **暫定運用の制約**: FROM が `onboarding@resend.dev` の状態では、TO は **verified email として登録したアドレスのみ** に送信できます。  
> つまり、運営者宛（`sharoushi24.info@gmail.com`）には届きますが、**申込者宛（任意のメールアドレス）は Resend API が 422 を返して失敗します**。  
> Edge Function は失敗を許容して 200 を返す設計にしてあるため、フロントの予約完了画面は崩れません。  
> 申込者への返信は、運営者が受信メールを見て手動で Gmail 等から行ってください（テンプレ末尾参照）。

---

## Step 3. Edge Function のデプロイ

WSL ターミナルで実行：

```bash
cd /mnt/c/Users/user/Desktop/portfolio\（社労士\）

# 初回のみ
pnpm dlx supabase login
pnpm dlx supabase link --project-ref mbkrtdlmgdzbuvlcnbco

# secret 登録
pnpm dlx supabase secrets set RESEND_API_KEY=<Resendで取得したキー>
pnpm dlx supabase secrets set OWNER_EMAIL=sharoushi24.info@gmail.com
pnpm dlx supabase secrets set FROM_ADDRESS="橋本貴嗣社会保険労務士事務所 <onboarding@resend.dev>"
pnpm dlx supabase secrets set SITE_URL=https://sharoushi-t.com

# booking-manage は Service Role Key も必要
# Project Settings → API → service_role secret をコピーして登録
pnpm dlx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=<service_role キー>

# デプロイ（両方とも --no-verify-jwt）
pnpm dlx supabase functions deploy booking-notify --no-verify-jwt
pnpm dlx supabase functions deploy booking-manage --no-verify-jwt
```

> ⚠️ **Service Role Key の取り扱い注意**: `.env.local` に書かない、リポジトリにコミットしない、フロントから参照しない。Edge Function の secret に閉じ込めてください。

---

## Step 4. Database Webhook を設定

Supabase ダッシュボードから INSERT 時に `booking-notify` を起動する Webhook を作成します。

1. https://supabase.com/dashboard/project/mbkrtdlmgdzbuvlcnbco/database/hooks
2. **Create a new hook**
3. 設定値：

| 項目 | 値 |
|------|----|
| Name | `booking-notify` |
| Table | `bookings` |
| Events | **Insert** のみ |
| Type | **Supabase Edge Functions** |
| Edge Function | `booking-notify` |
| HTTP Method | `POST` |

4. **Create hook**

> 既に作成済の場合は重複作成しないでください。

---

## Step 5. 動作確認

### 5-1. 新規予約

1. 本番サイトの **ネット相談予約** で適当な枠を選び、ご自分のメールアドレスで予約
2. 「予約を受け付けました」が表示される
3. `sharoushi24.info@gmail.com` に **【新規予約】** メール到着を確認
4. （独自ドメイン認証後は）申込者メールアドレスに **【予約受付】** メールも到着し、本文内に「予約管理ページへ」のリンクが含まれる
5. Table Editor で `bookings` に1行追加され、`manage_token` が自動入っていることを確認

### 5-2. 予約変更（管理URL経由）

1. 受信した予約受付メール内の **予約管理ページへ** リンクをクリック
2. 予約内容が表示されることを確認
3. **日時を変更する** → 別枠を選択 → **変更を確定する**
4. 「予約日時を変更しました」表示
5. 運営者・申込者の双方に変更通知メールが届く
6. Table Editor で `reschedule_count` が `1` に増えていることを確認

### 5-3. 予約キャンセル

1. 管理URL → **予約をキャンセル** → **キャンセルする**
2. 「予約をキャンセルしました」表示
3. 双方にキャンセル通知メール到着
4. Table Editor で `status='cancelled'`, `cancelled_at` が現在時刻になっていることを確認

### 5-4. 24時間前ガード・回数上限ガード

- 予約24時間前以降に管理URLを開くと、変更/キャンセルボタンが無効化されることを確認
- 2回 reschedule した予約は、変更ボタンが disabled（キャンセルは引き続き可）

### 5-5. テスト用 curl コマンド

```bash
# booking-notify への直接テスト送信（自分宛がvalid な verified email である前提）
curl -X POST https://mbkrtdlmgdzbuvlcnbco.supabase.co/functions/v1/booking-notify \
  -H "Content-Type: application/json" \
  -d '{
    "type": "INSERT", "table": "bookings", "schema": "public",
    "record": {
      "id": "test-id", "date": "2026-05-10", "time_start": "10:00",
      "name": "テスト太郎", "email": "sharoushi24.info@gmail.com",
      "consultation_type": "労務管理・社会保険手続き",
      "message": "テスト送信です", "status": "pending",
      "created_at": "2026-04-26T00:00:00Z",
      "manage_token": "abcdef1234567890abcdef1234567890abcdef1234567890"
    }
  }'

# booking-manage の各 action（実トークンに置き換えて使用）
curl -X POST https://mbkrtdlmgdzbuvlcnbco.supabase.co/functions/v1/booking-manage \
  -H "Content-Type: application/json" \
  -d '{"action":"fetch","token":"<48hex>"}'
```

期待レスポンス: `{"ok":true,...}`

---

## Step 6. 独自ドメイン認証（恒久対応）

`sharoushi-t.com` を Resend で verify することで、**任意のメールアドレス宛に送信できる本番運用**になります。

### 6-1. Resend Domain 追加

1. Resend → **Domains** → **Add Domain** → `sharoushi-t.com`
2. 表示される DNS レコード（通常 SPF / DKIM / MX、必要に応じ DMARC）をコピー

### 6-2. DNS レコード設定

ドメイン業者（XServer / お名前.com / Vercel Domains 等）のコンソールで以下を追加：

| Type | Name | Value | 用途 |
|------|------|-------|------|
| TXT | @ | `v=spf1 include:amazonses.com ~all` | SPF（既存があれば include をマージ） |
| CNAME | resend._domainkey | Resend 表示の値 | DKIM |
| MX | send | `feedback-smtp.<region>.amazonses.com` (priority 10) | バウンス処理 |
| TXT | _dmarc | `v=DMARC1; p=none; rua=mailto:dmarc@sharoushi-t.com` | DMARC（Gmail配送性向上） |

伝播確認:
```bash
dig TXT sharoushi-t.com
dig CNAME resend._domainkey.sharoushi-t.com
dig TXT _dmarc.sharoushi-t.com
```

### 6-3. 検証完了後、FROM 切替

Resend ダッシュボードで `Verified` バッジが表示されたら：

```bash
pnpm dlx supabase secrets set FROM_ADDRESS="橋本貴嗣社会保険労務士事務所 <booking@sharoushi-t.com>"
pnpm dlx supabase functions deploy booking-notify --no-verify-jwt
pnpm dlx supabase functions deploy booking-manage --no-verify-jwt
```

### 6-4. 配送性検証

第三者のメールアドレスで実予約 → 受信メールの **メッセージのソースを表示** で：

- `spf=pass`
- `dkim=pass`
- `dmarc=pass`

の3つが揃うこと。揃わない場合は DNS が反映されていないか、レコード値の typo を疑ってください。

---

## トラブルシュート

### メールが届かない

| 症状 | 確認 |
|------|------|
| 運営者宛も申込者宛も届かない | `RESEND_API_KEY` 未設定 / Webhook 未作成 / Edge Function 未デプロイ。Resend Logs と Supabase Functions Logs の両方を確認 |
| 運営者宛は届くが申込者宛が届かない | 暫定運用の正常挙動。Step 6 で独自ドメイン認証すると解消 |
| 迷惑メールに振り分けられる | FROM が `onboarding@resend.dev` の場合は仕様上発生しやすい。Step 6 で解消 |

### `supabase: command not found`

- `pnpm dlx supabase ...` または `npx supabase ...` を使う

### Webhook が発火しない

- Webhooks 画面の **Logs** を確認
- Event が **Insert** であることを再確認

### Edge Function が 500 を返す

- Functions Logs を見て、`SUPABASE_SERVICE_ROLE_KEY` などの secret 漏れを確認
- 関数デプロイ後の secret 変更は反映に数十秒かかる場合あり

### `gen_random_bytes` が無いと言われる

- 通常 Supabase は `pgcrypto` 拡張が有効。`CREATE EXTENSION IF NOT EXISTS pgcrypto;` を SQL Editor で実行してから migration を再適用

---

## 暫定運用：手動返信テンプレ

独自ドメイン認証完了までは、申込者宛メールが Resend で届かないため、運営者が Gmail から手動返信します。

```
件名: 【予約受付確認】〇月〇日（〇）〇〇:〇〇〜のご相談について

〇〇 様

お忙しいなかご予約をいただきありがとうございます。
橋本貴嗣社会保険労務士事務所の橋本でございます。

下記のとおりご予約を承りましたのでご確認ください。

  日時：〇月〇日（〇）〇〇:〇〇 〜（60分）
  相談内容：〇〇

当日は下記のZoom URLにアクセスいただけますと幸いです。

  Zoom URL：〇〇〇

ご不明点等ございましたら、本メールへのご返信でお気軽にお問い合わせください。
当日お会いできるのを楽しみにしております。

------------------------------
橋本貴嗣社会保険労務士事務所
社会保険労務士 / FP技能士1級
sharoushi24.info@gmail.com
------------------------------
```

---

## 環境変数（Edge Function secrets）一覧

| 変数 | 用途 | 必須 |
|------|------|------|
| `RESEND_API_KEY` | Resend API キー | ✅ |
| `SUPABASE_SERVICE_ROLE_KEY` | booking-manage が RLS バイパスで UPDATE するため | ✅ |
| `OWNER_EMAIL` | 運営者宛のメール送信先＆Reply-To | 推奨 |
| `FROM_ADDRESS` | メール FROM（恒久対応で独自ドメインへ） | 推奨 |
| `SITE_URL` | 管理URL組み立て用（例: `https://sharoushi-t.com`） | 推奨 |
| `SUPABASE_URL` | Supabase 自動付与 | 自動 |

確認: `pnpm dlx supabase secrets list`
