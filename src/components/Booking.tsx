import { motion } from 'framer-motion';
import { Calendar, Video, Send, Clock } from 'lucide-react';
import { useState, useMemo } from 'react';

function getUpcomingWeekends(count: number): { value: string; label: string }[] {
    const dates: { value: string; label: string }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(today);
    d.setDate(d.getDate() + 1);

    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    while (dates.length < count) {
        const dow = d.getDay();
        if (dow === 0 || dow === 6) {
            const y = d.getFullYear();
            const m = d.getMonth() + 1;
            const day = d.getDate();
            const value = `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const label = `${y}年${m}月${day}日（${weekdays[dow]}）`;
            dates.push({ value, label });
        }
        d.setDate(d.getDate() + 1);
    }
    return dates;
}

const consultationTypes = [
    '労務管理・社会保険手続き',
    'ライフプランニング・資産形成',
    '社会保険の仕組み・手続き相談',
    '副業・個人事業の社会保険',
    'その他',
];

const timeSlots = ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

export const Booking = () => {
    const weekends = useMemo(() => getUpcomingWeekends(12), []);
    const [form, setForm] = useState({
        name: '',
        email: '',
        date: '',
        time: '',
        type: '',
        message: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedDate = weekends.find(w => w.value === form.date);
        const subject = encodeURIComponent(
            `【オンライン相談予約】${selectedDate?.label ?? form.date} ${form.time}`
        );
        const body = encodeURIComponent(
            `お名前: ${form.name}\n` +
            `メールアドレス: ${form.email}\n` +
            `希望日: ${selectedDate?.label ?? form.date}\n` +
            `希望時間: ${form.time}\n` +
            `相談内容: ${form.type}\n\n` +
            `ご相談の概要:\n${form.message}\n\n` +
            `---\nこのメールはネット相談予約フォームから送信されました。`
        );
        window.location.href = `mailto:sharoushi24.info@gmail.com?subject=${subject}&body=${body}`;
    };

    const isValid = form.name && form.email && form.date && form.time && form.type;

    return (
        <section id="booking" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-amber-100/20 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-100/15 rounded-full blur-3xl" />

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
                        オンライン相談は<span className="font-semibold text-amber-700">土日祝の休日限定</span>で承っております。
                        Zoom・Google Meetにて全国どこからでもご相談いただけます。
                    </p>
                </motion.div>

                {/* 注意バナー */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex items-start gap-3 p-5 rounded-2xl bg-amber-50 border border-amber-200 mb-10"
                >
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center">
                        <Video className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-amber-800 font-bold text-sm mb-1">オンライン相談について</p>
                        <ul className="text-amber-700 text-xs space-y-1">
                            <li className="flex items-center gap-1.5"><Clock className="w-3 h-3 flex-shrink-0" />対応時間：土日祝 10:00〜17:00（1枠60分）</li>
                            <li className="flex items-center gap-1.5"><Calendar className="w-3 h-3 flex-shrink-0" />初回30分は無料でご相談いただけます</li>
                            <li className="flex items-center gap-1.5"><Send className="w-3 h-3 flex-shrink-0" />予約後、2営業日以内にメールにてご連絡いたします</li>
                        </ul>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="bg-white rounded-3xl border border-stone-200 shadow-[0_4px_32px_rgba(0,0,0,0.07)] p-8 lg:p-12"
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* お名前 */}
                            <div>
                                <label className="block text-stone-700 text-sm font-semibold mb-2">
                                    お名前 <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="山田 太郎"
                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 text-stone-800 text-sm transition-all"
                                />
                            </div>

                            {/* メールアドレス */}
                            <div>
                                <label className="block text-stone-700 text-sm font-semibold mb-2">
                                    メールアドレス <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="example@email.com"
                                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 text-stone-800 text-sm transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* 希望日 */}
                            <div>
                                <label className="block text-stone-700 text-sm font-semibold mb-2">
                                    希望日（土日祝） <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                                    <select
                                        name="date"
                                        value={form.date}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 text-stone-800 text-sm transition-all appearance-none bg-white"
                                    >
                                        <option value="">日付を選択してください</option>
                                        {weekends.map(w => (
                                            <option key={w.value} value={w.value}>{w.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* 希望時間 */}
                            <div>
                                <label className="block text-stone-700 text-sm font-semibold mb-2">
                                    希望時間 <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                                    <select
                                        name="time"
                                        value={form.time}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 text-stone-800 text-sm transition-all appearance-none bg-white"
                                    >
                                        <option value="">時間を選択してください</option>
                                        {timeSlots.map(t => (
                                            <option key={t} value={t}>{t}〜</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* 相談内容 */}
                        <div>
                            <label className="block text-stone-700 text-sm font-semibold mb-2">
                                相談内容 <span className="text-red-400">*</span>
                            </label>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {consultationTypes.map(type => (
                                    <label
                                        key={type}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                                            form.type === type
                                                ? 'border-amber-400 bg-amber-50 text-amber-800'
                                                : 'border-stone-200 bg-white text-stone-600 hover:border-amber-200 hover:bg-amber-50/50'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="type"
                                            value={type}
                                            checked={form.type === type}
                                            onChange={handleChange}
                                            className="accent-amber-600"
                                        />
                                        <span className="text-xs font-medium">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* 相談概要 */}
                        <div>
                            <label className="block text-stone-700 text-sm font-semibold mb-2">
                                ご相談の概要（任意）
                            </label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={4}
                                placeholder="現在の状況や相談したい内容を簡単にご記入ください"
                                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 text-stone-800 text-sm transition-all resize-none"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                            <p className="text-stone-400 text-xs">
                                送信するとメーラーが開きます。内容を確認の上、送信してください。
                            </p>
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold text-sm bg-amber-600 hover:bg-amber-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-[0_4px_20px_rgba(217,119,6,0.35)] hover:shadow-[0_6px_28px_rgba(217,119,6,0.45)] hover:-translate-y-0.5 whitespace-nowrap"
                            >
                                <Send className="w-4 h-4" />
                                予約メールを送る
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};
