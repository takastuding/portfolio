# Supabase セットアップ手順

このドキュメントは、予約受付時に運営者・申込者の両方へ自動でメール通知を送るための設定手順です。
フロント側（`src/`）の実装は完了しているため、この手順は**初回のみ**実施してください。

## 全体像

```
[予約フォーム] ──(INSERT)──▶ [public.bookings]
                                     │
                                     ▼ Database Webhook
                             [Edge Function: booking-notify]
                                     │
                          ┌──────────┴──────────┐
                          ▼                     ▼
                       Resend API           Resend API
                          │                     │
                          ▼                     ▼
                   運営者通知メール       申込者確認メール
              (sharoushi24.info@gmail.com)    (ご入力メール)
```

---

## 前提

- Supabase プロジェクト: `mbkrtdlmgdzbuvlcnbco`
- `public.bookings` テーブルは作成済み（`supabase/migration.sql` 参照）
- Vercel デプロイも設定済み

---

## Step 1. Resend アカウント作成とAPIキー取得（約5分）

1. https://resend.com にアクセスし、サインアップ（Googleログイン可）
2. 左メニュー **API Keys** → **Create API Key**
   - Name: `portfolio-booking`
   - Permission: `Full access` または `Sending access` のみ
3. 表示された API キー（`re_xxxxxxxxxx...`）をコピー
   - ⚠️ このキーは一度しか表示されません。メモ帳などに一時保存してください

**FROM アドレスの注意**
デフォルトでは `onboarding@resend.dev` から送信されます（Edge Function に既に設定済み）。
本格運用時は以下の手順で独自ドメインを検証してください：
- Resend ダッシュボード → **Domains** → **Add Domain** → `sharoushi-t.com`
- 表示された DNS レコード（SPF/DKIM）を XServer 側で追加
- 検証完了後、`supabase/functions/booking-notify/index.ts` の `FROM_ADDRESS` を
  `"橋本貴嗣社会保険労務士事務所 <booking@sharoushi-t.com>"` に書き換えて再デプロイ

---

## Step 2. Supabase CLI で Edge Function をデプロイ（約10分）

WSL ターミナルで以下のコマンドを順に実行してください。

```bash
cd /mnt/c/Users/user/Desktop/portfolio

# 1. Supabase にログイン（初回のみ。ブラウザが開きます）
pnpm dlx supabase login

# 2. このプロジェクトを Supabase プロジェクトに紐付け
pnpm dlx supabase link --project-ref mbkrtdlmgdzbuvlcnbco

# 3. Resend API キーを secret として登録
#    ↓ <取得したキー> を実際のキーに置き換えてください
pnpm dlx supabase secrets set RESEND_API_KEY=<取得したキー>

# 4. Edge Function をデプロイ
#    --no-verify-jwt を付けることで、Webhook からの呼び出しで JWT 不要になります
pnpm dlx supabase functions deploy booking-notify --no-verify-jwt
```

`Deployed Functions ... booking-notify` のような表示が出れば成功です。

**テスト送信（任意）**

```bash
# ダミー payload で呼び出してメール送信テスト
curl -X POST https://mbkrtdlmgdzbuvlcnbco.supabase.co/functions/v1/booking-notify \
  -H "Content-Type: application/json" \
  -d '{
    "type": "INSERT",
    "table": "bookings",
    "schema": "public",
    "record": {
      "id": "test-id",
      "date": "2026-05-10",
      "time_start": "10:00",
      "name": "テスト太郎",
      "email": "自分のメールアドレス",
      "consultation_type": "労務管理・社会保険手続き",
      "message": "テスト送信です",
      "status": "pending",
      "created_at": "2026-04-19T10:00:00Z"
    }
  }'
```

`{"ok":true}` が返り、自分宛と運営者宛の両方にメールが届けばOKです。

---

## Step 3. Database Webhook を設定（約3分）

Supabase ダッシュボードから Webhook を作成し、予約 INSERT 時に自動で Edge Function が呼ばれるようにします。

1. https://supabase.com/dashboard/project/mbkrtdlmgdzbuvlcnbco/database/hooks にアクセス
2. **Create a new hook** をクリック
3. 以下を入力：

| 項目 | 値 |
|------|----|
| Name | `booking-notify` |
| Table | `bookings` |
| Events | **Insert** のみチェック |
| Type | **Supabase Edge Functions** |
| Edge Function | `booking-notify` |
| HTTP Method | `POST`（デフォルト） |
| HTTP Headers | （デフォルトのまま） |

4. **Create hook** をクリック

---

## Step 4. 動作確認

1. https://portfolio-xxx.vercel.app （本番URL）にアクセス
2. **ネット相談予約** セクションで、適当な枠を選択
3. お名前・メール（ご自分のメール推奨）・相談内容を入力し **予約を申し込む**
4. 画面に「予約を受け付けました」と表示されることを確認
5. 受信箱を確認：
   - `sharoushi24.info@gmail.com` に **【新規予約】** メール
   - 入力したメールアドレスに **【予約受付】** メール
6. Supabase ダッシュボード → Table Editor → `bookings` にレコードが追加されていることを確認

---

## トラブルシュート

### メールが届かない

- Resend ダッシュボード → **Logs** に失敗ログがないか確認
- Supabase ダッシュボード → **Edge Functions** → `booking-notify` → **Logs** を確認
- 迷惑メールフォルダも念のため確認（From が `onboarding@resend.dev` のため、Gmail で迷惑判定されやすい）

### `supabase: command not found` と出る

- `pnpm dlx supabase ...` のように `pnpm dlx` を前に付けて実行してください
- あるいは `npx supabase ...` でも可

### Webhook が発火しない

- ダッシュボードの Webhooks 画面で **Logs** を確認
- Event が Insert になっているか再確認
- Edge Function 名のタイプミスがないか確認

### 独自ドメイン検証に失敗する

- DNS レコード追加後、反映に数分〜最大48時間かかる場合があります
- XServer 側で SPF/DKIM/DMARC が正しく追加されているかサポートに確認

---

## 今後の拡張（参考）

- Stripe 決済連携（就業規則ひな形サブスクの自動配信）
- キャンセル通知メール（`status` を `cancelled` に更新したときのWebhook追加）
- リマインダーメール（Supabase Cron で前日にリマインド送信）
