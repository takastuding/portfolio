import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, Loader2, Send, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SlotPicker } from './booking/SlotPicker';
import type { WeekendDay } from './booking/slots';
import { clearHandoff, loadHandoff, type LifeplanHandoff } from './lifeplan/handoff';

const CONSULTATION_TYPES = [
    '労務管理・社会保険手続き',
    '就業規則の作成・見直し',
    'ライフプラン・資産形成',
    '副業・独立・退職の相談',
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
        setForm(prev => ({
            ...prev,
            type: h.consultationType,
            message: prev.message ? `${prev.message}\n\n${h.summary}` : h.summary,
        }));
    }, []);

    const detachHandoff = () => {
        clearHandoff();
        setHandoff(null);
        setForm(prev => ({ ...prev, message: '' }));
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
        setSubmitResult(null);
        setEmailStatus('unknown');

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

            try {
                const { data: notifyData, error: notifyError } = await supabase.functions.invoke('booking-notify', {
                    body: { type: 'INSERT', table: 'bookings', schema: 'public', record: inserted },
                });
                if (notifyError) setEmailStatus('failed');
                else if (notifyData?.ok === true && notifyData?.user_email_sent === true) setEmailStatus('sent');
                else if (notifyData?.ok === true) setEmailStatus('partial');
                else setEmailStatus('failed');
            } catch {
                setEmailStatus('failed');
            }
        } catch {
            setSubmitResult('error');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="booking" className="contact">
            <div className="wrap">
                <div className="sec-head">
                    <div className="label"><span className="num">08 / BOOKING</span></div>
                    <div>
                        <h2>初回相談のご予約。カレンダーから日時をお選びください。</h2>
                        <p className="lede">
                            初回60分は無料です。ご希望の日時と相談内容を送信いただいた後、確認メールをお送りします。
                        </p>
                    </div>
                </div>

                <div className="booking-grid">
                    <SlotPicker
                        key={pickerKey}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        onSelect={(day, time) => {
                            setSelectedDate(day);
                            setSelectedTime(time);
                            setSubmitResult(null);
                        }}
                    />

                    <div className="booking-card booking-form-card">
                        {selectedDate && selectedTime ? (
                            <div className="selected-slot">
                                <span>選択中</span>
                                <strong>{selectedDate.label} {selectedTime}</strong>
                            </div>
                        ) : (
                            <div className="booking-empty">
                                左のカレンダーから希望日時を選択してください。
                            </div>
                        )}

                        {handoff && submitResult !== 'success' && (
                            <div className="handoff-note">
                                <Sparkles size={16} aria-hidden="true" />
                                <span>ライフプランシミュレーションの結果を相談概要に添付しています。</span>
                                <button type="button" onClick={detachHandoff}>解除</button>
                            </div>
                        )}

                        {submitResult === 'success' ? (
                            <div className="booking-success">
                                <CheckCircle size={38} aria-hidden="true" />
                                <h3>予約を受け付けました</h3>
                                <p>詳細とオンライン面談URLをメールでお送りします。</p>
                                {(emailStatus === 'partial' || emailStatus === 'failed') && (
                                    <p className="booking-alert">
                                        予約は登録されましたが、確認メール送信に失敗した可能性があります。
                                    </p>
                                )}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="editorial-form">
                                <div className="form-grid">
                                    <label className="field">
                                        <span>NAME</span>
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                                            required
                                            placeholder="山田 太郎"
                                        />
                                    </label>
                                    <label className="field">
                                        <span>EMAIL</span>
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                                            required
                                            placeholder="example@email.com"
                                        />
                                    </label>
                                </div>

                                <label className="field full">
                                    <span>CONSULTATION</span>
                                    <select
                                        value={form.type}
                                        onChange={e => setForm(prev => ({ ...prev, type: e.target.value }))}
                                        required
                                    >
                                        <option value="">相談内容を選択</option>
                                        {CONSULTATION_TYPES.map(type => <option key={type}>{type}</option>)}
                                    </select>
                                </label>

                                <label className="field full">
                                    <span>MESSAGE</span>
                                    <textarea
                                        value={form.message}
                                        onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                                        rows={4}
                                        placeholder="現在の状況や相談したい内容を簡単にご記入ください。"
                                    />
                                </label>

                                <div aria-hidden="true" className="honeypot">
                                    <label>
                                        入力しないでください
                                        <input
                                            type="text"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            value={form.website}
                                            onChange={e => setForm(prev => ({ ...prev, website: e.target.value }))}
                                        />
                                    </label>
                                </div>

                                <label className="agree">
                                    <input
                                        type="checkbox"
                                        checked={agreed}
                                        onChange={e => setAgreed(e.target.checked)}
                                    />
                                    <span>
                                        <a href="#/legal/privacy">プライバシーポリシー</a> と
                                        <a href="#/legal/terms">利用規約</a> に同意します。
                                    </span>
                                </label>

                                {submitResult === 'conflict' && (
                                    <div className="form-error">
                                        <AlertCircle size={16} aria-hidden="true" />
                                        直前に別の予約が入りました。別の日時をお選びください。
                                    </div>
                                )}
                                {submitResult === 'error' && (
                                    <div className="form-error">
                                        <AlertCircle size={16} aria-hidden="true" />
                                        送信に失敗しました。時間をおいて再度お試しください。
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="submit-btn"
                                    disabled={submitting || !selectedDate || !selectedTime || !form.name || !form.email || !form.type || !agreed}
                                >
                                    {submitting ? <Loader2 size={16} className="spin" /> : <Send size={16} />}
                                    この日時で予約する
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="contact-info-strip">
                    <aside>
                        <div className="ttl">EMAIL</div>
                        <div className="val">hashimoto@sharoushi-t.com</div>
                        <div className="sub">お問い合わせはメールでも受け付けています。</div>
                    </aside>
                    <aside>
                        <div className="ttl">STYLE</div>
                        <div className="val">オンライン相談中心</div>
                        <div className="sub">Zoom / Google Meet に対応します。</div>
                    </aside>
                    <aside>
                        <div className="ttl">HOURS</div>
                        <div className="val">土日祝 10:00-17:00</div>
                        <div className="sub">平日の返信は週末にまとまる場合があります。</div>
                    </aside>
                </div>
            </div>
        </section>
    );
};
