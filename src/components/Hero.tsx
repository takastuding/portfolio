import { motion } from 'framer-motion';
import { ArrowRight, Award, TrendingUp, Users } from 'lucide-react';
import { useRef, useEffect } from 'react';

const title1 = '「人」と「お金」の';
const title2 = '課題を同時に解決';

// variants方式：Framer Motionが内部でバッチ処理 → 個別transition指定より大幅に軽量
const lineVariants = {
    hidden: {},
    visible: (delayChildren: number) => ({
        transition: { staggerChildren: 0.04, delayChildren },
    }),
};
const charVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: [0.215, 0.61, 0.355, 1] as const },
    },
};

export const Hero = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);

    // useRefで直接DOM操作 → Reactの再レンダリングを完全回避
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (sectionRef.current && spotlightRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                spotlightRef.current.style.background =
                    `radial-gradient(600px circle at ${x}px ${y}px, rgba(251,191,36,0.10), transparent 40%)`;
            }
        };
        const section = sectionRef.current;
        section?.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => section?.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const floatingItems = [
        { label: '労務管理', angle: 0, delay: 0 },
        { label: '社会保険', angle: 90, delay: 0.8 },
        { label: '資産形成', angle: 180, delay: 1.6 },
        { label: '年金相談', angle: 270, delay: 2.4 },
    ];

    return (
        <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center overflow-hidden">
            {/* カーソルスポットライト（再レンダリングなし） */}
            <div ref={spotlightRef} className="pointer-events-none absolute inset-0 z-10" />

            {/* Unsplash 背景画像 */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=60"
                    alt=""
                    className="w-full h-full object-cover object-center opacity-[0.05]"
                    loading="eager"
                />
            </div>

            {/* グリッド背景 */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(217,119,6,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(217,119,6,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-28 pb-20 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* 左：テキスト */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold tracking-widest uppercase mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            橋本社会保険労務士事務所 / FP1級 / 年金アドバイザー
                        </motion.div>

                        {/* テキストアニメーション：variantsでバッチ処理 */}
                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-800 leading-[1.2] tracking-tight mb-6">
                            <motion.span
                                custom={0.3}
                                variants={lineVariants}
                                initial="hidden"
                                animate="visible"
                                className="block overflow-hidden"
                            >
                                {title1.split('').map((char, i) => (
                                    <motion.span key={i} variants={charVariants} className="inline-block">
                                        {char}
                                    </motion.span>
                                ))}
                            </motion.span>
                            <motion.span
                                custom={0.7}
                                variants={lineVariants}
                                initial="hidden"
                                animate="visible"
                                className="block mt-1 overflow-hidden"
                            >
                                {title2.split('').map((char, i) => (
                                    <motion.span key={i} variants={charVariants} className="inline-block text-gradient">
                                        {char}
                                    </motion.span>
                                ))}
                            </motion.span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                            className="text-lg text-stone-500 leading-relaxed mb-10 max-w-lg"
                        >
                            大手損害保険会社出身の社会保険労務士として、企業経営者・個人事業主の
                            労務管理・社会保険・資産形成を包括的にサポートします。
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3, duration: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 mb-14"
                        >
                            <a
                                href="#contact"
                                className="group inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold rounded-xl text-white bg-amber-600 hover:bg-amber-700 transition-all duration-200 shadow-[0_4px_20px_rgba(217,119,6,0.35)] hover:shadow-[0_6px_30px_rgba(217,119,6,0.5)] hover:-translate-y-0.5"
                            >
                                無料相談はこちら
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
                            transition={{ delay: 1.5, duration: 0.5 }}
                            className="grid grid-cols-3 gap-6 pt-8 border-t border-stone-200"
                        >
                            {[
                                { icon: Award, label: '3つの資格', sub: '社労士・FP1級・年金2級' },
                                { icon: TrendingUp, label: '保険業界出身', sub: '大手損害保険会社勤務' },
                                { icon: Users, label: '副業対応', sub: '執筆・監修・個別相談' },
                            ].map(({ icon: Icon, label, sub }) => (
                                <div key={label} className="group">
                                    <Icon className="w-5 h-5 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
                                    <p className="text-stone-800 text-sm font-semibold">{label}</p>
                                    <p className="text-stone-400 text-xs mt-0.5">{sub}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* 右：ビジュアル（CSS animationでGPUアクセラレーション） */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                        className="hidden lg:flex items-center justify-center"
                    >
                        <div className="relative w-full max-w-md aspect-square">
                            {/* 静的な同心円 */}
                            <div className="absolute inset-0 rounded-full border border-amber-300/30" />
                            <div className="absolute inset-4 rounded-full border border-amber-300/20" />
                            <div className="absolute inset-8 rounded-full border border-amber-300/15" />

                            {/* CSS animationで回転（JSを使わないのでメインスレッド負荷ゼロ） */}
                            <div className="animate-spin-cw-slow absolute inset-0 rounded-full border border-dashed border-amber-400/25" />
                            <div className="animate-spin-ccw-slow absolute inset-12 rounded-full border border-dashed border-amber-400/20" />

                            {/* 中央カード */}
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

                            {/* フローティングバッジ（CSS animationで軽量） */}
                            {floatingItems.map(({ label, angle, delay }) => {
                                const rad = (angle - 90) * (Math.PI / 180);
                                const r = 46;
                                const x = 50 + r * Math.cos(rad);
                                const y = 50 + r * Math.sin(rad);
                                return (
                                    <div
                                        key={label}
                                        style={{
                                            left: `${x}%`,
                                            top: `${y}%`,
                                            position: 'absolute',
                                            transform: 'translate(-50%, -50%)',
                                            animation: `fadeInScale 0.4s ease ${delay}s both`,
                                        }}
                                    >
                                        <div
                                            className="px-3 py-1.5 rounded-lg bg-white border border-amber-200 text-amber-700 text-xs font-semibold whitespace-nowrap shadow-md"
                                            style={{
                                                animation: `floatY ${3 + delay * 0.5}s ease-in-out ${delay * 0.3}s infinite`,
                                            }}
                                        >
                                            {label}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <span className="text-stone-400 text-xs tracking-widest uppercase">Scroll</span>
                <div className="w-px h-8 bg-gradient-to-b from-amber-500/50 to-transparent"
                    style={{ animation: 'floatY 1.5s ease-in-out infinite' }} />
            </motion.div>
        </section>
    );
};
