import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

type Props = {
    title: string;
    subtitle?: string;
    lastUpdated: string;
    children: ReactNode;
};

export const LegalLayout = ({ title, subtitle, lastUpdated, children }: Props) => {
    return (
        <div className="min-h-screen bg-surface-50">
            <header className="border-b border-stone-200 bg-white/95 backdrop-blur sticky top-0 z-40">
                <div className="max-w-3xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
                    <a
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.hash = '';
                            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
                        }}
                        className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-blue-800 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        トップへ戻る
                    </a>
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="" aria-hidden="true" className="w-7 h-7 object-contain" />
                        <span className="text-navy-900 font-bold text-xs">橋本貴嗣社会保険労務士事務所</span>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
                <p className="section-label mb-3">Legal</p>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-800">{title}</h1>
                {subtitle && <p className="mt-3 text-stone-500 text-sm">{subtitle}</p>}
                <div className="mt-4 h-px w-16 bg-gradient-to-r from-blue-600 to-transparent" />

                <article className="prose-legal mt-10 text-stone-700 leading-relaxed">
                    {children}
                </article>

                <p className="mt-14 pt-6 border-t border-stone-200 text-stone-400 text-xs">
                    最終更新日：{lastUpdated}
                </p>
            </main>

            <footer className="border-t border-stone-200 py-8 bg-white">
                <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center text-stone-400 text-xs">
                    &copy; {new Date().getFullYear()} 橋本貴嗣社会保険労務士事務所
                </div>
            </footer>
        </div>
    );
};
