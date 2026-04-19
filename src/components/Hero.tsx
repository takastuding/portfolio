import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Shield, FileText, MessageSquare } from 'lucide-react';
import { useRef, useEffect } from 'react';

export const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (sectionRef.current && spotlightRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                spotlightRef.current.style.background =
                    `radial-gradient(600px circle at ${x}px ${y}px, rgba(251,191,36,0.08), transparent 40%)`;
            }
        };
        const section = sectionRef.current;
        section?.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => section?.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center overflow-hidden">
            <div ref={spotlightRef} className="pointer-events-none absolute inset-0 z-10" />

            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=60"
                    alt=""
                    className="w-full h-full object-cover object-center opacity-[0.04]"
                    loading="eager"
                />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(217,119,6,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(217,119,6,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-28 pb-20 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* 左：テキスト */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.45, delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900 text-amber-400 text-xs font-bold tracking-widest uppercase mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            土日・祝日 専門相談
                        </motion.div>

                        {/* CSS line reveal — Framer Motion の個別文字アニメを廃止、GPU描画のみ */}
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-800 leading-[1.2] tracking-tight mb-6">
                            <span className="block overflow-hidden">
                                <span className="block line-reveal" style={{ animationDelay: '0.3s' }}>
                                    「人」と「お金」の
                                </span>
                            </span>
                            <span className="block mt-1 overflow-hidden">
                                <span className="block line-reveal text-gradient" style={{ animationDelay: '0.55s' }}>
                                    課題を同時に解決
                                </span>
                            </span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                            className="text-lg text-stone-500 leading-relaxed mb-10 max-w-lg"
                        >
                            現役損保社員・社会保険労務士として、<br className="hidden sm:block" />
                            制度の"リアル"を現場の言葉でお伝えします。
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0, duration: 0.5 }}
                            className="flex flex-col sm:flex-row gap-3 mb-14"
                        >
                            <a
                                href="#booking"
                                className="group inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold rounded-xl text-white bg-amber-600 hover:bg-amber-700 transition-all duration-200 shadow-[0_4px_20px_rgba(217,119,6,0.35)] hover:shadow-[0_6px_30px_rgba(217,119,6,0.5)] hover:-translate-y-0.5"
                            >
                                ネット相談予約（土日限定）
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
                            transition={{ delay: 1.1, duration: 0.5 }}
                            className="grid grid-cols-2 gap-4 pt-8 border-t border-stone-200"
                        >
                            {[
                                { icon: Shield, label: '2つの国家資格', sub: '社労士・FP技能士1級' },
                                { icon: Calendar, label: '土日祝 専門対応', sub: '週末に集中して対応' },
                                { icon: FileText, label: '保険業界 5年+', sub: '大手損保会社 在籍中' },
                                { icon: MessageSquare, label: 'オンライン全国対応', sub: 'Zoom / Google Meet' },
                            ].map(({ icon: Icon, label, sub }) => (
                                <div key={label} className="group flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-amber-100 transition-colors">
                                        <Icon className="w-4 h-4 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-stone-800 text-sm font-semibold">{label}</p>
                                        <p className="text-stone-400 text-xs mt-0.5">{sub}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* 右：エディトリアルレイアウト（AI感のある軌道アニメを廃止） */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                        className="hidden lg:flex flex-col gap-4"
                    >
                        {/* Weekend specialist card */}
                        <div className="rounded-2xl p-7 bg-stone-900 text-white">
                            <p className="text-amber-400 text-[10px] font-bold tracking-[0.25em] uppercase mb-4">Weekend Specialist</p>
                            <p className="font-display text-2xl font-bold leading-snug mb-3">
                                平日は損保の最前線。<br />
                                週末は、あなたの相談窓口。
                            </p>
                            <p className="text-stone-400 text-sm leading-relaxed">
                                現役社員だからこそ知る制度の実態を、
                                そのままアドバイスに活かします。
                            </p>
                            <div className="mt-5 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                <span className="text-amber-400/80 text-xs">土曜・日曜・祝日のみ受付</span>
                            </div>
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-2xl p-5 bg-amber-50 border border-amber-100">
                                <p className="font-display text-4xl font-black text-amber-600 leading-none">5+</p>
                                <p className="text-stone-700 text-sm font-bold mt-2">年の実務経験</p>
                                <p className="text-stone-400 text-xs mt-0.5">損害保険業界</p>
                            </div>
                            <div className="rounded-2xl p-5 bg-white border border-stone-200 shadow-sm">
                                <p className="font-display text-4xl font-black text-stone-700 leading-none">100+</p>
                                <p className="text-stone-700 text-sm font-bold mt-2">相談実績</p>
                                <p className="text-stone-400 text-xs mt-0.5">労務・年金・FP</p>
                            </div>
                        </div>

                        {/* Quote */}
                        <div className="rounded-2xl px-6 py-5 border-l-4 border-amber-500 bg-amber-50/60">
                            <p className="text-amber-900 text-sm font-medium leading-relaxed">
                                「分かりにくい制度を、現場の言葉で。」<br />
                                <span className="text-amber-700/70 text-xs mt-1 block">— 橋本貴嗣</span>
                            </p>
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
                <div
                    className="w-px h-8 bg-gradient-to-b from-amber-500/50 to-transparent"
                    style={{ animation: 'floatY 1.5s ease-in-out infinite', willChange: 'transform' }}
                />
            </motion.div>
        </section>
    );
};
