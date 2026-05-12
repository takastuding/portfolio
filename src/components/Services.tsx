import { PenTool, Users, Wallet, FileText, Briefcase, Shield, Download, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

type Service = {
    num: string;
    title: string;
    description: string;
    icon: typeof PenTool;
    download?: { label: string; href: string; filename?: string };
    link?: { label: string; href: string };
};

export const Services = () => {
    const services: Service[] = [
        {
            num: '01',
            title: '執筆・監修',
            description: '金融・年金・社会保険に関する記事の執筆と監修。難解な制度を読者に分かりやすく解説します。',
            icon: PenTool,
        },
        {
            num: '02',
            title: '個別相談（法人・個人）',
            description: '法人・個人どちらにも対応する個別コンサルティング。実際には副業されている個人事業主やフリーランスの方からのご依頼が中心で、労務とお金、両面の課題を一度に整理します。',
            icon: Users,
        },
        {
            num: '03',
            title: '個人向けFP・資産形成相談',
            description: '会社員・副業者・小規模事業者の方を対象に、社会保険・年金・働き方からNISA・iDeCo・保険まで、ライフプラン全体を1級ファイナンシャル・プランニング技能士の視点で横断的に整理します。',
            icon: Wallet,
            link: {
                label: 'ライフプランシミュレーション',
                href: '#/lifeplan',
            },
        },
        {
            num: '04',
            title: '行政手続代行',
            description: '助成金申請や各種社会保険手続きの代行など、煩雑な業務をサポートします（将来展開予定）。',
            icon: FileText,
        },
        {
            num: '05',
            title: '就業規則作成',
            description: '開業したて・個人事業主・副業の方・初めて従業員を雇う方向けに、最小構成からスタートできる就業規則の作成を支援。実務目線の雛形と運用ガイドをセットでご提供します。',
            icon: Briefcase,
            download: {
                label: 'サンプル雛形をダウンロード（Word）',
                href: '/samples/syuugyou-kisoku-sample.docx',
                filename: 'syuugyou-kisoku-sample.docx',
            },
        },
        {
            num: '06',
            title: '労務監査',
            description: '労務リスクの可視化と改善提案。労働法令に沿った運用が出来ているかをチェックし、対応プランを策定します（将来展開予定）。',
            icon: Shield,
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
                    <p className="section-label mb-3">03 — Services</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">業務内容</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-blue-600 to-transparent" />
                    <p className="mt-4 text-stone-500 max-w-xl leading-relaxed [text-wrap:pretty]">
                        人事・労務の現場をシンプルにし、企業の未来をサポートする。
                        <br className="hidden sm:block" />
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
                            <p className="text-stone-500 text-sm leading-relaxed [text-wrap:pretty]">
                                {service.description}
                            </p>
                            {service.download && (
                                <a
                                    href={service.download.href}
                                    download={service.download.filename}
                                    className="mt-4 inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-50 border border-blue-200 text-blue-800 hover:bg-blue-100 hover:border-blue-300 transition-colors"
                                >
                                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                                    {service.download.label}
                                </a>
                            )}
                            {service.link && (
                                <a
                                    href={service.link.href}
                                    className="mt-4 inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-blue-50 border border-blue-200 text-blue-800 hover:bg-blue-100 hover:border-blue-300 transition-colors"
                                >
                                    {service.link.label}
                                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
