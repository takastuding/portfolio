import { motion } from 'framer-motion';
import { Mail, MessageSquare, Clock, ArrowRight } from 'lucide-react';

export const Contact = () => {
    return (
        <section id="contact" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(10,22,40,0.8) 100%)' }} />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="section-label mb-3">Contact</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">お問い合わせ</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-gold-400 to-transparent" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-6"
                    >
                        <p className="text-slate-300 text-lg leading-relaxed">
                            お仕事のご依頼・ご相談は、CrowdWorksのメッセージ機能またはメールよりお気軽にご連絡ください。
                        </p>

                        <div className="flex items-center gap-3 text-slate-400 text-sm">
                            <div className="w-8 h-8 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                                <Clock className="w-4 h-4 text-gold-400" />
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
                                <div key={item} className="flex items-center gap-2 text-slate-400 text-sm">
                                    <ArrowRight className="w-3 h-3 text-gold-400 flex-shrink-0" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Buttons */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <a
                            href="#"
                            className="group flex items-center justify-between w-full px-6 py-5 rounded-2xl bg-gold-400 hover:bg-gold-300 transition-all duration-200 shadow-[0_0_30px_rgba(251,191,36,0.2)] hover:shadow-[0_0_40px_rgba(251,191,36,0.35)]"
                        >
                            <div className="flex items-center gap-3">
                                <MessageSquare className="w-5 h-5 text-[#050b18]" />
                                <div className="text-left">
                                    <p className="text-[#050b18] font-bold text-sm">CrowdWorksで相談する</p>
                                    <p className="text-[#050b18]/60 text-xs">お仕事のご依頼はこちらから</p>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#050b18] group-hover:translate-x-1 transition-transform" />
                        </a>

                        <a
                            href="mailto:contact@example.com"
                            className="group flex items-center justify-between w-full px-6 py-5 rounded-2xl glass border border-white/10 hover:border-gold-500/30 hover:bg-white/5 transition-all duration-200"
                        >
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-slate-400 group-hover:text-gold-400 transition-colors" />
                                <div className="text-left">
                                    <p className="text-white font-semibold text-sm">メールで問い合わせる</p>
                                    <p className="text-slate-500 text-xs">contact@example.com</p>
                                </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                        </a>

                        <p className="text-slate-600 text-xs text-center pt-2">
                            ご相談内容によってはお断りする場合もございます。ご了承ください。
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
