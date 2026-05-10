import { motion } from 'framer-motion';
import { HeartHandshake, LineChart, ShieldCheck, ArrowUpRight } from 'lucide-react';

const reasons = [
    {
        num: '01',
        icon: HeartHandshake,
        title: '現役社員ならではの"リアル"',
        body: '損害保険業界15年以上のキャリアを持ち、現役で最前線に在籍中。社労士の枠を超え、金融業界の知見も併せ持つ視点で、教科書に載らない制度の運用実態や保険・年金の最新トピックをそのままお伝えします。',
        tag: '損保業界 15年+',
    },
    {
        num: '02',
        icon: LineChart,
        title: '社労士 × FP1級 のダブル資格',
        body: '労務だけ・お金だけでは解けない課題を、ひとつの窓口で同時に整理。就業規則から退職金、NISA・iDeCo まで横断的にアドバイスします。',
        tag: '国家資格 ×2',
    },
    {
        num: '03',
        icon: ShieldCheck,
        title: '土日祝の専門対応',
        body: '平日は本業に集中する経営者・働き手のため、週末をフルに活用する相談体制。Zoom・Google Meet で全国どこからでも繋がります。',
        tag: 'オンライン全国',
    },
];

export const WhyUs = () => {
    return (
        <section id="why-us" className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.025)_1px,transparent_1px)] bg-[size:60px_60px]" />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[640px] h-[360px] bg-blue-100/20 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 max-w-3xl"
                >
                    <p className="section-label mb-3">04 — Why us</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 leading-tight tracking-tight">
                        当事務所が選ばれる<span className="text-gradient">3つの理由</span>
                    </h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-blue-600 to-transparent" />
                    <p className="mt-5 text-stone-500 leading-relaxed">
                        制度を熟知しているだけでは足りない。経営の現場・家計の現場と
                        日々向き合うからこそ伝えられる「使える助言」をお届けします。
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-5">
                    {reasons.map(({ num, icon: Icon, title, body, tag }, i) => (
                        <motion.article
                            key={num}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="group relative bg-white rounded-3xl border border-blue-100 p-7 hover:border-blue-300 hover:shadow-[0_16px_40px_rgba(15,23,42,0.10)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex items-start justify-between mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/70 flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-colors">
                                    <Icon className="w-6 h-6 text-blue-700" />
                                </div>
                                <span className="font-display text-5xl font-black text-blue-100 group-hover:text-blue-200 leading-none transition-colors">
                                    {num}
                                </span>
                            </div>

                            <h3 className="text-navy-900 font-bold text-lg mb-3 leading-snug">
                                {title}
                            </h3>
                            <p className="text-stone-500 text-sm leading-relaxed mb-5">
                                {body}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                                <span className="text-blue-700 text-[10px] font-bold tracking-[0.2em] uppercase">
                                    {tag}
                                </span>
                                <ArrowUpRight className="w-4 h-4 text-stone-300 group-hover:text-blue-600 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
};
