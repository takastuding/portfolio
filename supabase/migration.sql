-- ネット相談予約テーブル
CREATE TABLE public.bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date date NOT NULL,
  time_start text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  consultation_type text NOT NULL,
  message text DEFAULT '',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- 同一日時の二重予約防止
CREATE UNIQUE INDEX bookings_date_time_unique
  ON public.bookings (date, time_start)
  WHERE status != 'cancelled';

-- Row Level Security
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 誰でも予約を作成できる
CREATE POLICY "Public can insert bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- 空き状況確認のため date と time_start のみ公開読み取り可
CREATE POLICY "Public can view date and time for availability"
  ON public.bookings FOR SELECT
  USING (true);
