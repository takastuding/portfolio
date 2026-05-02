import { PenTool, Users, FileText, Briefcase, Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const Services = () => {
    const services = [
        {
            num: '01',
            title: '執筆・監修',
            description: '金融・年金・社会保険に関する記事の執筆と監修。難解な制度を読者に分かりやすく解説します。',
            icon: PenTool,
        },
        {
            num: '02',
            title: '個別相談',
            description: 'FP技能士1級の知見を活かした、ライフプラン・労務・資産形成の個別コンサルティング（土日祝・オンライン）。',
            icon: Users,
        },
        {
            num: '03',
            title: '行政手続代行',
            description: '助成金申請や各種社会保険手続きの代行など、煩雑な業務をサポートします（将来展開予定）。',
            icon: FileText,
        },
        {
            num: '04',
            title: '就業規則作成',
            description: '中小企業向けの就業規則・諸規程の作成支援。実務目線での雛形提供と運用ガイドをセットでご提供します。',
            icon: Briefcase,
        },
        {
            num: '05',
            title: '労務監査',
            description: '労務リスクの可視化と改善提案。労働法令に沿った運用が出来ているかをチェックし、対応プランを策定します。',
            icon: Shield,
        },
        {
            num: '06',
            title: '資産形成相談',
            description: 'FP技能士1級としての包括的な資産アドバイス。NISA・iDeCo・保険・年金まで横断的に整理します。',
            icon: TrendingUp,
        },
    ];

    return (
        <section id="services" className="py-24 relative overflow-hidden bg-surface-100/50">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-100/30 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="section-label mb-3">02 — Services</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">業務内容</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-blue-600 to-transparent" />
                    <p className="mt-4 text-stone-500 max-w-xl">
                        人事・労務の現場をシンプルにし、企業の未来をサポートする。
                        執筆・相談・手続きまで、社労士＋FP1級の両軸でワンストップ対応します。
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
                            className="group relative bg-white rounded-2xl border border-blue-100 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <div className="w-11 h-11 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                                    <service.icon className="w-5 h-5 text-blue-700" />
                                </div>
                                <span className="text-blue-200 font-bold text-xs tracking-widest">{service.num}</span>
                            </div>
                            <h3 className="text-navy-900 font-bold text-base mb-2.5">
                                {service.title}
                            </h3>
                            <p className="text-stone-500 text-sm leading-relaxed">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
