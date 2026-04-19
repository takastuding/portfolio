import { motion } from 'framer-motion';
import { Calendar, Clock, Video, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../lib/supabase';

type SlotStatus = 'available' | 'booked' | 'loading';

type WeekendDay = { value: string; label: string; short: string; dow: '土' | '日' };

function getUpcomingWeekends(count: number): WeekendDay[] {
    const dates: WeekendDay[] = [];
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 1);

    while (dates.length < count) {
        const dow = d.getDay();
        if (dow === 0 || dow === 6) {
            const y = d.getFullYear();
            const m = d.getMonth() + 1;
            const day = d.getDate();
            const value = `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dowLabel: '土' | '日' = dow === 6 ? '土' : '日';
            dates.push({
                value,
                label: `${y}年${m}月${day}日（${dowLabel}）`,
                short: `${m}/${day}（${dowLabel}）`,
                dow: dowLabel,
            });
        }
        d.setDate(d.getDate() + 1);
    }
    return dates;
}

const TIME_SLOTS = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

const CONSULTATION_TYPES = [
    '労務管理・社会保険手続き',
    'ライフプランニング・資産形成',
    '社会保険の仕組みについて',
    '副業・個人事業の社会保険',
    'その他',
];

export const Booking = () => {
    const weekends = useMemo(() => getUpcomingWeekends(10), []);
    const [bookedSlots, setBookedSlots] = useState<Record<string, Set<string>>>({});
    const [loadingSlots, setLoadingSlots] = useState(true);
    const [selectedDate, setSelectedDate] = useState<WeekendDay | null>(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<'success' | 'error' | null>(null);

    // 予約済みスロットを取得
    useEffect(() => {
        const fetchBookings = async () => {
            setLoadingSlots(true);
            try {
                const dates = weekends.map(w => w.value);
                const { data, error } = await supabase
                    .from('bookings')
                    .select('date, time_start')
                    .in('date', dates)
                    .neq('status', 'cancelled');

                if (error) throw error;

                const map: Record<string, Set<string>> = {};
                (data ?? []).forEach(({ date, time_start }: { date: string; time_start: string }) => {
                    if (!map[date]) map[date] = new Set();
                    map[date].add(time_start);
                });
                setBookedSlots(map);
            } catch {
                // Supabase未設定時はサイレントにフォールバック
            } finally {
                setLoadingSlots(false);
            }
        };
        fetchBookings();
    }, [weekends]);

    const getSlotStatus = (date: string, time: string): SlotStatus => {
        if (loadingSlots) return 'loading';
        return bookedSlots[date]?.has(time) ? 'booked' : 'available';
    };

    const handleSlotClick = (day: WeekendDay, time: string) => {
        if (getSlotStatus(day.value, time) !== 'available') return;
        setSelectedDate(day);
        setSelectedTime(time);
        setSubmitResult(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate || !selectedTime || !form.name || !form.email || !form.type) return;

        setSubmitting(true);
        try {
            const { error } = await supabase.from('bookings').insert({
                date: selectedDate.value,
                time_start: selectedTime,
                name: form.name,
                email: form.email,
                consultation_type: form.type,
                message: form.message,
            });

            if (error) throw error;

            // 予約成功 → 確認メールをメーラーで送信
            const subject = encodeURIComponent(`【予約確認】${selectedDate.label} ${selectedTime}〜`);
            const body = encodeURIComponent(
                `${form.name} 様\n\n以下の内容でご予約を承りました。\n\n` +
                `日時: ${selectedDate.label} ${selectedTime}〜\n` +
                `相談内容: ${form.type}\n\n` +
                `ご連絡事項:\n${form.message || 'なし'}\n\n` +
                `──────────────────\n` +
                `橋本貴嗣社会保険労務士事務所\n` +
                `sharoushi24.info@gmail.com\n` +
                `※ 土日祝専門のため平日はご返信が遅れる場合があります`
            );
            window.location.href = `mailto:sharoushi24.info@gmail.com?subject=${subject}&body=${body}`;

            setSubmitResult('success');
            // 予約済みスロットを更新
            setBookedSlots(prev => {
                const next = { ...prev };
                if (!next[selectedDate.value]) next[selectedDate.value] = new Set();
                next[selectedDate.value].add(selectedTime);
                return next;
            });
            setForm({ name: '', email: '', type: '', message: '' });
        } catch {
            setSubmitResult('error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="booking" className="py-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-stone-100/40 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <p className="section-label mb-3">04 — Booking</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-800">ネット相談予約</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-amber-500 to-transparent" />
                    <p className="mt-4 text-stone-500 max-w-xl">
                        オンライン相談は<span className="font-semibold text-amber-700">土日祝の休日限定</span>です。
                        平日は本業に従事しているため、ご予約・ご返信は週末にまとめて対応します。
                    </p>
                </motion.div>

                {/* 注意バナー */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid sm:grid-cols-3 gap-4 mb-10"
                >
                    {[
                        { icon: Video, title: 'Zoom / Google Meet', desc: '全国どこからでも対応' },
                        { icon: Clock, title: '受付 10:00〜17:00', desc: '土日祝のみ（1枠60分）' },
                        { icon: Calendar, title: '初回30分 無料', desc: 'まずはお気軽にどうぞ' },
                    ].map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-100">
                            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                                <Icon className="w-4 h-4 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-amber-900 font-bold text-sm">{title}</p>
                                <p className="text-amber-700/70 text-xs mt-0.5">{desc}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* 左：カレンダー（空き状況） */}
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6"
                    >
                        <h3 className="text-stone-800 font-bold text-base mb-5 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-amber-600" />
                            空き状況
                            {loadingSlots && <Loader2 className="w-3 h-3 text-stone-400 animate-spin ml-1" />}
                        </h3>

                        {/* 凡例 */}
                        <div className="flex gap-4 mb-5">
                            {[
                                { color: 'bg-emerald-100 border-emerald-300 text-emerald-700', label: '空き' },
                                { color: 'bg-stone-100 border-stone-200 text-stone-400', label: '予約済' },
                                { color: 'bg-amber-100 border-amber-400 text-amber-700', label: '選択中' },
                            ].map(({ color, label }) => (
                                <div key={label} className="flex items-center gap-1.5">
                                    <div className={`w-5 h-5 rounded border text-[9px] flex items-center justify-center font-bold ${color}`}>○</div>
                                    <span className="text-stone-500 text-xs">{label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-4 max-h-[520px] overflow-y-auto pr-1">
                            {weekends.map(day => (
                                <div key={day.value}>
                                    <p className="text-xs font-bold text-stone-500 mb-2 flex items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${day.dow === '土' ? 'bg-blue-100 text-blue-600' : 'bg-rose-100 text-rose-600'}`}>
                                            {day.dow}
                                        </span>
                                        {day.short}
                                    </p>
                                    <div className="grid grid-cols-3 gap-2">
                                        {TIME_SLOTS.map(time => {
                                            const status = getSlotStatus(day.value, time);
                                            const isSelected = selectedDate?.value === day.value && selectedTime === time;
                                            return (
                                                <button
                                                    key={time}
                                                    onClick={() => handleSlotClick(day, time)}
                                                    disabled={status !== 'available'}
                                                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                                                        isSelected
                                                            ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                                                            : status === 'booked'
                                                            ? 'bg-stone-50 border-stone-200 text-stone-300 cursor-not-allowed line-through'
                                                            : status === 'loading'
                                                            ? 'bg-stone-50 border-stone-100 text-stone-300'
                                                            : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 hover:border-emerald-400 cursor-pointer'
                                                    }`}
                                                >
                                                    {time}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* 右：予約フォーム */}
                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* 選択中スロット表示 */}
                        {selectedDate && selectedTime ? (
                            <div className="mb-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center gap-3">
                                <Calendar className="w-4 h-4 text-amber-600 flex-shrink-0" />
                                <div>
                                    <p className="text-amber-900 font-bold text-sm">{selectedDate.label}</p>
                                    <p className="text-amber-700 text-xs mt-0.5">{selectedTime}〜（60分）</p>
                                </div>
                                <button
                                    onClick={() => { setSelectedDate(null); setSelectedTime(''); }}
                                    className="ml-auto text-amber-500 hover:text-amber-700 text-xs underline"
                                >
                                    変更
                                </button>
                            </div>
                        ) : (
                            <div className="mb-5 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-400 text-sm text-center">
                                左のカレンダーから希望の日時を選択してください
                            </div>
                        )}

                        {submitResult === 'success' ? (
                            <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center">
                                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                                <p className="text-emerald-800 font-bold text-lg">予約を受け付けました</p>
                                <p className="text-emerald-700/70 text-sm mt-2">
                                    メーラーが開いた場合は送信してください。
                                    <br />確認のご返信は週末に行います。
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-stone-700 text-xs font-bold mb-1.5">
                                            お名前 <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                            required
                                            placeholder="山田 太郎"
                                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 text-stone-800 text-sm transition-all"
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label className="block text-stone-700 text-xs font-bold mb-1.5">
                                            メールアドレス <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                            required
                                            placeholder="example@email.com"
                                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 text-stone-800 text-sm transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-stone-700 text-xs font-bold mb-2">
                                        相談内容 <span className="text-red-400">*</span>
                                    </label>
                                    <div className="grid sm:grid-cols-2 gap-2">
                                        {CONSULTATION_TYPES.map(type => (
                                            <label
                                                key={type}
                                                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border cursor-pointer transition-all duration-150 ${
                                                    form.type === type
                                                        ? 'border-amber-400 bg-amber-50 text-amber-800'
                                                        : 'border-stone-200 text-stone-500 hover:border-amber-200 hover:bg-amber-50/50'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value={type}
                                                    checked={form.type === type}
                                                    onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                                                    className="accent-amber-600"
                                                />
                                                <span className="text-xs font-medium leading-tight">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-stone-700 text-xs font-bold mb-1.5">
                                        ご相談の概要（任意）
                                    </label>
                                    <textarea
                                        value={form.message}
                                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                                        rows={3}
                                        placeholder="現在の状況や相談したい内容をご記入ください"
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 text-stone-800 text-sm transition-all resize-none"
                                    />
                                </div>

                                {submitResult === 'error' && (
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        送信に失敗しました。恐れ入りますがメールにてお問い合わせください。
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting || !selectedDate || !selectedTime || !form.name || !form.email || !form.type}
                                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-sm bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_4px_20px_rgba(217,119,6,0.35)]"
                                >
                                    {submitting
                                        ? <><Loader2 className="w-4 h-4 animate-spin" />送信中…</>
                                        : <><Send className="w-4 h-4" />予約を申し込む</>
                                    }
                                </button>
                                <p className="text-stone-400 text-xs text-center">
                                    送信後にメーラーが開きます。確認メールを送ることで予約が確定します。
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
