import { motion } from 'framer-motion';
import { Mail, MessageSquare, Clock, ArrowRight, CheckCircle } from 'lucide-react';

const LINE_URL = 'https://linevoom.line.me/user/_dfrrE2jsqeDRRaDQW17VwcjgnjmXWjHFqyhUHqU';

const LineIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M19.365 9.863c.349 0 .63.285.631.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
    </svg>
);

export const Contact = () => {
    const items = [
        '執筆・監修のご依頼',
        '年金・社会保険に関する相談',
        'ライフプランニングのコンサルティング',
        '労務管理に関するアドバイス',
    ];

    const faq = [
        {
            q: '初回の相談は無料ですか？',
            a: '初回のご相談は30分を目安に無料で承っております。お気軽にお問い合わせください。',
        },
        {
            q: '副業・フリーランスの方でも相談できますか？',
            a: 'はい、個人事業主・副業の方を対象にした社会保険や確定申告に関するご相談も対応しています。',
        },
        {
            q: 'オンラインで相談できますか？',
            a: 'はい、Zoom・Google Meet等のオンラインビデオ通話にて全国どこからでもご相談いただけます。オンライン相談は土日祝の休日限定となっております。ネット相談予約フォームからご予約ください。',
        },
    ];

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-surface-100/60">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/25 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/15 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="section-label mb-3">07 — Contact</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-800">お問い合わせ</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-blue-600 to-transparent" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-6"
                    >
                        <p className="text-stone-600 text-lg leading-relaxed [text-wrap:pretty]">
                            橋本貴嗣社会保険労務士事務所へのご依頼・ご相談は、
                            <br className="hidden sm:block" />
                            公式LINE・メール・ネット相談予約フォームからお気軽にどうぞ。
                        </p>

                        <div className="flex items-center gap-3 text-stone-500 text-sm">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
                                <Clock className="w-4 h-4 text-blue-700" />
                            </div>
                            <span>2営業日以内に返信いたします</span>
                        </div>

                        <div className="space-y-3 pt-4">
                            {items.map(item => (
                                <div key={item} className="flex items-center gap-2 text-stone-500 text-sm">
                                    <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-4"
                    >
                        {/* CSS transitionのみ使用（Framer MotionのwhileHover不使用 → 軽量） */}
                        <a
                            href="#booking"
                            className="group flex items-center justify-between w-full px-6 py-5 rounded-2xl bg-blue-700 hover:bg-blue-800 transition-all duration-200 shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.45)] hover:-translate-y-0.5"
                        >
                            <div className="flex items-center gap-3">
                                <MessageSquare className="w-5 h-5 text-white" />
                                <div className="text-left">
                                    <p className="text-white font-bold text-sm">ネット相談を予約する</p>
                                    <p className="text-blue-200 text-xs">土日祝のオンライン相談・初回30分無料</p>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
                        </a>

                        <a
                            href={LINE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between w-full px-6 py-5 rounded-2xl bg-[#06C755] hover:bg-[#05B048] transition-all duration-200 shadow-[0_4px_20px_rgba(6,199,85,0.30)] hover:shadow-[0_8px_30px_rgba(6,199,85,0.40)] hover:-translate-y-0.5"
                        >
                            <div className="flex items-center gap-3">
                                <span className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-white">
                                    <LineIcon className="w-5 h-5" />
                                </span>
                                <div className="text-left">
                                    <p className="text-white font-bold text-sm">公式LINEで問い合わせる</p>
                                    <p className="text-emerald-50/90 text-xs">トーク履歴で気軽にやりとりできます</p>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
                        </a>

                        <a
                            href="mailto:sharoushi24.info@gmail.com"
                            className="group flex items-center justify-between w-full px-6 py-5 rounded-2xl bg-white border border-stone-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 shadow-sm hover:-translate-y-0.5"
                        >
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-stone-400 group-hover:text-blue-700 transition-colors" />
                                <div className="text-left">
                                    <p className="text-stone-800 font-semibold text-sm">メールで問い合わせる</p>
                                    <p className="text-stone-400 text-xs">sharoushi24.info@gmail.com</p>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
                        </a>

                        <p className="text-stone-400 text-xs text-center pt-2">
                            ご相談内容によってはお断りする場合もございます。ご了承ください。
                        </p>
                    </motion.div>
                </div>

                {/* FAQ セクション */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="section-label mb-6">よくあるご質問</p>
                    <div className="space-y-4">
                        {faq.map((item, index) => (
                            <motion.div
                                key={item.q}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                className="rounded-2xl border border-stone-200 bg-white p-6 hover:border-blue-200 hover:shadow-sm transition-all duration-200"
                            >
                                <p className="font-bold text-stone-800 text-sm mb-2 flex items-start gap-2">
                                    <span className="text-blue-600 font-black text-base leading-none">Q.</span>
                                    {item.q}
                                </p>
                                <p className="text-stone-500 text-sm leading-relaxed pl-5">{item.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
