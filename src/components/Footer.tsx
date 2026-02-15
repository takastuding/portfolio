import { motion } from 'framer-motion';

export const Footer = () => {
    return (
        <footer className="bg-navy-950 text-white py-12 border-t border-slate-800 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gold-500/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row justify-between items-center"
                >
                    <div className="mb-4 md:mb-0 text-center md:text-left">
                        <span className="text-xl font-bold flex items-center justify-center md:justify-start gap-2 group">
                            <span className="w-6 h-6 rounded bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 font-serif text-sm group-hover:scale-110 transition-transform">S</span>
                            <span className="group-hover:text-gold-400 transition-colors">社労士・FP事務所</span>
                        </span>
                        <p className="text-sm text-slate-400 mt-2">
                            金融出身の社会保険労務士・FP1級・年金アドバイザー
                        </p>
                    </div>
                    <div className="text-sm text-slate-500 text-center md:text-right">
                        &copy; {new Date().getFullYear()} Social Insurance Labor Consultant Office.<br className="md:hidden" /> All rights reserved.
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};
