import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Links = () => {
    const links = [
        {
            name: 'note',
            description: '日々の気づきや専門知識のアウトプット',
            url: '#', // Placeholder
            color: 'from-green-400 to-green-600',
            textColor: 'text-green-400',
            image: '/images/link-note.png',
        },
        {
            name: 'X (Twitter)',
            description: 'リアルタイムな情報発信',
            url: '#', // Placeholder
            color: 'from-slate-700 to-slate-900',
            textColor: 'text-slate-400',
            image: '/images/link-twitter.png',
        },
        {
            name: 'CrowdWorks',
            description: 'お仕事のご依頼はこちら',
            url: '#', // Placeholder
            color: 'from-orange-400 to-orange-600',
            textColor: 'text-orange-400',
            image: '/images/link-crowdworks.png',
        },
    ];

    return (
        <section id="links" className="py-20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:text-center mb-16"
                >
                    <h2 className="text-base text-gold-500 font-semibold tracking-wide uppercase">Links</h2>
                    <p className="mt-2 text-3xl leading-8 font-bold text-white sm:text-4xl">
                        SNS・外部サイト
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {links.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group glass p-1 rounded-2xl hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]"
                        >
                            <div className="bg-navy-900/80 rounded-xl overflow-hidden h-full flex flex-col justify-between relative">
                                {/* Background Image */}
                                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                                    <img 
                                        src={link.image} 
                                        alt={link.name} 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-navy-900/80 to-navy-900"></div>
                                </div>

                                <div className="relative z-10 p-6">
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${link.color}`} />

                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className={`text-xl font-bold ${link.textColor} group-hover:text-white transition-colors`}>
                                                {link.name}
                                            </h3>
                                            <ArrowUpRight className="text-slate-500 group-hover:text-gold-400 group-hover:scale-110 transition-all" />
                                        </div>
                                        <p className="text-slate-300 text-sm">{link.description}</p>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-slate-700 flex items-center text-xs font-medium text-slate-400 group-hover:text-gold-400 transition-colors">
                                        View Profile <ExternalLink className="ml-1 h-3 w-3" />
                                    </div>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};
