const reasons = [
    {
        title: '現役会社員だからわかる、現場のリアル',
        body: '制度の正しさだけでなく、実際に運用できるか、従業員へどう伝わるかまで意識して助言します。',
        tag: 'PRACTICAL',
    },
    {
        title: '社労士 × 1級FP技能士の横断視点',
        body: '労務とお金は切り離せません。社会保険、年金、退職、独立、資産形成を一つの流れで整理します。',
        tag: 'CROSS FIELD',
    },
    {
        title: '土日祝中心のオンライン対応',
        body: '平日は本業で忙しい方も相談しやすいよう、週末のオンライン相談を中心に受け付けています。',
        tag: 'ONLINE',
    },
];

export const WhyUs = () => {
    return (
        <section id="why-us">
            <div className="wrap">
                <div className="sec-head">
                    <div className="label"><span className="num">05 / WHY US</span></div>
                    <div>
                        <h2>制度を知っているだけでは足りない。使える助言にこだわります。</h2>
                        <p className="lede">
                            法律・制度・家計の見通しを、実際の意思決定に結びつけるための小さな翻訳を積み重ねます。
                        </p>
                    </div>
                </div>

                <div className="what-grid">
                    {reasons.map((reason, index) => (
                        <article className="what" key={reason.title}>
                            <div className="n">{String.fromCharCode(65 + index)} / {reason.tag}</div>
                            <h3>{reason.title}</h3>
                            <p>{reason.body}</p>
                            <div className="topics">
                                <span className="topic">労務相談</span>
                                <span className="topic">社会保険</span>
                                <span className="topic">年金</span>
                                <span className="topic">ライフプラン</span>
                            </div>
                        </article>
                    ))}
                </div>

                <div id="lifeplan" className="lp-teaser">
                    <div className="lt-photo duo">
                        <img src="/mock/quiet-office.png" alt="ライフプランを考える静かなオフィス" loading="lazy" />
                    </div>
                    <div className="lt-body">
                        <div className="lt-k">LIFEPLAN SIMULATOR</div>
                        <h3>退職・独立・転職の前に、資産推移をざっくり見てみる。</h3>
                        <p>
                            現在の年齢、収入、生活費、貯蓄などを入れるだけで、簡易的なライフプランを確認できます。
                            相談前の整理ツールとしてご利用ください。
                        </p>
                        <a className="lt-cta" href="#/lifeplan">シミュレーションへ進む →</a>
                        <div className="lt-mini">
                            <div className="m"><strong>無料</strong>登録不要</div>
                            <div className="m"><strong>3分</strong>入力目安</div>
                            <div className="m"><strong>相談連携</strong>結果を予約へ添付</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
