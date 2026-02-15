import { PenTool, Users, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export const Services = () => {
    const services = [
        {
            title: '執筆・監修',
            description: '金融、年金、社会保険に関する記事の執筆や監修を行います。難解な制度を読者に分かりやすく解説します。',
            icon: PenTool,
            image: '/images/service-writing.png',
        },
        {
            title: '個別相談・コンサルティング',
            description: 'ライフプランニング、年金相談、資産運用に関するアドバイスを提供します。FP1級の知識を活かした包括的な提案が可能です。',
            icon: Users,
            image: '/images/service-consulting.png',
        },
        {
            title: '行政手続代行',
            description: '（※将来的な展開として）助成金申請や各種社会保険手続きの代行など、煩雑な業務をサポートします。',
            icon: FileText,
            image: '/images/service-procedures.png',
        },
    ];

    return (
        <section id="services" className="py-20 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-navy-900/50 -z-10" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:text-center mb-16"
                >
                    <h2 className="text-base text-gold-500 font-semibold tracking-wide uppercase">Services</h2>
                    <p className="mt-2 text-3xl leading-8 font-bold text-white sm:text-4xl">
                        提供サービス
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-slate-300 lg:mx-auto">
                        CrowdWorksなどを通じて、以下の業務を中心にお引き受けしております。
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card rounded-2xl overflow-hidden relative group"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                                <img 
                                    src={service.image} 
                                    alt={service.title} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/90 to-navy-950"></div>
                            </div>

                            <div className="relative z-10 p-8">
                                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-navy-900 mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                    <service.icon className="h-7 w-7" aria-hidden="true" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold-400 transition-colors">{service.title}</h3>
                                <p className="text-slate-300 leading-relaxed text-sm">
                                    {service.description}
                                </p>
                            </div>

                            {/* Decorative Icon */}
                            <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <service.icon className="w-24 h-24 text-white" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
