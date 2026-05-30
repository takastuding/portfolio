const rulesProcess = [
    ['ヒアリング', 'WEEK 1 / 90 MIN', '経営者・担当者から事業の状態、雇用形態、現在の運用を伺います。'],
    ['現場確認', 'WEEK 2', '必要に応じて管理職や現場の声も確認し、規程が動く前提をそろえます。'],
    ['レビュー', 'WEEK 3-4', '既存規程や運用の課題を洗い出し、優先順位をつけます。'],
    ['起草・調整', 'WEEK 5-10', '規程案を作成し、説明しながら複数回の修正を行います。'],
    ['納品・届出', 'WEEK 11-12', '就業規則一式、運用ハンドブック、労基署届出まで支援します。'],
];

type SvcCardProps = {
    tag: string;
    num: string;
    photo: string;
    photoAlt: string;
    title: string;
    sub: string;
    body: string;
    items: [string, string][];
    href: string;
    hrefLabel: string;
};

const SvcCard = ({ tag, num, photo, photoAlt, title, sub, body, items, href, hrefLabel }: SvcCardProps) => (
    <article className="svc">
        <div className="svc-photo">
            <img src={photo} alt={photoAlt} loading="lazy" />
            <div className="svc-tag">{tag}</div>
        </div>
        <div className="svc-inner">
            <span className="num" style={{ marginBottom: 18 }}>{num}</span>
            <h3>{title}</h3>
            <div className="ja-sub">{sub}</div>
            <p>{body}</p>
            <ul>
                {items.map(([label, note]) => (
                    <li key={label}>{label} <span className="mn">{note}</span></li>
                ))}
            </ul>
            <a className="more" href={href}>{hrefLabel}</a>
        </div>
    </article>
);

export const Services = () => {
    return (
        <>
            {/* 法人・事業主 / 個人 2カード */}
            <section id="services" className="paper-section">
                <div className="wrap">
                    <div className="sec-head">
                        <div className="label"><span className="num">02 / SERVICES</span></div>
                        <div>
                            <h2>会社の労務整備と、個人のライフプランを二本立てで支援します。</h2>
                            <p className="lede">
                                中小企業・事業主向けの就業規則・労務サポートと、
                                働く個人向けのFP相談を中心に、「制度をどう使うか」まで一緒に考えます。
                            </p>
                        </div>
                    </div>

                    {/* 法人・事業主向け */}
                    <div className="svc-section-label">
                        <span className="mono">A / 法人・事業主向け</span>
                    </div>
                    <div className="svc-grid">
                        <SvcCard
                            tag="SERVICE 01"
                            num="就業規則の作成・見直し"
                            photo="/mock/documents-detail.png"
                            photoAlt="就業規則と書類の確認"
                            title="就業規則の作成・見直し"
                            sub="RULES OF EMPLOYMENT"
                            body="会社の働き方に合わせて、読みやすく運用しやすい就業規則へ整えます。現場ヒアリング、規程レビュー、運用ガイドまで含めた支援です。"
                            items={[
                                ['初回ヒアリング', '90 MIN'],
                                ['現行規程レビュー', '2 WEEKS'],
                                ['規程ドラフト', '4 WEEKS'],
                                ['運用ガイド作成', 'INCLUDED'],
                                ['労基署届出支援', 'OPTION'],
                            ]}
                            href="#service-rules"
                            hrefLabel="作成プロセスを見る →"
                        />

                        <SvcCard
                            tag="SERVICE 02"
                            num="労務・社会保険手続き"
                            photo="/mock/quiet-office.png"
                            photoAlt="静かな事務所での手続き対応"
                            title="労務・社会保険手続き"
                            sub="LABOR & SOCIAL INSURANCE"
                            body="入退社手続き、産育休の申請、月次社会保険手続き、助成金申請など、継続的な労務サポートに対応します。"
                            items={[
                                ['入退社・資格取得喪失', 'MONTHLY'],
                                ['産育休・休業給付', 'AS NEEDED'],
                                ['助成金申請', 'OPTION'],
                                ['月次相談・緊急対応', 'RETAINER'],
                            ]}
                            href="#booking"
                            hrefLabel="まず相談する →"
                        />
                    </div>

                    {/* 個人向け */}
                    <div className="svc-section-label" style={{ marginTop: 64 }}>
                        <span className="mono">B / 個人向け</span>
                    </div>
                    <div className="svc-grid">
                        <SvcCard
                            tag="SERVICE 03"
                            num="ライフプラン・年金相談"
                            photo="/mock/consultation-desk.png"
                            photoAlt="ライフプラン相談のデスク"
                            title="ライフプラン・年金・FP相談"
                            sub="PERSONAL FINANCIAL PLANNING"
                            body="退職、転職、独立、副業、年金、保険、NISA・iDeCoなどを横断して、働き方とお金の見通しを整理します。"
                            items={[
                                ['初回相談', '60 MIN / FREE'],
                                ['ライフプラン整理', '2 WEEKS'],
                                ['年金・社会保険の確認', 'INCLUDED'],
                                ['退職金・資産形成相談', 'AS NEEDED'],
                                ['オンライン全国対応', 'ONLINE'],
                            ]}
                            href="#/lifeplan"
                            hrefLabel="シミュレーションを試す →"
                        />

                        {/* 初回相談でできることカード */}
                        <article className="svc svc--cta-card">
                            <div className="svc-inner svc-inner--center">
                                <span className="num" style={{ marginBottom: 10 }}>SERVICE 04</span>
                                <div className="ja-sub">FIRST CONSULTATION</div>
                                <h3>初回60分無料相談で<br />できること</h3>
                                <ul className="svc-cta-list">
                                    <li>労務・社保の現状整理と優先順位付け</li>
                                    <li>就業規則の必要性・見直し範囲の確認</li>
                                    <li>退職・転職・独立のお金の見通し</li>
                                    <li>年金・保険の受け取り方の確認</li>
                                    <li>副業・フリーランスの社保と税の整理</li>
                                </ul>
                                <div className="svc-cta-note">無理な契約のおすすめは一切しません。</div>
                                <a className="cta svc-cta-btn" href="#booking">
                                    初回60分無料で相談する <span className="mono">→</span>
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </section>

            {/* 就業規則プロセス */}
            <section id="service-rules">
                <div className="wrap">
                    <div className="sec-head">
                        <div className="label"><span className="num">03 / RULES PROCESS</span></div>
                        <div>
                            <h2>「作って終わり」にしない、3か月の就業規則プロセス。</h2>
                            <p className="lede">
                                会社の現状を聞き、現場で使われる形へ落とし込むため、標準では約3か月を想定しています。
                            </p>
                        </div>
                    </div>

                    <div className="process">
                        {rulesProcess.map(([title, duration, desc]) => (
                            <article className="step" key={title}>
                                <div className="pn" />
                                <h3>{title}</h3>
                                <div className="dur">{duration}</div>
                                <p>{desc}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};
