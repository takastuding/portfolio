import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, AlertCircle, CheckCircle, Loader2, XCircle, Pencil } from 'lucide-react';
import { SlotPicker } from './booking/SlotPicker';
import type { WeekendDay } from './booking/slots';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const ENDPOINT = `${SUPABASE_URL}/functions/v1/booking-manage`;

const RESCHEDULE_LIMIT = 2;
const CUTOFF_MS = 24 * 60 * 60 * 1000;

type Booking = {
    id: string;
    date: string;
    time_start: string;
    name: string;
    email: string;
    consultation_type: string;
    message: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    reschedule_count: number;
    cancelled_at: string | null;
};

type FetchResult =
    | { ok: true; booking: Booking }
    | { ok: false; error: string };

async function callApi<T>(body: Record<string, unknown>): Promise<T> {
    const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(body),
    });
    const json = (await res.json()) as T;
    return json;
}

function formatDateLabel(iso: string): string {
    const [y, m, d] = iso.split('-');
    const dow = ['日', '月', '火', '水', '木', '金', '土'][new Date(iso).getDay()];
    return `${y}年${Number(m)}月${Number(d)}日（${dow}）`;
}

function isPastCutoff(date: string, time_start: string): boolean {
    const target = new Date(`${date}T${time_start}:00+09:00`).getTime();
    return target - Date.now() < CUTOFF_MS;
}

type Mode = 'view' | 'reschedule' | 'confirm-cancel';

