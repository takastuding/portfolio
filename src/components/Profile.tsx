import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const Profile = () => {
    const qualifications = [
        '社会保険労務士',
        '1級ファイナンシャル・プランニング技能士',
        '年金アドバイザー',
    ];

    return (
        <section id="profile" className="py-20 bg-navy-950 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:text-center mb-16"
                >
                    <h2 className="text-base text-gold-500 font-semibold tracking-wide uppercase">Profile</h2>
                    <p className="mt-2 text-3xl leading-8 font-bold text-white sm:text-4xl">
                        プロフィール・保有資格
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-slate-300 lg:mx-auto">
                        金融機関での豊富な実務経験と、社会保険労務士としての専門知識を融合させ、
                        企業のお金の悩みと人の悩みを同時に解決へ導きます。
                    </p>
                </motion.div>

                <div className="glass rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">

                        {/* Profile Image */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex-shrink-0"
                        >
                            <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(234,179,8,0.2)] border-2 border-gold-500/30">
                                <img 
                                    src="/images/profile-professional.png" 
                                    alt="プロフェッショナルプロフィール" 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent"></div>
                            </div>
                        </motion.div>

                        <div className="flex-1 space-y-8">
                            {/* Qualifications */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            >
                                <h3 className="text-2xl font-bold text-white border-l-4 border-gold-500 pl-4 mb-6">保有資格</h3>
                                <ul className="space-y-4">
                                    {qualifications.map((qual, index) => (
                                        <motion.li 
                                            key={qual} 
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                                            className="flex items-center bg-white/5 p-4 rounded-lg border border-white/5 hover:bg-white/10 hover:border-gold-500/30 transition-all duration-300 group"
                                        >
                                            <CheckCircle2 className="flex-shrink-0 h-6 w-6 text-gold-500 group-hover:scale-110 transition-transform" />
                                            <span className="ml-3 text-lg font-medium text-slate-200">{qual}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Biography */}
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="text-slate-300 leading-relaxed text-lg space-y-6"
                            >
                                <p>
                                    大学卒業後、地方銀行に入行。法人融資、資産運用相談業務に従事する中で、
                                    中小企業の経営者が抱える「人」と「お金」の課題に直面し、
                                    より専門的なサポートを行うために社会保険労務士資格を取得。
                                </p>
                                <p>
                                    現在は金融機関に勤務しながら、副業として執筆活動や監修、個別相談などを行っています。
                                    <span className="text-gold-400 font-bold">「分かりにくい制度を分かりやすく」</span>をモットーに、専門用語を使わない丁寧な説明を心がけています。
                                </p>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
