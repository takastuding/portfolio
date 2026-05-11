import { ArrowLeft, Sparkles, Mail } from 'lucide-react';

export const LifeplanSimulation = () => {
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
                        <span className="text-navy-900 font-bold text-xs">橋本社会保険労務士事務所</span>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
                <p className="section-label mb-3">Lifeplan Simulation</p>
                <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">ライフプランシミュレーション</h1>
                <div className="mt-4 h-px w-16 bg-gradient-to-r from-blue-600 to-transparent" />

                <div className="mt-12 rounded-2xl border border-blue-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.05)] p-8 sm:p-12 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 mb-5">
                        <Sparkles className="w-6 h-6 text-blue-700" />
                    </div>
                    <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[10px] font-bold tracking-widest uppercase mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        Coming Soon
                    </p>
                    <h2 className="text-navy-900 font-bold text-xl sm:text-2xl mb-3">近日公開</h2>
                    <p className="text-stone-600 text-sm sm:text-base leading-relaxed [text-wrap:pretty] max-w-xl mx-auto">
                        収入・支出・家族構成・将来の目標などをもとに、人生全体のキャッシュフローを見える化するシミュレーションを準備中です。
                        <br />
                        公開までしばらくお待ちください。
                    </p>

                    <div className="mt-8 inline-flex flex-col sm:flex-row gap-3">
                        <a
                            href="#booking"
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.hash = '';
                                setTimeout(() => {
                                    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                                }, 50);
                            }}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm bg-blue-700 hover:bg-blue-800 transition-all shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
                        >
                            個別相談で先にライフプランを整理する
                        </a>
                        <a
                            href="mailto:hashimoto@sharoushi-t.com"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-stone-700 font-bold text-sm bg-white border border-stone-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-800 transition-all"
                        >
                            <Mail className="w-4 h-4" />
                            公開通知を希望する
                        </a>
                    </div>
                </div>

                <p className="mt-10 text-stone-400 text-xs text-center">
                    公開予定や仕様は変更となる場合があります。
                </p>
            </main>

            <footer className="border-t border-stone-200 py-8 bg-white">
                <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center text-stone-400 text-xs">
                    &copy; {new Date().getFullYear()} 橋本社会保険労務士事務所
                </div>
            </footer>
        </div>
    );
};
