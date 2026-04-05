import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const NoteIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
    </svg>
);

const XIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);

const ThreadsIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.312-.883-2.378-.888h-.015c-.845 0-1.994.298-2.692 1.388l-1.722-1.056c.976-1.578 2.643-2.45 4.428-2.45h.023c3.269.017 5.059 2.077 5.072 5.61 0 .107-.003.212-.01.316.79.538 1.407 1.24 1.824 2.079.7 1.408.733 3.476-.712 4.981-1.798 1.842-4.063 2.67-7.198 2.694z"/>
    </svg>
);

const CrowdWorksIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
    </svg>
);

export const Links = () => {
    const links = [
        {
            name: 'note',
            handle: '@brainy_racoon772',
            description: '社労士・FPの専門知識をわかりやすく発信。日々の気づきや制度解説を記事にしています。',
            url: 'https://note.com/brainy_racoon772',
            icon: NoteIcon,
            bg: 'bg-emerald-50',
            border: 'border-emerald-200',
            hoverBorder: 'hover:border-emerald-400',
            iconBg: 'bg-emerald-100',
            iconColor: 'text-emerald-600',
            label: 'note',
            glow: 'hover:shadow-[0_8px_40px_rgba(16,185,129,0.18)]',
        },
        {
            name: 'X (Twitter)',
            handle: '@sharoushi_info',
            description: '社労士・FP・年金に関するリアルタイムな情報発信。役立つ制度情報をシェアしています。',
            url: 'https://x.com/sharoushi_info?s=21',
            icon: XIcon,
            bg: 'bg-stone-50',
            border: 'border-stone-200',
            hoverBorder: 'hover:border-stone-400',
            iconBg: 'bg-stone-100',
            iconColor: 'text-stone-700',
            label: 'X / Twitter',
            glow: 'hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)]',
        },
        {
            name: 'Threads',
            handle: '@sharo_log',
            description: '日常の気づきや労務・FPに関するショートコンテンツを発信しています。',
            url: 'https://www.threads.com/@sharo_log?igshid=NTc4MTIwNjQ2YQ==',
            icon: ThreadsIcon,
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            hoverBorder: 'hover:border-purple-400',
            iconBg: 'bg-purple-100',
            iconColor: 'text-purple-600',
            label: 'Threads',
            glow: 'hover:shadow-[0_8px_40px_rgba(147,51,234,0.15)]',
        },
        {
            name: 'CrowdWorks',
            handle: 'プロフィールを見る',
            description: 'お仕事のご依頼はこちらから。執筆・監修・相談など幅広くお引き受けします。',
            url: '#',
            icon: CrowdWorksIcon,
            bg: 'bg-orange-50',
            border: 'border-orange-200',
            hoverBorder: 'hover:border-orange-400',
            iconBg: 'bg-orange-100',
            iconColor: 'text-orange-600',
            label: 'CrowdWorks',
            glow: 'hover:shadow-[0_8px_40px_rgba(234,88,12,0.15)]',
        },
    ];

    return (
        <section id="links" className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100/20 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="section-label mb-3">03 — Links</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-800">SNS・外部サイト</h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-amber-500 to-transparent" />
                    <p className="mt-4 text-stone-500 max-w-lg">
                        各SNSやプラットフォームで情報発信中です。お気軽にフォローしてください。
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {links.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`group relative rounded-2xl p-5 border ${link.border} ${link.hoverBorder} ${link.bg} ${link.glow} overflow-hidden block transition-all duration-300 shadow-sm`}
                        >
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-11 h-11 rounded-xl ${link.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <span className={link.iconColor}>
                                            <link.icon />
                                        </span>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-stone-300 group-hover:text-amber-500 transition-colors" />
                                </div>

                                <p className="text-stone-800 font-bold text-base mb-0.5">{link.name}</p>
                                <p className="text-stone-400 text-xs mb-3">{link.handle}</p>
                                <p className="text-stone-500 text-xs leading-relaxed">{link.description}</p>

                                <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center text-xs text-stone-400 group-hover:text-amber-600 transition-colors font-semibold">
                                    {link.label}を開く
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};
