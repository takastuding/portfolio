import { motion } from 'framer-motion';

const socialLinks = [
    {
        name: 'note',
        url: 'https://note.com/brainy_racoon772',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
        ),
    },
    {
        name: 'X',
        url: 'https://x.com/sharoushi_info?s=21',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
        ),
    },
    {
        name: 'Threads',
        url: 'https://www.threads.com/@sharo_log?igshid=NTc4MTIwNjQ2YQ==',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.312-.883-2.378-.888h-.015c-.845 0-1.994.298-2.692 1.388l-1.722-1.056c.976-1.578 2.643-2.45 4.428-2.45h.023c3.269.017 5.059 2.077 5.072 5.61 0 .107-.003.212-.01.316.79.538 1.407 1.24 1.824 2.079.7 1.408.733 3.476-.712 4.981-1.798 1.842-4.063 2.67-7.198 2.694z"/>
            </svg>
        ),
    },
];

export const Footer = () => {
    return (
        <footer className="border-t border-white/5 py-10 relative overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-gold-500/3 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-between items-center gap-6"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg">
                            <span className="text-[#050b18] font-bold text-xs font-mono">S</span>
                        </div>
                        <div>
                            <p className="text-white font-semibold text-sm">社労士・FP専門家</p>
                            <p className="text-slate-600 text-xs">社労士 / FP1級 / 年金アドバイザー2級</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {socialLinks.map(link => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.name}
                                className="w-9 h-9 rounded-xl glass border border-white/5 flex items-center justify-center text-slate-500 hover:text-gold-400 hover:border-gold-500/30 transition-all duration-200"
                            >
                                {link.icon}
                            </a>
                        ))}
                    </div>

                    <p className="text-slate-600 text-xs">
                        &copy; {new Date().getFullYear()} All rights reserved.
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};
