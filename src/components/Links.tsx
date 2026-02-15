import { ExternalLink, ArrowUpRight } from 'lucide-react';

export const Links = () => {
    const links = [
        {
            name: 'note',
            description: '日々の気づきや専門知識のアウトプット',
            url: '#', // Placeholder
            color: 'from-green-400 to-green-600',
            textColor: 'text-green-400'
        },
        {
            name: 'X (Twitter)',
            description: 'リアルタイムな情報発信',
            url: '#', // Placeholder
            color: 'from-slate-700 to-slate-900',
            textColor: 'text-slate-400'
        },
        {
            name: 'CrowdWorks',
            description: 'お仕事のご依頼はこちら',
            url: '#', // Placeholder
            color: 'from-orange-400 to-orange-600',
            textColor: 'text-orange-400'
        },
    ];

    return (
        <section id="links" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center mb-16">
                    <h2 className="text-base text-gold-500 font-semibold tracking-wide uppercase">Links</h2>
                    <p className="mt-2 text-3xl leading-8 font-bold text-white sm:text-4xl">
                        SNS・外部サイト
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group glass p-1 rounded-2xl hover:scale-[1.02] transition-transform duration-300"
                        >
                            <div className="bg-navy-900/80 rounded-xl p-6 h-full flex flex-col justify-between relative overflow-hidden">
                                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${link.color}`} />

                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className={`text-xl font-bold ${link.textColor} group-hover:text-white transition-colors`}>
                                            {link.name}
                                        </h3>
                                        <ArrowUpRight className="text-slate-500 group-hover:text-white transition-colors" />
                                    </div>
                                    <p className="text-slate-300 text-sm">{link.description}</p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-700 flex items-center text-xs font-medium text-slate-400 group-hover:text-gold-400 transition-colors">
                                    View Profile <ExternalLink className="ml-1 h-3 w-3" />
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
