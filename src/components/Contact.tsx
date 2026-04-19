import { motion } from 'framer-motion';
import { Mail, MessageSquare, Clock, ArrowRight, CheckCircle } from 'lucide-react';

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
        <section id="contact" className="py-24 relative overflow-hidden bg-cream-100/60">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-100/25 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/15 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="section-label mb-3">05 — Contact</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-800">お問い合わせ</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-amber-500 to-transparent" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-6"
                    >
                        <p className="text-stone-600 text-lg leading-relaxed">
                            橋本貴嗣社会保険労務士事務所へのご依頼・ご相談は、CrowdWorksのメッセージ機能またはメールよりお気軽にご連絡ください。
                        </p>

                        <div className="flex items-center gap-3 text-stone-500 text-sm">
                            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                                <Clock className="w-4 h-4 text-amber-600" />
                            </div>
                            <span>2営業日以内に返信いたします</span>
                        </div>

                        <div className="space-y-3 pt-4">
                            {items.map(item => (
                                <div key={item} className="flex items-center gap-2 text-stone-500 text-sm">
                                    <CheckCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
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
                            href="#"
                            className="group flex items-center justify-between w-full px-6 py-5 rounded-2xl bg-amber-600 hover:bg-amber-700 transition-all duration-200 shadow-[0_4px_20px_rgba(217,119,6,0.35)] hover:shadow-[0_8px_30px_rgba(217,119,6,0.45)] hover:-translate-y-0.5"
                        >
                            <div className="flex items-center gap-3">
                                <MessageSquare className="w-5 h-5 text-white" />
                                <div className="text-left">
                                    <p className="text-white font-bold text-sm">CrowdWorksで相談する</p>
                                    <p className="text-amber-200 text-xs">お仕事のご依頼はこちらから</p>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-200" />
                        </a>

                        <a
                            href="mailto:sharoushi24.info@gmail.com"
                            className="group flex items-center justify-between w-full px-6 py-5 rounded-2xl bg-white border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-sm hover:-translate-y-0.5"
                        >
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-stone-400 group-hover:text-amber-600 transition-colors" />
                                <div className="text-left">
                                    <p className="text-stone-800 font-semibold text-sm">メールで問い合わせる</p>
                                    <p className="text-stone-400 text-xs">sharoushi24.info@gmail.com</p>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
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
                                className="rounded-2xl border border-stone-200 bg-white p-6 hover:border-amber-200 hover:shadow-sm transition-all duration-200"
                            >
                                <p className="font-bold text-stone-800 text-sm mb-2 flex items-start gap-2">
                                    <span className="text-amber-500 font-black text-base leading-none">Q.</span>
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
