import { motion } from 'framer-motion';
import { CheckCircle2, Building2, BookOpen, Award } from 'lucide-react';

export const Profile = () => {
    const qualifications = [
        { label: '社会保険労務士', desc: '労務管理・社会保険手続きの専門家' },
        { label: '1級ファイナンシャル・プランニング技能士', desc: 'ファイナンシャル・プランニング技能士の最上位区分（国家資格）' },
    ];

    const career = [
        { icon: Building2, year: '大学卒業後', title: '大手損害保険会社 入社', desc: '保険業務や顧客対応業務に従事' },
        { icon: Award, year: '在職中', title: '社会保険労務士・1級ファイナンシャル・プランニング技能士 資格取得', desc: '中小企業の「人」と「お金」の課題を同時に解決するため、労務とお金の両分野で国家資格を取得' },
        { icon: BookOpen, year: '現在', title: '現役社員として最前線に在籍', desc: '週末を活用し、執筆・監修・個別相談に対応。実務経験を直接アドバイスに活かす' },
    ];

    return (
        <section id="profile" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="section-label mb-3">06 — Profile</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-800">プロフィール・保有資格</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-blue-600 to-transparent" />
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-12 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* プロフィールカード */}
                        <div className="relative rounded-2xl overflow-hidden border border-blue-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.07)]">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50/40" aria-hidden="true" />
                            <div className="relative aspect-square overflow-hidden">
                                <img
                                    src="/profile.png"
                                    alt="社会保険労務士・1級ファイナンシャル・プランニング技能士"
                                    className="w-full h-full object-cover object-center"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 via-transparent to-transparent" />
                                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur border border-blue-100">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                    <span className="text-navy-900 text-[10px] font-bold tracking-widest uppercase">Profile</span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4">
                                    <p className="text-white font-bold text-base drop-shadow">橋本社会保険労務士事務所</p>
                                    <p className="text-blue-100 text-xs mt-0.5 drop-shadow">Hashimoto SR &amp; FP1 Office</p>
                                </div>
                            </div>
                            <div className="relative p-5">
                                <p className="text-stone-500 text-xs mb-3 text-center">損害保険会社勤務 / 副業フリーランス</p>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {['社労士', 'FP1級', '土日祝対応'].map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-medium border border-blue-200">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-blue-800/80 text-xs font-bold uppercase tracking-wider mb-4">保有資格</p>
                            {qualifications.map((qual, index) => (
                                <motion.div
                                    key={qual.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                                    className="flex items-start gap-3 p-4 rounded-xl bg-white border border-stone-200 shadow-sm group hover:border-blue-300 hover:shadow-md transition-all duration-300"
                                >
                                    <CheckCircle2 className="flex-shrink-0 w-5 h-5 text-blue-700 mt-0.5 group-hover:scale-110 transition-transform" />
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
                                <span className="w-1 h-5 rounded-full bg-blue-600 inline-block" />
                                自己紹介
                            </h3>
                            <div className="space-y-4 text-stone-600 leading-relaxed [text-wrap:pretty]">
                                <p>
                                    大学卒業後、大手損害保険会社に就職。保険業務や顧客対応に従事する中で、中小企業の経営者が抱える「人」と「お金」の課題に直面し、より専門的なサポートを行うために社会保険労務士資格を取得しました。
                                </p>
                                <p>
                                    現在も損害保険会社の最前線で働きながら、週末を活用して執筆・監修・個別相談を行っています。「現役社員だからこそ知るリアル」を、そのままアドバイスに活かすことが強みです。
                                </p>
                                <div className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200">
                                    <p className="text-navy-800 font-medium text-sm [text-wrap:pretty]">
                                        「分かりにくい制度を分かりやすく」をモットーに、専門用語を使わない丁寧な説明を心がけています。
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-stone-800 font-bold text-lg mb-5 flex items-center gap-2">
                                <span className="w-1 h-5 rounded-full bg-blue-600 inline-block" />
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
                                        className="flex gap-4 p-4 rounded-xl bg-white border border-stone-200 shadow-sm group hover:border-blue-300 hover:shadow-md transition-all duration-300"
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                            <Icon className="w-5 h-5 text-blue-700" />
                                        </div>
                                        <div>
                                            <p className="text-blue-800 text-xs font-semibold mb-0.5">{year}</p>
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
