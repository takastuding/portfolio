const guides = [
    {
        num: '01',
        label: '法人・事業主向け',
        title: '就業規則の作成・見直し',
        body: '現行規程のレビューから起草・届出まで。現場で使われる形に整えます。',
        href: '#services',
        cta: '詳しく見る',
    },
    {
        num: '02',
        label: '法人・事業主向け',
        title: '労務・社会保険手続き',
        body: '入退社、産育休、給与計算、助成金申請など社会保険全般を支援します。',
        href: '#services',
        cta: '詳しく見る',
    },
    {
        num: '03',
        label: '個人向け',
        title: 'ライフプラン・年金相談',
        body: '退職・転職・独立・老後資金。FP視点で家計と年金の見通しを整理します。',
        href: '#/lifeplan',
        cta: 'シミュレーションを試す',
    },
    {
        num: '04',
        label: '初回無料',
        title: '60分・初回相談を予約する',
        body: 'まず話して整理したい段階でも大丈夫。カレンダーから日時を選ぶだけで完結します。',
        href: '#booking',
        cta: '予約する →',
        accent: true,
    },
];

export const PageGuide = () => {
    return (
        <section id="page-guide" className="page-guide">
            <div className="wrap">
                <div className="page-guide-head">
                    <span className="num">このページでできること</span>
                </div>
                <div className="page-guide-grid">
                    {guides.map(g => (
                        <a
                            key={g.num}
                            href={g.href}
                            className={`pg-card ${g.accent ? 'pg-card--accent' : ''}`}
                        >
                            <span className="pg-num mono">{g.num}</span>
                            <span className="pg-label mono">{g.label}</span>
                            <h3 className="pg-title serif">{g.title}</h3>
                            <p className="pg-body">{g.body}</p>
                            <span className="pg-cta">{g.cta} <span className="mono">→</span></span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
