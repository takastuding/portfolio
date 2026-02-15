export const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-navy-950 relative border-t border-slate-800">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-6">
                    お問い合わせ
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                    お仕事のご依頼、ご相談はCrowdWorksのメッセージ機能、または下記フォームよりご連絡ください。<br className="hidden md:block" />
                    2営業日以内に返信させていただきます。
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <a
                        href="#"
                        className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-lg text-navy-950 bg-gold-500 hover:bg-white transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                    >
                        CrowdWorksで相談する
                    </a>
                    <a
                        href="mailto:contact@example.com"
                        className="inline-flex items-center justify-center px-8 py-4 border border-slate-600 text-base font-medium rounded-lg text-white hover:bg-white/10 transition-colors backdrop-blur-sm"
                    >
                        メールで問い合わせる
                    </a>
                </div>
            </div>
        </section>
    );
};
