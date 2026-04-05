import { motion } from 'framer-motion';
import { Mail, MessageSquare, Clock, ArrowRight } from 'lucide-react';

export const Contact = () => {
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
                    <p className="section-label mb-3">04 — Contact</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-800">お問い合わせ</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-amber-500 to-transparent" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-6"
                    >
                        <p className="text-stone-600 text-lg leading-relaxed">
                            橋本社会保険労務士事務所へのご依頼・ご相談は、CrowdWorksのメッセージ機能またはメールよりお気軽にご連絡ください。
                        </p>

                        <div className="flex items-center gap-3 text-stone-500 text-sm">
                            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
                                <Clock className="w-4 h-4 text-amber-600" />
                            </div>
                            <span>2営業日以内に返信いたします</span>
                        </div>

                        <div className="space-y-3 pt-4">
                            {[
                                '執筆・監修のご依頼',
                                '年金・社会保険に関する相談',
                                'ライフプランニングのコンサルティング',
                                '労務管理に関するアドバイス',
                            ].map(item => (
                                <div key={item} className="flex items-center gap-2 text-stone-500 text-sm">
                                    <ArrowRight className="w-3 h-3 text-amber-500 flex-shrink-0" />
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
                        <motion.a
                            href="#"
                            whileHover={{ y: -3, scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="group flex items-center justify-between w-full px-6 py-5 rounded-2xl bg-amber-600 hover:bg-amber-700 transition-all duration-200 shadow-[0_4px_20px_rgba(217,119,6,0.35)] hover:shadow-[0_8px_30px_rgba(217,119,6,0.45)]"
                        >
                            <div className="flex items-center gap-3">
                                <MessageSquare className="w-5 h-5 text-white" />
                                <div className="text-left">
                                    <p className="text-white font-bold text-sm">CrowdWorksで相談する</p>
                                    <p className="text-amber-200 text-xs">お仕事のご依頼はこちらから</p>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                        </motion.a>

                        <motion.a
                            href="mailto:contact@example.com"
                            whileHover={{ y: -3, scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="group flex items-center justify-between w-full px-6 py-5 rounded-2xl bg-white border border-stone-200 hover:border-amber-300 hover:shadow-md transition-all duration-200 shadow-sm"
                        >
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-stone-400 group-hover:text-amber-600 transition-colors" />
                                <div className="text-left">
                                    <p className="text-stone-800 font-semibold text-sm">メールで問い合わせる</p>
                                    <p className="text-stone-400 text-xs">contact@example.com</p>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                        </motion.a>

                        <p className="text-stone-400 text-xs text-center pt-2">
                            ご相談内容によってはお断りする場合もございます。ご了承ください。
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
