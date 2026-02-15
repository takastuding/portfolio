import { motion } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Users, CheckCircle } from 'lucide-react';

export const Hero = () => {
    return (
        <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 -z-10 opacity-30">
                <div className="w-[500px] h-[500px] bg-gold-500/20 rounded-full blur-3xl filter" />
            </div>
            <div className="absolute bottom-0 left-0 -z-10 opacity-20">
                <div className="w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl filter" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-sm font-medium mb-8 backdrop-blur-sm">
                            <span className="flex h-2 w-2 rounded-full bg-gold-500 mr-2 animate-pulse"></span>
                            金融機関出身 × 社会保険労務士
                        </div>

                        <h1 className="text-4xl tracking-tight font-bold text-white sm:text-6xl md:text-7xl mb-6 leading-tight">
                            <span className="block">お金と人の</span>
                            <span className="block text-gradient">未来をデザインする</span>
                        </h1>

                        <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                            社会保険労務士、FP1級、年金アドバイザーのトリプルライセンス。<br className="hidden md:block" />
                            高度な金融知識と労務管理の専門性を融合させ、<br className="hidden md:block" />
                            あなたのビジネスとライフプランを包括的にサポートします。
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a
                                href="#contact"
                                className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-lg text-navy-950 bg-gold-500 hover:bg-gold-400 transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] hover:scale-105"
                            >
                                お問い合わせ
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="#profile"
                                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-white border-2 border-gold-500/50 hover:bg-gold-500/10 hover:border-gold-500 transition-all duration-300 backdrop-blur-sm"
                            >
                                プロフィールを見る
                            </a>
                        </div>

                        {/* Micro Stats/Features */}
                        <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-800 pt-8">
                            <div className="text-center lg:text-left group">
                                <Shield className="w-6 h-6 text-gold-500 mx-auto lg:mx-0 mb-2 group-hover:scale-110 transition-transform" />
                                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">信頼と実績</p>
                            </div>
                            <div className="text-center lg:text-left group">
                                <TrendingUp className="w-6 h-6 text-gold-500 mx-auto lg:mx-0 mb-2 group-hover:scale-110 transition-transform" />
                                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">金融のプロ</p>
                            </div>
                            <div className="text-center lg:text-left group">
                                <Users className="w-6 h-6 text-gold-500 mx-auto lg:mx-0 mb-2 group-hover:scale-110 transition-transform" />
                                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">人事の専門家</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:block lg:col-span-5 relative mt-12 lg:mt-0"
                    >
                        <div className="relative rounded-2xl overflow-hidden glass border-0 shadow-2xl transform hover:rotate-0 transition-all duration-700 hover:scale-105">
                            {/* Decorative Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-navy-900/60 to-transparent z-10"></div>

                            <div className="aspect-[4/5] w-full relative z-0">
                                <img 
                                    src="/images/hero-main.png" 
                                    alt="社会保険労務士・FP専門家のイメージ" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Floating Card Element */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -bottom-10 -left-10 glass p-4 rounded-xl z-20 max-w-xs shadow-[0_0_30px_rgba(234,179,8,0.2)]"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">Triple License</p>
                                    <p className="text-slate-400 text-xs">Certified Professional</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
