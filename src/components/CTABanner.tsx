import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CTABanner = () => {
    return (
        <section className="relative py-20 sm:py-24 overflow-hidden bg-navy-900">
            {/* 背景：ドットパターン + 微発光 */}
            <div
                className="absolute inset-0 opacity-[0.18]"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.45) 1px, transparent 0)',
                    backgroundSize: '24px 24px',
                }}
                aria-hidden="true"
            />
            <div className="absolute -top-24 left-1/4 w-[480px] h-[280px] bg-blue-500/15 rounded-full blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-32 right-1/4 w-[420px] h-[260px] bg-blue-400/10 rounded-full blur-3xl" aria-hidden="true" />

            <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 mb-7"
                >
                    <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                    <span className="text-blue-200 text-[11px] font-bold tracking-[0.2em] uppercase">
                        First 30 min — Free
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.05 }}
                    className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.25] tracking-tight"
                >
                    まずはお気軽に、<br className="sm:hidden" />
                    ご相談ください
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6 text-blue-100/80 text-base sm:text-lg leading-relaxed max-w-xl mx-auto [text-wrap:pretty]"
                >
                    初回60分は無料。
                    <br className="hidden sm:block" />
                    土日祝のオンライン相談で、全国どこからでもご利用いただけます。
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center"
                >
                    <a
                        href="#booking"
                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-navy-900 font-bold text-sm hover:bg-blue-50 transition-all duration-200 shadow-[0_10px_40px_rgba(255,255,255,0.18)] hover:shadow-[0_14px_50px_rgba(255,255,255,0.28)] hover:-translate-y-0.5"
                    >
                        相談予約はこちら
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                        href="#contact"
                        className="inline-flex items-center justify-center px-7 py-4 rounded-2xl border border-white/25 text-white font-medium text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                    >
                        メールで問い合わせる
                    </a>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-8 text-blue-300/60 text-xs tracking-wide"
                >
                    Zoom / Google Meet 対応 ・ 守秘義務厳守
                </motion.p>
            </div>
        </section>
    );
};
