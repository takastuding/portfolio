import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'ホーム', href: '#home' },
        { name: 'プロフィール', href: '#profile' },
        { name: 'サービス', href: '#services' },
        { name: 'SNS・リンク', href: '#links' },
        { name: 'お問い合わせ', href: '#contact' },
    ];

    return (
        <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
            <div className={`absolute inset-0 transition-all duration-500 ${scrolled ? 'bg-[#050b18]/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'}`} />
            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <motion.a
                        href="#home"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-3 group"
                    >
                        <div className="relative w-8 h-8">
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 opacity-20 group-hover:opacity-40 transition-opacity blur-sm" />
                            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-lg">
                                <span className="text-[#050b18] font-bold text-sm font-mono">S</span>
                            </div>
                        </div>
                        <span className="text-white font-semibold text-sm tracking-wide group-hover:text-gold-400 transition-colors">
                            社労士・FP事務所
                        </span>
                    </motion.a>

                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="hidden md:flex items-center gap-1"
                    >
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.15 + index * 0.05 }}
                                className="relative px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5 group"
                            >
                                {item.name}
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-gold-400 group-hover:w-4 transition-all duration-300 rounded-full" />
                            </motion.a>
                        ))}
                        <motion.a
                            href="#contact"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            className="ml-4 px-5 py-2 text-sm font-semibold rounded-lg bg-gold-500/10 text-gold-400 border border-gold-500/20 hover:bg-gold-500/20 hover:border-gold-500/40 transition-all duration-200"
                        >
                            相談する
                        </motion.a>
                    </motion.nav>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative z-10 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                        aria-label="メニュー"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden relative bg-[#0a1628]/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
                    >
                        <div className="px-6 py-4 space-y-1">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.04 }}
                                    className="flex items-center px-3 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
