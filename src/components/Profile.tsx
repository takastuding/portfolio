import { CheckCircle2 } from 'lucide-react';

export const Profile = () => {
    const qualifications = [
        '社会保険労務士',
        '1級ファイナンシャル・プランニング技能士',
        '年金アドバイザー',
    ];

    return (
        <section id="profile" className="py-20 bg-navy-950 relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="lg:text-center mb-16">
                    <h2 className="text-base text-gold-500 font-semibold tracking-wide uppercase">Profile</h2>
                    <p className="mt-2 text-3xl leading-8 font-bold text-white sm:text-4xl">
                        プロフィール・保有資格
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-slate-300 lg:mx-auto">
                        金融機関での豊富な実務経験と、社会保険労務士としての専門知識を融合させ、
                        企業のお金の悩みと人の悩みを同時に解決へ導きます。
                    </p>
                </div>

                <div className="glass rounded-3xl p-8 md:p-12 border border-white/5">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">

                        <div className="flex-1 space-y-6">
                            <h3 className="text-2xl font-bold text-white border-l-4 border-gold-500 pl-4">保有資格</h3>
                            <ul className="space-y-4">
                                {qualifications.map((qual) => (
                                    <li key={qual} className="flex items-center bg-white/5 p-4 rounded-lg border border-white/5 hover:bg-white/10 transition-colors">
                                        <CheckCircle2 className="flex-shrink-0 h-6 w-6 text-gold-500" />
                                        <span className="ml-3 text-lg font-medium text-slate-200">{qual}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex-1 text-slate-300 leading-relaxed text-lg space-y-6">
                            <p>
                                大学卒業後、地方銀行に入行。法人融資、資産運用相談業務に従事する中で、
                                中小企業の経営者が抱える「人」と「お金」の課題に直面し、
                                より専門的なサポートを行うために社会保険労務士資格を取得。
                            </p>
                            <p>
                                現在は金融機関に勤務しながら、副業として執筆活動や監修、個別相談などを行っています。
                                <span className="text-gold-400 font-bold">「分かりにくい制度を分かりやすく」</span>をモットーに、専門用語を使わない丁寧な説明を心がけています。
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
