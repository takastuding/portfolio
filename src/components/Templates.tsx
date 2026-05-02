import { motion } from 'framer-motion';
import { FileCheck, RefreshCw, MessageSquareText, ArrowRight, Check, ShieldCheck } from 'lucide-react';

const STRIPE_PAYMENT_LINK = '#';

const features = [
    {
        icon: FileCheck,
        title: '就業規則ひな形一式',
        desc: '本則・付随規程（給与・育児介護休業・ハラスメント 等）をWord / PDF形式で提供。自社向けにそのまま編集可能です。',
    },
    {
        icon: RefreshCw,
        title: '法改正の差分アップデート',
        desc: '改正施行日に合わせて最新版を配信。「どこが、なぜ変わったのか」を現役社員目線のコメント付きで解説。',
    },
    {
        icon: MessageSquareText,
        title: '運用上の疑問は都度サポート',
        desc: 'サブスク会員様限定で、ひな形の運用に関するちょっとした疑問をメールで受付（回答は週末まとめ）。',
    },
];

const audiences = [
    '中小企業の人事・総務担当者',
    '開業準備中の社労士・コンサルタント',
    '副業で規程づくりを任された方',
    '就業規則を「買い切り」ではなく運用し続けたい方',
];

const faqs = [
    {
        q: '解約はいつでもできますか？',
        a: '次回決済日の前日までに解約手続きを行えば、追加請求なく終了できます。解約後は最新版のダウンロードが停止しますが、それまでにダウンロード済みのファイルは引き続きご利用いただけます。',
    },
    {
        q: '自社用に内容を改変しても問題ありませんか？',
        a: 'はい、購入いただいたひな形はご契約企業様の範囲内で自由に改変・運用いただけます。二次配布・転売はご遠慮ください。',
    },
    {
        q: '個別の規程カスタマイズはしてもらえますか？',
        a: 'サブスクは汎用ひな形の提供までが標準です。御社特有の事情を踏まえた個別設計をご希望の場合は、別途コンサルティングとしてお見積りいたします（ネット相談からご依頼ください）。',
    },
    {
        q: '支払い方法は？',
        a: 'Stripeによるクレジットカード決済です（Visa / Mastercard / JCB / AMEX ほか）。領収書・インボイスの発行にも対応しています。',
    },
];

export const Templates = () => {
    const isPaymentLinkSet = STRIPE_PAYMENT_LINK !== '#';

    return (
        <section id="templates" className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-blue-50/30">
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-200/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-stone-100/50 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-14"
                >
                    <p className="section-label mb-3">03 — Templates</p>
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-800">
                        就業規則ひな形 <span className="text-blue-800">サブスク</span>
                    </h2>
                    <div className="mt-4 h-px w-16 bg-gradient-to-r from-blue-600 to-transparent" />
                    <p className="mt-5 text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed">
                        現役社員だからわかる「使える」ひな形を、毎月アップデート。
                        買い切りでは追いつけない法改正にも、会員として継続的に伴走します。
                    </p>
                </motion.div>

                {/* ターゲット */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-12 p-6 rounded-2xl bg-white border border-stone-200 shadow-sm"
                >
                    <p className="text-stone-800 font-bold text-sm mb-4 flex items-center gap-2">
                        <span className="w-1 h-5 rounded-full bg-blue-600 inline-block" />
                        こんな方にご利用いただけます
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-3">
                        {audiences.map(a => (
                            <li key={a} className="flex items-start gap-2 text-stone-600 text-sm">
                                <Check className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                                {a}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* 含まれるもの */}
                <div className="grid md:grid-cols-3 gap-6 mb-14">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                            className="relative p-6 rounded-2xl bg-white border border-stone-200 shadow-sm hover:border-blue-300 hover:shadow-[0_8px_30px_rgba(37,99,235,0.1)] transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <f.icon className="w-5 h-5 text-blue-800" />
                            </div>
                            <h3 className="text-stone-800 font-bold text-base mb-2">{f.title}</h3>
                            <p className="text-stone-500 text-xs leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* プラン */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative rounded-3xl overflow-hidden bg-stone-900 text-white p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.15)] mb-16"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.2),transparent_50%)]" />
                    <div className="relative grid lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <p className="text-blue-400 font-display text-xs tracking-[0.25em] font-bold mb-3">STANDARD PLAN</p>
                            <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">
                                まずは1ヶ月、<br />現場のひな形を使ってみる。
                            </h3>
                            <p className="text-stone-300 text-sm leading-relaxed">
                                就業規則本体＋付随規程一式＋改正アップデート＋運用サポートまですべて含んだベーシックプラン。
                                途中解約自由なので、試しに導入もOKです。
                            </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="font-display text-5xl font-black text-white">¥2,980</span>
                                <span className="text-stone-400 text-sm">/月（税込）</span>
                            </div>
                            <p className="text-xs text-stone-400 mb-5">※ 価格は準備中のため変更される可能性があります</p>
                            <ul className="space-y-2 mb-6">
                                {['就業規則本体 (Word / PDF)', '付随規程セット', '法改正アップデート配信', '運用サポート（メール）', '解約はいつでも可'].map(item => (
                                    <li key={item} className="flex items-start gap-2 text-stone-200 text-xs">
                                        <Check className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={isPaymentLinkSet ? STRIPE_PAYMENT_LINK : '#contact'}
                                target={isPaymentLinkSet ? '_blank' : undefined}
                                rel={isPaymentLinkSet ? 'noopener noreferrer' : undefined}
                                aria-disabled={!isPaymentLinkSet}
                                className={`group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                                    isPaymentLinkSet
                                        ? 'bg-blue-600 hover:bg-blue-400 text-stone-900 shadow-[0_4px_20px_rgba(251,191,36,0.35)]'
                                        : 'bg-stone-700 text-stone-300 cursor-not-allowed'
                                }`}
                            >
                                {isPaymentLinkSet ? 'サブスクを申し込む' : '準備中（先行案内はお問い合わせから）'}
                                {isPaymentLinkSet && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </a>
                            <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-stone-400">
                                <ShieldCheck className="w-3 h-3" />
                                Stripe による安全な決済
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* FAQ */}
                <div>
                    <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-stone-800 font-bold text-lg mb-5 flex items-center gap-2"
                    >
                        <span className="w-1 h-5 rounded-full bg-blue-600 inline-block" />
                        よくあるご質問
                    </motion.h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={faq.q}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                                className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm"
                            >
                                <p className="text-stone-800 font-bold text-sm mb-2 flex gap-2">
                                    <span className="text-blue-700 font-display font-black">Q.</span>
                                    {faq.q}
                                </p>
                                <p className="text-stone-500 text-xs leading-relaxed pl-5">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
