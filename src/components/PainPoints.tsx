import { motion } from 'framer-motion';
import { AlertCircle, Clock4, ScrollText, Coins, BookMarked } from 'lucide-react';

const pains = [
    {
        icon: ScrollText,
        text: '年金や社会保険の手続きが分からず、後回しになっている',
    },
    {
        icon: Clock4,
        text: '労務管理を整えたいが、平日に専門家へ相談する時間が無い',
    },
    {
        icon: Coins,
        text: '助成金を活用したいけれど、申請の煩雑さに踏み出せない',
    },
    {
        icon: BookMarked,
        text: '就業規則や諸規程の作り方・運用に自信が持てない',
    },
];

export const PainPoints = () => {
    return (
        <section className="relative py-24 bg-surface-100/40 overflow-hidden">
            <div className="absolute -top-32 -left-24 w-[420px] h-[420px] bg-blue-100/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -right-16 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* 左：見出し */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5 lg:sticky lg:top-28"
                    >
                        <p className="section-label mb-3">02 — Pain points</p>
                        <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-navy-900 leading-[1.25] tracking-tight">
                            こんなお悩みは、<br className="hidden sm:block" />
                            <span className="text-gradient">ありませんか？</span>
                        </h2>
                        <div className="mt-5 h-px w-16 bg-gradient-to-r from-blue-600 to-transparent" />
                        <p className="mt-6 text-stone-500 leading-relaxed max-w-md [text-wrap:pretty]">
                            「人」と「お金」の制度はどんどん複雑になり、専門家でないと判断が難しい場面が増えています。
                            <br />
                            放置するほどリスクは大きく — 一度、現役社員 × 社労士 × FP1級の視点で整理しませんか。
                        </p>
                    </motion.div>

                    {/* 右：4枚のカード */}
                    <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                        {pains.map(({ icon: Icon, text }, i) => (
                            <motion.div
                                key={text}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: i * 0.08 }}
                                className="group relative bg-white rounded-2xl border border-blue-100 p-6 hover:border-blue-300 hover:shadow-[0_8px_30px_rgba(37,99,235,0.10)] transition-all duration-300"
                            >
                                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <AlertCircle className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-100 group-hover:border-blue-200 transition-colors">
                                    <Icon className="w-5 h-5 text-blue-700" />
                                </div>
                                <p className="text-stone-700 text-sm leading-relaxed">
                                    {text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
