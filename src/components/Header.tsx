import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const sections = ['home', 'profile', 'services', 'links', 'contact'];
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { threshold: 0.4 }
        );
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const navItems = [
        { name: 'ホーム', href: '#home', id: 'home' },
        { name: 'プロフィール', href: '#profile', id: 'profile' },
        { name: 'サービス', href: '#services', id: 'services' },
        { name: 'SNS・リンク', href: '#links', id: 'links' },
        { name: 'お問い合わせ', href: '#contact', id: 'contact' },
    ];

    return (
        <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
            <div className={`absolute inset-0 transition-all duration-500 ${
                scrolled
                    ? 'bg-white/90 backdrop-blur-xl border-b border-stone-200/80 shadow-sm'
                    : 'bg-transparent'
            }`} />
            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <motion.a
                        href="#home"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-3 group"
                    >
                        <div className="flex items-center gap-2">
                            <div className="relative flex items-center">
                                <div className="w-1 h-8 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.4)]" />
                                <div className="w-1 h-5 rounded-full bg-amber-300/40 ml-0.5" />
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-stone-800 font-bold text-base tracking-tight group-hover:text-amber-700 transition-colors">
                                    橋本社会保険労務士事務所
                                </span>
                                <span className="text-amber-600/70 text-[10px] font-medium tracking-widest uppercase mt-0.5">
                                    Hashimoto SR Office
                                </span>
                            </div>
                        </div>
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
                                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg group ${
                                    activeSection === item.id
                                        ? 'text-amber-700 bg-amber-50'
                                        : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
                                }`}
                            >
                                {item.name}
                                {activeSection === item.id && (
                                    <motion.span
                                        layoutId="activeNav"
                                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-600"
                                    />
                                )}
                            </motion.a>
                        ))}
                        <motion.a
                            href="#contact"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                            className="ml-4 px-5 py-2 text-sm font-semibold rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition-all duration-200 shadow-[0_2px_12px_rgba(217,119,6,0.3)] hover:shadow-[0_4px_20px_rgba(217,119,6,0.4)]"
                        >
                            相談する
                        </motion.a>
                    </motion.nav>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative z-10 p-2 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-all"
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
                        className="md:hidden relative bg-white/97 backdrop-blur-xl border-t border-stone-200 overflow-hidden shadow-lg"
                    >
                        <div className="px-6 py-4 space-y-1">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.04 }}
                                    className="flex items-center px-3 py-3 rounded-lg text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-all"
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
