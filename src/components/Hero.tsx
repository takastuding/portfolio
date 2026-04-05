import { motion } from 'framer-motion';
import { ArrowRight, Award, TrendingUp, Users } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const title1 = '「人」と「お金」の';
const title2 = '課題を同時に解決';

export const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }
        };
        const section = sectionRef.current;
        section?.addEventListener('mousemove', handleMouseMove);
        return () => section?.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const floatingItems = [
        { label: '労務管理', angle: 0, delay: 0 },
        { label: '社会保険', angle: 90, delay: 0.5 },
        { label: '資産形成', angle: 180, delay: 1 },
        { label: '年金相談', angle: 270, delay: 1.5 },
    ];

    const chars1 = title1.split('');
    const chars2 = title2.split('');

    return (
        <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center overflow-hidden">
            {/* Cursor spotlight */}
            <div
                className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(251,191,36,0.10), transparent 40%)`,
                }}
            />

            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(217,119,6,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(217,119,6,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl pointer-events-none" />

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
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold tracking-widest uppercase mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            社会保険労務士 / FP1級 / 年金アドバイザー
                        </motion.div>

                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-800 leading-[1.2] tracking-tight mb-6">
                            <span className="block overflow-hidden">
                                {chars1.map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 + i * 0.045, ease: 'easeOut' }}
                                        className="inline-block"
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </motion.span>
                                ))}
                            </span>
                            <span className="block mt-1 overflow-hidden">
                                {chars2.map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.55 + i * 0.045, ease: 'easeOut' }}
                                        className="inline-block text-gradient"
                                    >
                                        {char === ' ' ? '\u00A0' : char}
                                    </motion.span>
                                ))}
                            </span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1, duration: 0.6 }}
                            className="text-lg text-stone-500 leading-relaxed mb-10 max-w-lg"
                        >
                            大手損害保険会社出身の社会保険労務士として、企業経営者・個人事業主の
                            労務管理・社会保険・資産形成を包括的にサポートします。
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 mb-14"
                        >
                            <a
                                href="#contact"
                                className="group inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold rounded-xl text-white bg-amber-600 hover:bg-amber-700 transition-all duration-200 shadow-[0_4px_20px_rgba(217,119,6,0.35)] hover:shadow-[0_6px_30px_rgba(217,119,6,0.5)] hover:-translate-y-0.5"
                            >
                                お問い合わせ
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="#profile"
                                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium rounded-xl text-stone-600 border border-stone-300 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 transition-all duration-200"
                            >
                                プロフィールを見る
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.4, duration: 0.5 }}
                            className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200"
                        >
                            {[
                                { icon: Award, label: '3つの資格', sub: '社労士・FP1級・年金' },
                                { icon: TrendingUp, label: '保険業界出身', sub: '大手損害保険会社での実務経験' },
                                { icon: Users, label: '副業対応', sub: '執筆・監修・相談' },
                            ].map(({ icon: Icon, label, sub }) => (
                                <div key={label} className="group">
                                    <Icon className="w-5 h-5 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
                                    <p className="text-stone-800 text-sm font-semibold">{label}</p>
                                    <p className="text-stone-400 text-xs mt-0.5">{sub}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right: Abstract Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
                        className="hidden lg:flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-md aspect-square">
                            <div className="absolute inset-0 rounded-full border border-amber-300/30" />
                            <div className="absolute inset-4 rounded-full border border-amber-300/20" />
                            <div className="absolute inset-8 rounded-full border border-amber-300/15" />

                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-0 rounded-full border border-dashed border-amber-400/25"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-12 rounded-full border border-dashed border-amber-400/20"
                            />

                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="rounded-2xl p-8 text-center w-52 shadow-[0_8px_40px_rgba(0,0,0,0.10),0_0_0_1px_rgba(217,119,6,0.12)] border border-amber-100 bg-white">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-4 shadow-[0_4px_16px_rgba(217,119,6,0.35)]">
                                        <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7" stroke="white" strokeWidth="2.5">
                                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-stone-800 font-bold text-sm mb-1">Triple License</p>
                                    <p className="text-stone-400 text-xs">Certified Professional</p>
                                    <div className="mt-4 flex justify-center gap-1.5">
                                        {['社労士', 'FP1', '年金'].map((t) => (
                                            <span key={t} className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-medium border border-amber-200">{t}</span>
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
                                            className="px-3 py-1.5 rounded-lg bg-white border border-amber-200 text-amber-700 text-xs font-semibold whitespace-nowrap shadow-md"
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
                transition={{ delay: 1.6 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-stone-400 text-xs tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-px h-8 bg-gradient-to-b from-amber-500/50 to-transparent"
                />
            </motion.div>
        </section>
    );
};
