import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'ホーム', href: '#home' },
        { name: 'プロフィール', href: '#profile' },
        { name: 'サービス', href: '#services' },
        { name: '実績・リンク', href: '#links' },
        { name: 'お問い合わせ', href: '#contact' },
    ];

    return (
        <header
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-navy-950/90 backdrop-blur-md shadow-lg border-b border-slate-800/50 py-2' : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex-shrink-0 flex items-center"
                    >
                        <a href="#home" className="font-bold text-xl text-white tracking-wider flex items-center gap-2 group">
                            <div className="w-8 h-8 rounded bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 font-serif font-bold group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(234,179,8,0.3)]">S</div>
                            <span className="group-hover:text-gold-400 transition-colors">社労士・FP事務所</span>
                        </a>
                    </motion.div>

                    {/* Desktop Menu */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="hidden md:block"
                    >
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                                    className="text-slate-300 hover:text-gold-400 hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-all relative group"
                                >
                                    {item.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-300"></span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 focus:outline-none transition-all"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-navy-900/95 backdrop-blur-md absolute top-full left-0 w-full border-t border-slate-800 shadow-xl overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all"
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
