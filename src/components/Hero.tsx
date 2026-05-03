import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Shield, FileText, MessageSquare } from 'lucide-react';

export const Hero = () => {
    return (
        <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-28 pb-20 w-full">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* 左：テキスト */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.45, delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-900 text-blue-300 text-xs font-bold tracking-widest uppercase mb-8"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse" />
                            土日・祝日 専門相談
                        </motion.div>

                        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-navy-900 leading-[1.2] tracking-tight mb-6">
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
                                className="group inline-flex items-center justify-center px-7 py-3.5 text-sm font-bold rounded-xl text-white bg-blue-700 hover:bg-blue-800 transition-all duration-200 shadow-[0_4px_20px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_30px_rgba(37,99,235,0.5)] hover:-translate-y-0.5"
                            >
                                ネット相談予約（土日限定）
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="#profile"
                                className="inline-flex items-center justify-center px-7 py-3.5 text-sm font-medium rounded-xl text-stone-600 border border-stone-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-800 transition-all duration-200"
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
                                    <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-blue-100 transition-colors">
                                        <Icon className="w-4 h-4 text-blue-700" />
                                    </div>
                                    <div>
                                        <p className="text-stone-800 text-sm font-semibold">{label}</p>
                                        <p className="text-stone-400 text-xs mt-0.5">{sub}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* 右：成長グラフを指し示すビジネスマン + フローティングバッジ（コーポレート系） */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
                        className="hidden lg:block relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-blue-100/60">
                            <img
                                src="/hero.jpg"
                                alt="人と企業の成長をサポートする社労士"
                                className="w-full h-[520px] object-cover object-center"
                                loading="eager"
                            />
                            {/* 下部から navy をぼかしてフローティングカードの可読性を確保 */}
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/55 via-navy-900/10 to-transparent" />
                            {/* 左上を青で軽く沈めてヘッダーとの境界を整える */}
                            <div className="absolute inset-0 bg-gradient-to-br from-navy-900/25 via-transparent to-transparent" />
                        </div>

                        <div className="absolute -bottom-8 -left-6 bg-white rounded-2xl shadow-lg pl-3 pr-5 py-3 border border-blue-100 flex items-center gap-3">
                            <div className="relative w-14 h-14 rounded-xl overflow-hidden ring-2 ring-blue-200 ring-offset-2 ring-offset-white flex-shrink-0">
                                <img
                                    src="/profile.png"
                                    alt="橋本貴嗣 プロフィール"
                                    className="w-full h-full object-cover"
                                    loading="eager"
                                />
                            </div>
                            <div className="leading-tight">
                                <p className="text-blue-700 text-[10px] font-bold tracking-[0.25em] uppercase">Trusted Partner</p>
                                <p className="text-navy-900 font-bold text-sm mt-0.5">橋本 貴嗣</p>
                                <p className="text-stone-500 text-[11px] mt-0.5">社労士 × FP技能士1級</p>
                            </div>
                        </div>

                        <div className="absolute -top-4 right-4 bg-navy-900 text-white rounded-xl px-5 py-3 shadow-lg">
                            <p className="text-blue-300 text-[10px] font-bold tracking-widest uppercase">Weekend Office</p>
                            <p className="text-white font-bold text-sm mt-0.5">10:00 – 17:00</p>
                            <div className="mt-1.5 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse" />
                                <span className="text-blue-200 text-[10px]">全国オンライン対応</span>
                            </div>
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
                    className="w-px h-8 bg-gradient-to-b from-blue-600/50 to-transparent"
                    style={{ animation: 'floatY 1.5s ease-in-out infinite', willChange: 'transform' }}
                />
            </motion.div>
        </section>
    );
};
