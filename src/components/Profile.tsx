import { motion } from 'framer-motion';
import { CheckCircle2, Building2, BookOpen, Award } from 'lucide-react';

export const Profile = () => {
    const qualifications = [
        { label: '社会保険労務士', desc: '労務管理・社会保険手続きの専門家' },
        { label: 'FP技能士1級', desc: '最上位の国家資格ファイナンシャルプランナー' },
        { label: '年金アドバイザー2級', desc: '年金制度の専門的アドバイザー' },
    ];

    const career = [
        { icon: Building2, year: '大学卒業後', title: '地方銀行 入行', desc: '法人融資・資産運用相談業務に従事' },
        { icon: Award, year: '在職中', title: '社会保険労務士 資格取得', desc: '中小企業の「人」と「お金」の課題解決を目指して' },
        { icon: BookOpen, year: '現在', title: '副業として活動中', desc: '執筆・監修・個別相談など幅広く対応' },
    ];

    return (
        <section id="profile" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/4 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="section-label mb-3">Profile</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">プロフィール・保有資格</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-gold-400 to-transparent" />
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        <div className="glass rounded-2xl p-8 text-center border border-gold-500/10">
                            <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold-400/20 to-gold-600/10 border border-gold-500/20 flex items-center justify-center">
                                <svg viewBox="0 0 80 80" fill="none" className="w-16 h-16" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="40" cy="28" r="14" fill="#fbbf24" fillOpacity="0.15" stroke="#fbbf24" strokeWidth="1.5" />
                                    <circle cx="40" cy="26" r="9" fill="#fbbf24" fillOpacity="0.3" />
                                    <path d="M18 64c0-12.15 9.85-22 22-22h0c12.15 0 22 9.85 22 22" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                                </svg>
                            </div>
                            <h3 className="text-white font-bold text-lg mb-1">社労士・FP専門家</h3>
                            <p className="text-slate-400 text-sm mb-4">金融機関勤務 / 副業フリーランス</p>
                            <div className="flex flex-wrap justify-center gap-2">
                                {['社労士', 'FP1級', '年金2級'].map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full bg-gold-500/10 text-gold-400 text-xs font-medium border border-gold-500/20">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-gold-400/80 text-xs font-semibold uppercase tracking-wider mb-4">保有資格</p>
                            {qualifications.map((qual, index) => (
                                <motion.div
                                    key={qual.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                                    className="flex items-start gap-3 p-4 rounded-xl glass-card border border-white/5 group"
                                >
                                    <CheckCircle2 className="flex-shrink-0 w-5 h-5 text-gold-400 mt-0.5 group-hover:scale-110 transition-transform" />
                                    <div>
                                        <p className="text-white font-semibold text-sm">{qual.label}</p>
                                        <p className="text-slate-500 text-xs mt-0.5">{qual.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-3 space-y-8"
                    >
                        <div className="glass rounded-2xl p-8 border border-white/5">
                            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                                <span className="w-1 h-5 rounded-full bg-gold-400 inline-block" />
                                自己紹介
                            </h3>
                            <div className="space-y-4 text-slate-300 leading-relaxed">
                                <p>
                                    大学卒業後、地方銀行に入行。法人融資、資産運用相談業務に従事する中で、
                                    中小企業の経営者が抱える「人」と「お金」の課題に直面し、
                                    より専門的なサポートを行うために社会保険労務士資格を取得しました。
                                </p>
                                <p>
                                    現在は金融機関に勤務しながら、副業として執筆活動や監修、個別相談などを行っています。
                                </p>
                                <div className="mt-4 p-4 rounded-xl bg-gold-500/5 border border-gold-500/15">
                                    <p className="text-gold-300 font-medium text-sm">
                                        「分かりにくい制度を分かりやすく」をモットーに、
                                        専門用語を使わない丁寧な説明を心がけています。
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                                <span className="w-1 h-5 rounded-full bg-gold-400 inline-block" />
                                キャリア
                            </h3>
                            <div className="space-y-4">
                                {career.map(({ icon: Icon, year, title, desc }, index) => (
                                    <motion.div
                                        key={title}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                                        className="flex gap-4 p-4 rounded-xl glass-card border border-white/5 group"
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors">
                                            <Icon className="w-5 h-5 text-gold-400" />
                                        </div>
                                        <div>
                                            <p className="text-gold-400 text-xs font-medium mb-0.5">{year}</p>
                                            <p className="text-white font-semibold text-sm">{title}</p>
                                            <p className="text-slate-500 text-xs mt-1">{desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
