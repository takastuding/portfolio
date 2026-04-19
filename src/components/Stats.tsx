import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// requestAnimationFrameベースのカウントアップ（滑らか・軽量）
const CountUp = ({ target, suffix = '', duration = 1500 }: { target: number; suffix?: string; duration?: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let startTime: number | null = null;
        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // easeOutQuart
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isInView, target, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
};

const stats = [
    {
        value: 2,
        suffix: '資格',
        label: '保有資格数',
        desc: '社会保険労務士・FP技能士1級',
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
    },
    {
        value: 5,
        suffix: '年以上',
        label: '実務経験',
        desc: '大手損害保険会社での実務経験',
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
    },
    {
        value: 100,
        suffix: '件以上',
        label: '相談実績',
        desc: '労務・年金・資産形成の相談対応',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
    },
    {
        value: 2,
        suffix: '日以内',
        label: '週末に返信',
        desc: '土日専門のため平日のご連絡は週末にまとめて対応',
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        border: 'border-purple-200',
    },
];

export const Stats = () => {
    return (
        <section className="py-16 relative overflow-hidden bg-white border-y border-stone-100">
            {/* 背景パターン */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(217,119,6,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(217,119,6,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <p className="section-label mb-2">実績で見る信頼</p>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-800">Numbers</h2>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`rounded-2xl p-6 border ${stat.border} ${stat.bg} text-center group hover:shadow-lg transition-all duration-300`}
                        >
                            <div className={`font-display text-4xl sm:text-5xl font-black ${stat.color} mb-1 leading-none`}>
                                <CountUp target={stat.value} suffix={stat.suffix} />
                            </div>
                            <p className="text-stone-700 font-bold text-sm mt-3 mb-1">{stat.label}</p>
                            <p className="text-stone-400 text-xs leading-relaxed">{stat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
