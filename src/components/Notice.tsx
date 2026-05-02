import { motion } from 'framer-motion';

type Notice = {
    date: string;
    tag: 'お知らせ' | '法改正' | 'メディア';
    text: string;
};

const notices: Notice[] = [
    {
        date: '2026.04.20',
        tag: 'お知らせ',
        text: '土日祝のオンライン相談予約システムを刷新しました。予約後の日時変更・キャンセルもメールリンクから可能です。',
    },
    {
        date: '2026.03.15',
        tag: '法改正',
        text: '2026年4月施行の労働基準法改正に対応した就業規則ひな形の配信を開始しました。',
    },
    {
        date: '2026.02.10',
        tag: 'メディア',
        text: 'note にて「副業者のための社会保険入門」を公開しました。',
    },
];

const tagStyle: Record<Notice['tag'], string> = {
    お知らせ: 'bg-blue-100 text-blue-800 border-blue-200',
    法改正: 'bg-navy-900 text-white border-navy-900',
    メディア: 'bg-blue-50 text-blue-700 border-blue-200',
};

export const Notice = () => {
    return (
        <section id="notice" className="py-24 relative">
            <div className="relative max-w-3xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-10"
                >
                    <p className="section-label mb-3">News</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">お知らせ</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-blue-600 to-transparent" />
                </motion.div>

                <motion.ul
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white border border-blue-100 rounded-2xl divide-y divide-blue-50 shadow-sm"
                >
                    {notices.map((n) => (
                        <li key={n.date + n.text} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 px-5 sm:px-6 py-5">
                            <div className="flex items-center gap-3 sm:w-48 flex-shrink-0">
                                <time className="text-stone-500 text-sm tabular-nums">{n.date}</time>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider border ${tagStyle[n.tag]}`}>
                                    {n.tag}
                                </span>
                            </div>
                            <p className="text-stone-700 text-sm leading-relaxed">{n.text}</p>
                        </li>
                    ))}
                </motion.ul>
            </div>
        </section>
    );
};
