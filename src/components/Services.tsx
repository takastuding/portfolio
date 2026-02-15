import { PenTool, Users, FileText } from 'lucide-react';

export const Services = () => {
    const services = [
        {
            title: '執筆・監修',
            description: '金融、年金、社会保険に関する記事の執筆や監修を行います。難解な制度を読者に分かりやすく解説します。',
            icon: PenTool,
        },
        {
            title: '個別相談・コンサルティング',
            description: 'ライフプランニング、年金相談、資産運用に関するアドバイスを提供します。FP1級の知識を活かした包括的な提案が可能です。',
            icon: Users,
        },
        {
            title: '行政手続代行',
            description: '（※将来的な展開として）助成金申請や各種社会保険手続きの代行など、煩雑な業務をサポートします。',
            icon: FileText,
        },
    ];

    return (
        <section id="services" className="py-20 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-navy-900/50 -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center mb-16">
                    <h2 className="text-base text-gold-500 font-semibold tracking-wide uppercase">Services</h2>
                    <p className="mt-2 text-3xl leading-8 font-bold text-white sm:text-4xl">
                        提供サービス
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-slate-300 lg:mx-auto">
                        CrowdWorksなどを通じて、以下の業務を中心にお引き受けしております。
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {services.map((service, index) => (
                        <div
                            key={service.title}
                            className="glass-card rounded-2xl p-8 relative group overflow-hidden"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <service.icon className="w-24 h-24 text-white" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 text-navy-900 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <service.icon className="h-7 w-7" aria-hidden="true" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold-400 transition-colors">{service.title}</h3>
                                <p className="text-slate-300 leading-relaxed text-sm">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
