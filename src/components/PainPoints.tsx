import { FileText, MessagesSquare, Scale } from 'lucide-react';

const reasons = [
    {
        icon: MessagesSquare,
        title: '所長が一人で伴走',
        body: '初回相談から書類整理、方針決定まで、社会保険労務士本人が窓口になります。相談内容が途中で伝言ゲームにならない体制を大切にしています。',
    },
    {
        icon: FileText,
        title: 'テンプレートで終わらせない',
        body: '就業規則や手続きは、会社の規模、働き方、現場の運用に合わせて使える形へ調整します。なぜ必要かまで説明します。',
    },
    {
        icon: Scale,
        title: '会社と個人の両側を見る',
        body: '労務の制度と、個人の年金・家計・働き方をつなげて考えます。社労士と1級FP技能士の視点を横断して整理します。',
    },
];

export const PainPoints = () => {
    return (
        <section id="about">
            <div className="wrap">
                <div className="sec-head">
                    <div className="label"><span className="num">01 / APPROACH</span></div>
                    <div>
                        <h2>制度を、現場と暮らしで使える言葉に翻訳します。</h2>
                        <p className="lede">
                            年金、社会保険、就業規則、助成金、退職や独立の判断。
                            複雑な制度をただ説明するのではなく、あなたの状況で何をすればよいかまで落とし込みます。
                        </p>
                    </div>
                </div>

                <div className="reasons">
                    {reasons.map((reason, index) => (
                        <article className="reason" key={reason.title}>
                            <div className="num-big">{String(index + 1).padStart(2, '0')}</div>
                            <div className="ic"><reason.icon size={20} strokeWidth={1.5} /></div>
                            <h3>{reason.title}</h3>
                            <p>{reason.body}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
