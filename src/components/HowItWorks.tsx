import { motion } from 'framer-motion';
import { CalendarCheck, PencilLine, Mailbox, Video, Banknote, XCircle } from 'lucide-react';

const steps = [
    {
        num: '01',
        icon: CalendarCheck,
        title: '日時を選ぶ',
        desc: '予約カレンダーから空いている時間枠をクリック。土日祝の10:00〜16:00から1時間単位でお選びいただけます。',
    },
    {
        num: '02',
        icon: PencilLine,
        title: 'フォームを送信',
        desc: 'お名前・メールアドレス・ご相談内容を入力。事前にお伺いした内容をもとに、当日の進行を組み立てます。',
    },
    {
        num: '03',
        icon: Mailbox,
        title: '確認メールを受信',
        desc: '送信後すぐに予約受付メールが自動送信されます。個別のご返信やZoom URL送付は土日中に行います。',
    },
    {
        num: '04',
        icon: Video,
        title: 'オンラインで面談',
        desc: '当日はZoomまたはGoogle Meetで相談スタート。顔を合わせての対話を大切にした60分間です。',
    },
];

export const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(217,119,6,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(217,119,6,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
            <div className="absolute top-1/3 right-0 w-80 h-80 bg-amber-100/25 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-14"
                >
                    <p className="section-label mb-3">04 — How it works</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-800">ネット相談の流れ</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-amber-500 to-transparent" />
                    <p className="mt-4 text-stone-500 max-w-xl">
                        初めての方でもスムーズにご相談いただけるよう、予約から面談までの4ステップをご用意しています。
                    </p>
                </motion.div>

                <div className="relative">
                    <div className="hidden lg:block absolute top-12 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {steps.map((step, i) => (
                            <motion.div
                                key={step.num}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="relative bg-white rounded-2xl border border-stone-200 shadow-sm p-6 hover:border-amber-300 hover:shadow-[0_8px_30px_rgba(217,119,6,0.1)] transition-all duration-300 group"
                            >
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 rounded-full bg-white border-4 border-amber-200 flex items-center justify-center mb-4 shadow-sm group-hover:border-amber-400 group-hover:scale-105 transition-all duration-300">
                                        <step.icon className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <p className="font-display text-xs tracking-[0.2em] text-amber-700 font-bold mb-2">STEP {step.num}</p>
                                    <h3 className="text-stone-800 font-bold text-base mb-2">{step.title}</h3>
                                    <p className="text-stone-500 text-xs leading-relaxed">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 grid sm:grid-cols-2 gap-4"
                >
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-amber-50 border border-amber-200">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <Banknote className="w-5 h-5 text-amber-700" />
                        </div>
                        <div>
                            <p className="text-amber-900 font-bold text-sm mb-1">料金について</p>
                            <p className="text-amber-700/80 text-xs leading-relaxed">
                                初回30分は<span className="font-bold">無料</span>。継続相談は1時間 ¥5,500（税込）を予定。
                                ※お見積りはご相談後に改めてご案内します。
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-stone-50 border border-stone-200">
                        <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center flex-shrink-0">
                            <XCircle className="w-5 h-5 text-stone-500" />
                        </div>
                        <div>
                            <p className="text-stone-800 font-bold text-sm mb-1">キャンセルポリシー</p>
                            <p className="text-stone-500 text-xs leading-relaxed">
                                前日までのご連絡で<span className="font-bold">無料</span>でキャンセル可能です。
                                やむを得ず当日キャンセルが発生した場合も柔軟に対応いたします。
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
