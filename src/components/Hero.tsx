import { motion } from 'framer-motion';
import { ArrowRight, Award, TrendingUp, Users } from 'lucide-react';

export const Hero = () => {
    const floatingItems = [
        { label: '労務管理', angle: 0, delay: 0 },
        { label: '社会保険', angle: 90, delay: 0.5 },
        { label: '資産形成', angle: 180, delay: 1 },
        { label: '年金相談', angle: 270, delay: 1.5 },
    ];

    return (
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-28 pb-20 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-semibold tracking-widest uppercase mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                            社会保険労務士 / FP1級 / 年金アドバイザー
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                            <span className="block">「人」と「お金」の</span>
                            <span
                                className="block mt-1"
                                style={{
                                    background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #fde68a 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                課題を同時に解決
                            </span>
                        </h1>

                        <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
                            金融機関出身の社会保険労務士として、企業経営者・個人事業主の
                            労務管理・社会保険・資産形成を包括的にサポートします。
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-14">
                            <a
                                href="#contact"
                                className="group inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold rounded-xl text-[#050b18] bg-gold-400 hover:bg-gold-300 transition-all duration-200 shadow-[0_0_30px_rgba(251,191,36,0.25)] hover:shadow-[0_0_40px_rgba(251,191,36,0.4)]"
                            >
                                お問い合わせ
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="#profile"
                                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium rounded-xl text-slate-300 border border-white/10 hover:border-white/20 hover:bg-white/5 hover:text-white transition-all duration-200"
                            >
                                プロフィールを見る
                            </a>
                        </div>

                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/5">
                            {[
                                { icon: Award, label: '3つの資格', sub: '社労士・FP1級・年金' },
                                { icon: TrendingUp, label: '金融出身', sub: '地方銀行での実務経験' },
                                { icon: Users, label: '副業対応', sub: '執筆・監修・相談' },
                            ].map(({ icon: Icon, label, sub }) => (
                                <div key={label} className="group">
                                    <Icon className="w-5 h-5 text-gold-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <p className="text-white text-sm font-semibold">{label}</p>
                                    <p className="text-slate-500 text-xs mt-0.5">{sub}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Abstract Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
                        className="hidden lg:flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-md aspect-square">
                            <div className="absolute inset-0 rounded-full border border-gold-500/10" />
                            <div className="absolute inset-4 rounded-full border border-gold-500/[0.08]" />
                            <div className="absolute inset-8 rounded-full border border-gold-500/[0.06]" />

                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-0 rounded-full border border-dashed border-gold-500/15"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-12 rounded-full border border-dashed border-gold-500/10"
                            />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="glass rounded-2xl p-8 text-center w-52 shadow-2xl border border-gold-500/15">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                                        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="#050b18" strokeWidth="2.5">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-white font-bold text-sm mb-1">Triple License</p>
                                    <p className="text-slate-400 text-xs">Certified Professional</p>
                                    <div className="mt-4 flex justify-center gap-1.5">
                                        {['社労士', 'FP1', '年金'].map((t) => (
                                            <span key={t} className="px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-400 text-[10px] font-medium border border-gold-500/20">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {floatingItems.map(({ label, angle, delay }) => {
                                const rad = (angle - 90) * (Math.PI / 180);
                                const r = 46;
                                const x = 50 + r * Math.cos(rad);
                                const y = 50 + r * Math.sin(rad);
                                return (
                                    <motion.div
                                        key={label}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: 0.6 + delay * 0.15 }}
                                        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                                        className="absolute"
                                    >
                                        <motion.div
                                            animate={{ y: [0, -4, 0] }}
                                            transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' }}
                                            className="px-3 py-1.5 rounded-lg glass border border-gold-500/20 text-gold-300 text-xs font-medium whitespace-nowrap shadow-lg"
                                        >
                                            {label}
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-slate-600 text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-px h-8 bg-gradient-to-b from-gold-500/40 to-transparent"
                />
            </motion.div>
        </section>
    );
};
