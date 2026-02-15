export const Footer = () => {
    return (
        <footer className="bg-navy-950 text-white py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0 text-center md:text-left">
                        <span className="text-xl font-bold flex items-center justify-center md:justify-start gap-2">
                            <span className="text-gold-500">◆</span> 社労士・FP事務所
                        </span>
                        <p className="text-sm text-slate-400 mt-2">
                            金融出身の社会保険労務士・FP1級・年金アドバイザー
                        </p>
                    </div>
                    <div className="text-sm text-slate-500">
                        &copy; {new Date().getFullYear()} Social Insurance Labor Consultant Office.<br className="md:hidden" /> All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};
