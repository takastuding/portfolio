import { PenTool, Users, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Services = () => {
    const services = [
        {
            title: '執筆・監修',
            description: '金融、年金、社会保険に関する記事の執筆や監修。難解な制度を読者に分かりやすく解説します。',
            icon: PenTool,
            tags: ['Web記事', '監修', 'SEO対応'],
            accent: 'from-emerald-400/20 to-emerald-600/5',
            border: 'border-emerald-500/15',
            iconBg: 'bg-emerald-500/10',
            iconColor: 'text-emerald-400',
        },
        {
            title: '個別相談・コンサルティング',
            description: 'ライフプランニング、年金相談、資産運用に関するアドバイス。FP1級の知識を活かした包括的な提案が可能です。',
            icon: Users,
            tags: ['年金相談', '資産形成', 'FP1級'],
            accent: 'from-gold-400/20 to-gold-600/5',
            border: 'border-gold-500/15',
            iconBg: 'bg-gold-500/10',
            iconColor: 'text-gold-400',
        },
        {
            title: '行政手続代行',
            description: '助成金申請や各種社会保険手続きの代行など、煩雑な業務をサポート。（将来的展開予定）',
            icon: FileText,
            tags: ['助成金', '手続代行', '社会保険'],
            accent: 'from-blue-400/20 to-blue-600/5',
            border: 'border-blue-500/15',
            iconBg: 'bg-blue-500/10',
            iconColor: 'text-blue-400',
        },
    ];

    return (
        <section id="services" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(10,22,40,0.5) 50%, transparent 100%)' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gold-500/4 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="section-label mb-3">Services</p>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">提供サービス</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-gold-400 to-transparent" />
                    <p className="mt-4 text-slate-400 max-w-lg">
                        CrowdWorksなどを通じて、以下の業務を中心にお引き受けしております。
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative rounded-2xl p-6 border ${service.border} glass-card group card-hover overflow-hidden`}
                        >
                            {/* Accent gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />

                            <div className="relative z-10">
                                <div className={`w-12 h-12 rounded-xl ${service.iconBg} border ${service.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                    <service.icon className={`w-5 h-5 ${service.iconColor}`} />
                                </div>

                                <h3 className="text-white font-bold text-lg mb-3 group-hover:text-gold-300 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                                    {service.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-5">
                                    {service.tags.map(tag => (
                                        <span key={tag} className="px-2.5 py-1 rounded-full bg-white/5 text-slate-400 text-xs border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center text-xs font-medium text-slate-500 group-hover:text-gold-400 transition-colors">
                                    詳細はお問い合わせください
                                    <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
