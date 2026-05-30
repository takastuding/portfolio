const steps = [
    ['日時を選ぶ', '予約カレンダーから空いている土日祝の時間枠を選択します。'],
    ['相談内容を送る', 'お名前、メールアドレス、相談したい内容を簡単に入力してください。'],
    ['確認メールを受け取る', '予約内容とオンライン面談の詳細をメールでお送りします。'],
    ['オンラインで相談', 'ZoomまたはGoogle Meetで、60分じっくり整理します。'],
];

export const HowItWorks = () => {
    return (
        <section id="how-it-works" className="paper-section">
            <div className="wrap">
                <div className="sec-head">
                    <div className="label"><span className="num">06 / FLOW</span></div>
                    <div>
                        <h2>初めての方でも、相談まで迷わない流れです。</h2>
                        <p className="lede">
                            「まず話して整理したい」という段階でも大丈夫です。初回相談で無理な契約をおすすめすることはありません。
                        </p>
                    </div>
                </div>

                <div className="process process-four">
                    {steps.map(([title, body]) => (
                        <article className="step" key={title}>
                            <div className="pn" />
                            <h3>{title}</h3>
                            <div className="dur">ONLINE / 60 MIN</div>
                            <p>{body}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
