type HeroProps = {
    visualSrc?: string;
};

const kpis = [
    { value: '15+', label: 'YEARS', text: '保険・労務領域の実務経験' },
    { value: '2', label: 'LICENSES', text: '社労士 / 1級FP技能士' },
    { value: '60', label: 'MIN', text: '初回オンライン相談・無料' },
];

const targets = ['中小企業・事業主', '人事・総務', '働く個人'];

export const Hero = ({ visualSrc = '/mock/consultation-desk.png' }: HeroProps) => {
    return (
        <section id="top" className="hero">
            <div className="wrap">
                <div className="hero-inner">
                    <div className="hero-head">
                        <div className="hero-meta">
                            <span className="dot" />
                            <span className="mono">SOCIAL INSURANCE × FP / WEEKEND ONLINE</span>
                        </div>

                        <h1>
                            <span className="line">会社の労務も、個人のお金も。</span>
                            <span className="line">
                                <span className="em">ひとりの専門家</span>に相談できる。
                            </span>
                        </h1>

                        <p className="hero-sub serif">
                            社会保険労務士／1級FP技能士による、労務とライフプランの相談窓口です。
                        </p>
                    </div>

                    <figure className="hero-fig">
                        <img src={visualSrc} alt="オンライン相談に使う社労士事務所のデスク" loading="eager" />
                        <figcaption className="badge">FIRST 60MIN — FREE</figcaption>
                    </figure>

                    <div className="hero-body">
                        <p className="hero-lead">
                            中小企業の労務・社会保険・就業規則から、働く個人の年金・退職・ライフプランまで。
                            会社と個人の両側に立ち、専門用語をかみ砕いて、次に取るべき一歩を一緒に整理します。
                        </p>

                        <div className="hero-targets" aria-label="主な対象">
                            {targets.map(item => (
                                <span key={item}>{item}</span>
                            ))}
                        </div>

                        <div className="hero-cta">
                            <a className="cta" href="#booking">初回60分無料で相談する <span className="mono">→</span></a>
                            <a className="btn-ghost" href="#services">サービスを見る <span className="mono">↓</span></a>
                        </div>

                        <div className="hero-kpis" aria-label="事務所の特徴">
                            {kpis.map(item => (
                                <div key={item.label}>
                                    <strong>{item.value}</strong>
                                    <span className="mono">{item.label}</span>
                                    <p>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="wrap">
                <div className="marquee-strip">
                    <div className="item">対応領域 <span>労務 / 社保 / FP</span></div>
                    <span className="sep">/</span>
                    <div className="item">相談形式 <span>オンライン中心</span></div>
                    <span className="sep">/</span>
                    <div className="item">初回相談 <span>60分無料</span></div>
                    <span className="sep">/</span>
                    <div className="item">受付 <span>土日祝を中心に対応</span></div>
                </div>
            </div>
        </section>
    );
};