export const BookingManage = ({ token }: { token: string }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [booking, setBooking] = useState<Booking | null>(null);
    const [mode, setMode] = useState<Mode>('view');
    const [pickerDate, setPickerDate] = useState<WeekendDay | null>(null);
    const [pickerTime, setPickerTime] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [actionResult, setActionResult] = useState<'rescheduled' | 'cancelled' | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const json = await callApi<FetchResult>({ action: 'fetch', token });
            if (!json.ok) {
                setError(json.error === 'not_found' ? 'お探しの予約が見つかりませんでした。URLをご確認ください。' : '予約情報の取得に失敗しました。時間をおいて再度お試しください。');
                setBooking(null);
            } else {
                setBooking(json.booking);
            }
        } catch {
            setError('通信エラーが発生しました。時間をおいて再度お試しください。');
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        load();
    }, [load]);

    const handleReschedule = async () => {
        if (!booking || !pickerDate || !pickerTime) return;
        setSubmitting(true);
        setActionError(null);
        try {
            const json = await callApi<{ ok: boolean; error?: string; booking?: Booking }>({
                action: 'reschedule',
                token,
                new_date: pickerDate.value,
                new_time: pickerTime,
            });
            if (!json.ok) {
                if (json.error === 'slot_taken') {
                    setActionError('選択された日時は既に他の方の予約が入っています。別の枠をお選びください。');
                } else if (json.error === 'past_cutoff') {
                    setActionError('変更受付期限を過ぎました。メールでご連絡ください。');
                } else if (json.error === 'limit_exceeded') {
                    setActionError('変更回数の上限に達しました。これ以上の変更はメールでご連絡ください。');
                } else {
                    setActionError('変更に失敗しました。時間をおいて再度お試しください。');
                }
                return;
            }
            setActionResult('rescheduled');
            if (json.booking) setBooking(json.booking);
            setMode('view');
            setPickerDate(null);
            setPickerTime('');
        } catch {
            setActionError('通信エラーが発生しました。');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = async () => {
        if (!booking) return;
        setSubmitting(true);
        setActionError(null);
        try {
            const json = await callApi<{ ok: boolean; error?: string; booking?: Booking }>({
                action: 'cancel',
                token,
            });
            if (!json.ok) {
                if (json.error === 'past_cutoff') {
                    setActionError('キャンセル受付期限を過ぎました。メールでご連絡ください。');
                } else {
                    setActionError('キャンセルに失敗しました。時間をおいて再度お試しください。');
                }
                return;
            }
            setActionResult('cancelled');
            if (json.booking) setBooking(json.booking);
            setMode('view');
        } catch {
            setActionError('通信エラーが発生しました。');
        } finally {
            setSubmitting(false);
        }
    };

    const cancelled = booking?.status === 'cancelled';
    const past = booking ? isPastCutoff(booking.date, booking.time_start) : false;
    const reachedLimit = booking ? booking.reschedule_count >= RESCHEDULE_LIMIT : false;

    return (
        <div className="min-h-screen bg-surface-50">
            <header className="border-b border-blue-100 bg-white/95 backdrop-blur sticky top-0 z-40">
                <div className="max-w-3xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
                    <a
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.hash = '';
                            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
                        }}
                        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-blue-800 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        トップへ戻る
                    </a>
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="" aria-hidden="true" className="w-7 h-7 object-contain" />
                        <span className="text-navy-900 font-bold text-xs">橋本社会保険労務士事務所</span>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 lg:px-8 py-12 sm:py-16">
                <p className="section-label mb-3">Booking Management</p>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">予約の確認・変更・キャンセル</h1>
                <div className="mt-4 h-px w-16 bg-gradient-to-r from-blue-600 to-transparent" />

                {loading && (
                    <div className="mt-12 flex flex-col items-center justify-center py-16 text-stone-400">
                        <Loader2 className="w-8 h-8 animate-spin mb-3" />
                        <p className="text-sm">予約情報を取得しています...</p>
                    </div>
                )}

                {!loading && error && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-10 p-6 rounded-2xl bg-red-50 border border-red-200"
                    >
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-red-800 font-bold">予約情報を取得できませんでした</p>
                                <p className="text-red-700/80 text-sm mt-1">{error}</p>
                                <a href="#home" className="inline-block mt-4 text-sm text-blue-700 hover:text-blue-800 underline">トップへ戻る</a>
                            </div>
                        </div>
                    </motion.div>
                )}

                {!loading && booking && (
                    <div className="mt-10 space-y-6">
                        {actionResult === 'rescheduled' && (
                            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-emerald-800 font-bold text-sm">予約日時を変更しました</p>
                                    <p className="text-emerald-700/80 text-xs mt-1">確認メールをお送りしましたのでご確認ください。</p>
                                </div>
                            </div>
                        )}
                        {actionResult === 'cancelled' && (
                            <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 flex items-start gap-3">
                                <XCircle className="w-5 h-5 text-stone-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-stone-800 font-bold text-sm">予約をキャンセルしました</p>
                                    <p className="text-stone-600 text-xs mt-1">確認メールをお送りしました。またのご利用をお待ちしております。</p>
                                </div>
                            </div>
                        )}

                        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 sm:p-8">
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-blue-700 text-[11px] font-bold tracking-widest uppercase">Your Booking</p>
                                {cancelled && (
                                    <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 text-[10px] font-bold tracking-wider">キャンセル済</span>
                                )}
                            </div>
                            <dl className="space-y-3 text-sm">
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                                    <dt className="text-stone-500 sm:w-28 flex-shrink-0">日時</dt>
                                    <dd className="text-navy-900 font-bold">
                                        <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4 text-blue-700" />{formatDateLabel(booking.date)}</span>
                                        <span className="ml-3 inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-700" />{booking.time_start}〜（60分）</span>
                                    </dd>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                                    <dt className="text-stone-500 sm:w-28 flex-shrink-0">お名前</dt>
                                    <dd className="text-stone-800">{booking.name} 様</dd>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                                    <dt className="text-stone-500 sm:w-28 flex-shrink-0">相談内容</dt>
                                    <dd className="text-stone-800">{booking.consultation_type}</dd>
                                </div>
                                {booking.message && (
                                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                                        <dt className="text-stone-500 sm:w-28 flex-shrink-0">概要</dt>
                                        <dd className="text-stone-700 whitespace-pre-wrap text-sm">{booking.message}</dd>
                                    </div>
                                )}
                            </dl>
                        </div>

                        {!cancelled && (
                            <>
                                {past && (
                                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 text-sm flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold">変更・キャンセル受付期限を過ぎました</p>
                                            <p className="text-xs mt-1 text-blue-700/80">予約24時間前以降の変更・キャンセルは、お手数ですが <a href="mailto:hashimoto@sharoushi-t.com" className="underline">hashimoto@sharoushi-t.com</a> までメールでご連絡ください。</p>
                                        </div>
                                    </div>
                                )}
                                {!past && reachedLimit && mode === 'view' && (
                                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-800 text-sm flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold">変更回数の上限（{RESCHEDULE_LIMIT}回）に達しました</p>
                                            <p className="text-xs mt-1 text-blue-700/80">これ以上の変更はメールでご連絡ください。キャンセルは引き続き可能です。</p>
                                        </div>
                                    </div>
                                )}
                                {actionError && (
                                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <p>{actionError}</p>
                                    </div>
                                )}

                                {mode === 'view' && !past && (
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            disabled={reachedLimit}
                                            onClick={() => { setMode('reschedule'); setActionError(null); }}
                                            className="inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-sm bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
                                        >
                                            <Pencil className="w-4 h-4" />
                                            日時を変更する
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => { setMode('confirm-cancel'); setActionError(null); }}
                                            className="inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-stone-700 font-bold text-sm bg-white border border-stone-300 hover:border-stone-400 hover:bg-stone-50 transition-all"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            予約をキャンセル
                                        </button>
                                    </div>
                                )}

                                {mode === 'reschedule' && (
                                    <div className="space-y-4">
                                        <SlotPicker
                                            selectedDate={pickerDate}
                                            selectedTime={pickerTime}
                                            onSelect={(d, t) => { setPickerDate(d); setPickerTime(t); }}
                                            excludeDate={booking.date}
                                            excludeTime={booking.time_start}
                                        />
                                        {pickerDate && pickerTime && (
                                            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-sm">
                                                <p className="text-stone-600">変更後の日時：</p>
                                                <p className="text-navy-900 font-bold mt-1">{pickerDate.label} {pickerTime}〜</p>
                                            </div>
                                        )}
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                disabled={submitting || !pickerDate || !pickerTime}
                                                onClick={handleReschedule}
                                                className="inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-white font-bold text-sm bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                            >
                                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                                変更を確定する
                                            </button>
                                            <button
                                                type="button"
                                                disabled={submitting}
                                                onClick={() => { setMode('view'); setPickerDate(null); setPickerTime(''); setActionError(null); }}
                                                className="inline-flex items-center justify-center gap-2 py-3.5 rounded-xl text-stone-700 font-bold text-sm bg-white border border-stone-300 hover:bg-stone-50 transition-all"
                                            >
                                                戻る
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {mode === 'confirm-cancel' && (
                                    <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
                                        <p className="text-navy-900 font-bold text-base mb-2">予約をキャンセルしますか？</p>
                                        <p className="text-stone-500 text-sm mb-5">この操作は取り消せません。よろしければ「キャンセルする」を押してください。</p>
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            <button
                                                type="button"
                                                disabled={submitting}
                                                onClick={handleCancel}
                                                className="inline-flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-sm bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                            >
                                                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <XCircle className="w-4 h-4" />}
                                                キャンセルする
                                            </button>
                                            <button
                                                type="button"
                                                disabled={submitting}
                                                onClick={() => { setMode('view'); setActionError(null); }}
                                                className="inline-flex items-center justify-center gap-2 py-3 rounded-xl text-stone-700 font-bold text-sm bg-white border border-stone-300 hover:bg-stone-50 transition-all"
                                            >
                                                戻る
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}

                        {cancelled && (
                            <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 text-center">
                                <p className="text-stone-700 text-sm">この予約はキャンセル済みです。再度ご予約をご希望の場合は、トップページの予約フォームからお申し込みください。</p>
                                <a href="#home" className="inline-block mt-4 text-sm text-blue-700 hover:text-blue-800 underline">トップページへ</a>
                            </div>
                        )}

                        <p className="text-stone-400 text-xs text-center pt-4">
                            予約に関するお問い合わせは <a href="mailto:hashimoto@sharoushi-t.com" className="text-blue-700 hover:underline">hashimoto@sharoushi-t.com</a> まで
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
};
