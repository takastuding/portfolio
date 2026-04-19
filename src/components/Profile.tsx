import { motion } from 'framer-motion';
import { CheckCircle2, Building2, BookOpen, Award } from 'lucide-react';

export const Profile = () => {
    const qualifications = [
        { label: '社会保険労務士', desc: '労務管理・社会保険手続きの専門家' },
        { label: 'FP技能士1級', desc: '最上位の国家資格ファイナンシャルプランナー' },
    ];

    const career = [
        { icon: Building2, year: '大学卒業後', title: '大手損害保険会社 入社', desc: '保険業務や顧客対応業務に従事' },
        { icon: Award, year: '在職中', title: '社会保険労務士 資格取得', desc: '中小企業の「人」と「お金」の課題解決を目指して' },
        { icon: BookOpen, year: '現在', title: '副業として活動中', desc: '執筆・監修・個別相談など幅広く対応' },
    ];

    return (
        <section id="profile" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(217,119,6,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(217,119,6,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-amber-200/15 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="section-label mb-3">01 — Profile</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-800">プロフィール・保有資格</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-amber-500 to-transparent" />
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* オフィス画像カード */}
                        <div className="rounded-2xl overflow-hidden border border-amber-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
                            <div className="relative h-52 overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&auto=format&fit=crop&q=80"
                                    alt="橋本貴嗣社会保険労務士事務所"
                                    className="w-full h-full object-cover object-center"
                                    loading="lazy"
                                />
                                {/* オーバーレイグラデーション */}
                                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/40 via-transparent to-transparent" />
                                {/* 画像上のラベル */}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-white font-bold text-base drop-shadow-sm">橋本貴嗣社会保険労務士事務所</p>
                                    <p className="text-amber-200 text-xs mt-0.5">Hashimoto SR Office</p>
                                </div>
                            </div>
                            <div className="p-5">
                                <p className="text-stone-500 text-xs mb-3 text-center">損害保険会社勤務 / 副業フリーランス</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {['社労士', 'FP1級'].map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-medium border border-amber-200">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-amber-700/80 text-xs font-bold uppercase tracking-wider mb-4">保有資格</p>
                            {qualifications.map((qual, index) => (
                                <motion.div
                                    key={qual.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-stone-200 shadow-sm group hover:border-amber-300 hover:shadow-md transition-all duration-300"
                                >
                                    <CheckCircle2 className="flex-shrink-0 w-5 h-5 text-amber-600 mt-0.5 group-hover:scale-110 transition-transform" />
                                    <div>
                                        <p className="text-stone-800 font-semibold text-sm">{qual.label}</p>
                                        <p className="text-stone-400 text-xs mt-0.5">{qual.desc}</p>
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
                        <div className="rounded-2xl p-8 border border-stone-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
                            <h3 className="text-stone-800 font-bold text-lg mb-5 flex items-center gap-2">
                                <span className="w-1 h-5 rounded-full bg-amber-500 inline-block" />
                                自己紹介
                            </h3>
                            <div className="space-y-4 text-stone-600 leading-relaxed">
                                <p>
                                    大学卒業後、大手損害保険会社に就職。保険業務や顧客対応に従事する中で、
                                    中小企業の経営者が抱える「人」と「お金」の課題に直面し、
                                    より専門的なサポートを行うために社会保険労務士資格を取得しました。
                                </p>
                                <p>
                                    現在は損害保険会社に勤務しながら、副業として執筆活動や監修、個別相談などを行っています。
                                </p>
                                <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200">
                                    <p className="text-amber-800 font-medium text-sm">
                                        「分かりにくい制度を分かりやすく」をモットーに、
                                        専門用語を使わない丁寧な説明を心がけています。
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-stone-800 font-bold text-lg mb-5 flex items-center gap-2">
                                <span className="w-1 h-5 rounded-full bg-amber-500 inline-block" />
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
                                        className="flex gap-4 p-4 rounded-xl bg-white border border-stone-200 shadow-sm group hover:border-amber-300 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                                            <Icon className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <p className="text-amber-700 text-xs font-semibold mb-0.5">{year}</p>
                                            <p className="text-stone-800 font-semibold text-sm">{title}</p>
                                            <p className="text-stone-400 text-xs mt-1">{desc}</p>
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
