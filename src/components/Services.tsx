import { PenTool, Users, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Services = () => {
    const services = [
        {
            num: '01',
            title: '執筆・監修',
            description: '金融、年金、社会保険に関する記事の執筆や監修。難解な制度を読者に分かりやすく解説します。',
            icon: PenTool,
            tags: ['Web記事', '監修', 'SEO対応'],
            accent: 'from-emerald-50 to-white',
            border: 'border-emerald-200',
            hoverBorder: 'hover:border-emerald-400',
            iconBg: 'bg-emerald-50',
            iconBorder: 'border-emerald-200',
            iconColor: 'text-emerald-600',
            tagBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            numColor: 'text-emerald-200',
            glow: 'hover:shadow-[0_8px_40px_rgba(16,185,129,0.15)]',
        },
        {
            num: '02',
            title: '個別相談・コンサルティング',
            description: 'ライフプランニング、社会保険、資産運用に関するアドバイス。FP1級の知識を活かした包括的な提案が可能です。オンライン相談は休日限定で承ります。',
            icon: Users,
            tags: ['休日限定・オンライン', '資産形成', 'FP1級'],
            accent: 'from-amber-50 to-white',
            border: 'border-amber-200',
            hoverBorder: 'hover:border-amber-400',
            iconBg: 'bg-amber-50',
            iconBorder: 'border-amber-200',
            iconColor: 'text-amber-600',
            tagBg: 'bg-amber-50 text-amber-700 border-amber-200',
            numColor: 'text-amber-200',
            glow: 'hover:shadow-[0_8px_40px_rgba(217,119,6,0.18)]',
        },
        {
            num: '03',
            title: '行政手続代行',
            description: '助成金申請や各種社会保険手続きの代行など、煩雑な業務をサポート。（将来的展開予定）',
            icon: FileText,
            tags: ['助成金', '手続代行', '社会保険'],
            accent: 'from-blue-50 to-white',
            border: 'border-blue-200',
            hoverBorder: 'hover:border-blue-400',
            iconBg: 'bg-blue-50',
            iconBorder: 'border-blue-200',
            iconColor: 'text-blue-600',
            tagBg: 'bg-blue-50 text-blue-700 border-blue-200',
            numColor: 'text-blue-200',
            glow: 'hover:shadow-[0_8px_40px_rgba(59,130,246,0.15)]',
        },
    ];

    return (
        <section id="services" className="py-24 relative overflow-hidden bg-cream-100/50">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-100/30 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="section-label mb-3">02 — Services</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-800">提供サービス</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-amber-500 to-transparent" />
                    <p className="mt-4 text-stone-500 max-w-lg">
                        橋本貴嗣社会保険労務士事務所では、CrowdWorksなどを通じて以下の業務を中心にお引き受けしております。
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
                            className={`relative rounded-2xl p-6 border ${service.border} ${service.hoverBorder} bg-gradient-to-br ${service.accent} group overflow-hidden shadow-sm ${service.glow} card-hover transition-all duration-300`}
                        >
                            {/* Section number watermark */}
                            <div className={`absolute top-4 right-5 font-display text-6xl font-black ${service.numColor} select-none pointer-events-none`}>
                                {service.num}
                            </div>

                            <div className="relative z-10">
                                <div className={`w-12 h-12 rounded-xl ${service.iconBg} border ${service.iconBorder} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                    <service.icon className={`w-5 h-5 ${service.iconColor}`} />
                                </div>

                                <h3 className="text-stone-800 font-bold text-lg mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-stone-500 text-sm leading-relaxed mb-5">
                                    {service.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-5">
                                    {service.tags.map(tag => (
                                        <span key={tag} className={`px-2.5 py-1 rounded-full text-xs font-medium border ${service.tagBg}`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center text-xs font-semibold text-stone-400 group-hover:text-amber-600 transition-colors">
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
