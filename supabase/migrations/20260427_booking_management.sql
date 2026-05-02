-- 予約管理機能（リスケ／キャンセル）のためのスキーマ拡張
-- pgcrypto は Supabase で標準有効（gen_random_bytes 利用可）

-- 1) 列追加（IF NOT EXISTS で再実行に耐える）
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS manage_token text,
  ADD COLUMN IF NOT EXISTS reschedule_count int NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS cancelled_at timestamptz,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

-- 2) 既存レコードに manage_token を後追加
UPDATE public.bookings
  SET manage_token = encode(gen_random_bytes(24), 'hex')
  WHERE manage_token IS NULL;

-- 3) NOT NULL 化と DEFAULT 設定
ALTER TABLE public.bookings ALTER COLUMN manage_token SET NOT NULL;
ALTER TABLE public.bookings ALTER COLUMN manage_token SET DEFAULT encode(gen_random_bytes(24), 'hex');

-- 4) UNIQUE INDEX
CREATE UNIQUE INDEX IF NOT EXISTS bookings_manage_token_unique
  ON public.bookings(manage_token);

-- 5) updated_at 自動更新トリガ
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS bookings_set_updated_at ON public.bookings;
CREATE TRIGGER bookings_set_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
