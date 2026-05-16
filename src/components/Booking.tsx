import { motion } from 'framer-motion';
import { Calendar, Clock, Video, Send, CheckCircle, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { SlotPicker } from './booking/SlotPicker';
import type { WeekendDay } from './booking/slots';
import { clearHandoff, loadHandoff, type LifeplanHandoff } from './lifeplan/handoff';

const CONSULTATION_TYPES = [
    '労務管理・社会保険手続き',
    'ライフプランニング・資産形成',
    '社会保険の仕組みについて',
    '副業・個人事業の社会保険',
    'その他',
];

type SubmitResult = 'success' | 'error' | 'conflict' | null;
type EmailStatus = 'unknown' | 'sent' | 'partial' | 'failed';

export const Booking = () => {
    const [selectedDate, setSelectedDate] = useState<WeekendDay | null>(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [form, setForm] = useState({ name: '', email: '', type: '', message: '', website: '' });
    const [agreed, setAgreed] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitResult, setSubmitResult] = useState<SubmitResult>(null);
    const [emailStatus, setEmailStatus] = useState<EmailStatus>('unknown');
    const [formRenderedAt] = useState(() => Date.now());
    const [pickerKey, setPickerKey] = useState(0);
    const [handoff, setHandoff] = useState<LifeplanHandoff | null>(null);

    useEffect(() => {
        const h = loadHandoff();
        if (!h) return;
        setHandoff(h);
        setForm(p => {
            if (p.message.includes(h.summary)) return { ...p, type: h.consultationType };
            return {
                ...p,
                type: h.consultationType,
                message: p.message ? `${p.message}\n\n${h.summary}` : h.summary,
            };
        });
    }, []);

    const detachHandoff = () => {
        clearHandoff();
        setHandoff(null);
        setForm(p => ({ ...p, message: '' }));
    };

    const handleSlotSelect = (day: WeekendDay, time: string) => {
        setSelectedDate(day);
        setSelectedTime(time);
        setSubmitResult(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedDate || !selectedTime || !form.name || !form.email || !form.type || !agreed) return;

        if (form.website.trim() !== '') {
            setSubmitResult('success');
            return;
        }
        if (Date.now() - formRenderedAt < 1500) {
            setSubmitResult('error');
            return;
        }

        setSubmitting(true);
        try {
            const { data: inserted, error } = await supabase
                .from('bookings')
                .insert({
                    date: selectedDate.value,
                    time_start: selectedTime,
                    name: form.name,
                    email: form.email,
                    consultation_type: form.type,
                    message: form.message,
                })
                .select()
                .single();

            if (error) {
                if ((error as { code?: string }).code === '23505') {
                    setSelectedDate(null);
                    setSelectedTime('');
                    setSubmitResult('conflict');
                    setPickerKey(k => k + 1);
                    return;
                }
                throw error;
            }

            setSubmitResult('success');
            setForm({ name: '', email: '', type: '', message: '', website: '' });
            setAgreed(false);
            setPickerKey(k => k + 1);
            clearHandoff();
            setHandoff(null);

            // 確認メール送信を明示的にトリガ。
            // DB Webhook 経由のメール送信が止まっていてもこちらで取りにいけるため、フェイルセーフとして実行する。
            // 双方届くようになり次第、Supabase ダッシュボードの Database Webhook を Disable してください。
            try {
                const { data: notifyData, error: notifyError } = await supabase.functions.invoke(
                    'booking-notify',
                    {
                        body: {
                            type: 'INSERT',
                            table: 'bookings',
                            schema: 'public',
                            record: inserted,
                        },
                    },
                );
                if (notifyError) {
                    console.warn('[booking-notify] invoke error', notifyError);
                    setEmailStatus('failed');
                } else if (notifyData && notifyData.ok === true && notifyData.user_email_sent === true) {
                    setEmailStatus('sent');
                } else if (notifyData && notifyData.ok === true) {
                    setEmailStatus('partial');
                } else {
                    console.warn('[booking-notify] non-ok response', notifyData);
                    setEmailStatus('failed');
                }
            } catch (notifyErr) {
                console.warn('[booking-notify] invocation threw', notifyErr);
                setEmailStatus('failed');
            }
        } catch {
            setSubmitResult('error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="booking" className="py-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-surface-100/40 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <p className="section-label mb-3">06 — Booking</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">ネット相談予約</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-blue-600 to-transparent" />
                    <p className="mt-4 text-stone-500 max-w-xl leading-relaxed [text-wrap:pretty]">
                        <span className="font-semibold text-blue-800">土日祝限定</span>のオンライン相談です（1枠60分・初回60分無料）。
                        <br className="hidden sm:block" />
                        平日は本業のため、ご予約・ご返信は週末にまとめて対応します。
                    </p>
                </motion.div>

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
                        { icon: Calendar, title: '初回60分 無料', desc: 'まずはお気軽にどうぞ' },
                    ].map(({ icon: Icon, title, desc }) => (
                        <div key={title} className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-100">
                            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <Icon className="w-4 h-4 text-blue-700" />
                            </div>
                            <div>
                                <p className="text-navy-900 font-bold text-sm">{title}</p>
                                <p className="text-blue-700/70 text-xs mt-0.5">{desc}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <SlotPicker
                            key={pickerKey}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            onSelect={handleSlotSelect}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {selectedDate && selectedTime ? (
                            <div className="mb-5 p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center gap-3">
                                <Calendar className="w-4 h-4 text-blue-700 flex-shrink-0" />
                                <div>
                                    <p className="text-navy-900 font-bold text-sm">{selectedDate.label}</p>
                                    <p className="text-blue-800 text-xs mt-0.5">{selectedTime}〜（60分）</p>
                                </div>
                                <button
                                    onClick={() => { setSelectedDate(null); setSelectedTime(''); }}
                                    className="ml-auto text-blue-600 hover:text-blue-800 text-xs underline"
                                >
                                    変更
                                </button>
                            </div>
                        ) : (
                            <div className="mb-5 p-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-400 text-sm text-center">
                                左のカレンダーから希望の日時を選択してください
                            </div>
                        )}

                        {handoff && submitResult !== 'success' && (
                            <div className="mb-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                                <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-amber-900 font-bold text-sm">
                                        シミュレーション結果を添付しています
                                    </p>
                                    <p className="text-amber-800/80 text-xs mt-0.5 leading-relaxed">
                                        「ご相談の概要」欄に試算サマリをプレフィルしました。送信前に編集できます。
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={detachHandoff}
                                    className="text-amber-700 hover:text-amber-900 text-xs underline whitespace-nowrap"
                                >
                                    添付を解除
                                </button>
                            </div>
                        )}

                        {submitResult === 'success' ? (
                            <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center">
                                <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                                <p className="text-emerald-800 font-bold text-lg">予約を受け付けました</p>
                                <p className="text-emerald-700/70 text-sm mt-2 [text-wrap:pretty]">
                                    ありがとうございます。
                                    <br />
                                    Zoom URLを含む詳細のご返信は土日中にメールでお送りいたします。
                                </p>
                                <p className="text-emerald-700/60 text-xs mt-3">
                                    予約の変更・キャンセル用URLも、確認メールに記載しております。
                                </p>
                                {(emailStatus === 'partial' || emailStatus === 'failed') && (
                                    <div className="mt-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed text-left">
                                        <p className="font-bold flex items-center gap-1.5">
                                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                            確認メールの送信状況
                                        </p>
                                        <p className="mt-1 text-amber-800/90">
                                            {emailStatus === 'partial'
                                                ? '予約は登録されましたが、確認メールの一部送信に失敗しました。橋本より個別にご連絡いたします。'
                                                : '予約は登録されましたが、確認メールの送信に失敗しました。お手数ですが hashimoto@sharoushi-t.com まで直接ご連絡いただくか、土日中の橋本からのご連絡をお待ちください。'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="relative bg-white rounded-3xl border border-blue-100 shadow-sm p-6 space-y-5">
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
                                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 text-stone-800 text-sm transition-all"
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
                                            className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 text-stone-800 text-sm transition-all"
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
                                                        ? 'border-blue-400 bg-blue-50 text-blue-800'
                                                        : 'border-stone-200 text-stone-500 hover:border-blue-200 hover:bg-blue-50/50'
                                                }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value={type}
                                                    checked={form.type === type}
                                                    onChange={e => setForm(p => ({ ...p, type: e.target.value }))}
                                                    className="accent-blue-700"
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
                                        className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 text-stone-800 text-sm transition-all resize-none"
                                    />
                                </div>

                                <div aria-hidden="true" className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden">
                                    <label>
                                        ウェブサイト（入力しないでください）
                                        <input
                                            type="text"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            value={form.website}
                                            onChange={e => setForm(p => ({ ...p, website: e.target.value }))}
                                        />
                                    </label>
                                </div>

                                <label className="flex items-start gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={agreed}
                                        onChange={e => setAgreed(e.target.checked)}
                                        className="mt-0.5 accent-blue-700"
                                    />
                                    <span className="text-stone-600 text-xs leading-relaxed">
                                        <a href="#/legal/privacy" className="text-blue-800 hover:underline">プライバシーポリシー</a>
                                        および
                                        <a href="#/legal/terms" className="text-blue-800 hover:underline">利用規約</a>
                                        に同意します
                                    </span>
                                </label>

                                {submitResult === 'conflict' && (
                                    <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                        <span>
                                            誠に申し訳ございません。ご選択いただいた日時は直前に他の方のご予約が確定したため埋まってしまいました。
                                            別の時間帯をお選びのうえ、再度お試しください。
                                        </span>
                                    </div>
                                )}
                                {submitResult === 'error' && (
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        送信に失敗しました。恐れ入りますがメールにてお問い合わせください。
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting || !selectedDate || !selectedTime || !form.name || !form.email || !form.type || !agreed}
                                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-sm bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_4px_20px_rgba(37,99,235,0.35)]"
                                >
                                    {submitting
                                        ? <><Loader2 className="w-4 h-4 animate-spin" />送信中…</>
                                        : <><Send className="w-4 h-4" />予約を申し込む</>
                                    }
                                </button>
                                <p className="text-stone-400 text-xs text-center">
                                    送信すると予約が確定します。Zoom URL等の詳細は土日中にメールでお送りします。
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
