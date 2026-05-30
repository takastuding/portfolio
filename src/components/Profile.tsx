const career = [
    ['大学卒業後', '大手損害保険会社へ入社'],
    ['在職中', '社会保険労務士・1級FP技能士の資格を取得'],
    ['現在', '現役会社員として働きながら、土日祝を中心に相談対応'],
];

export const Profile = () => {
    return (
        <section id="profile">
            <div className="wrap">
                <div className="sec-head">
                    <div className="label"><span className="num">07 / PROFILE</span></div>
                    <div>
                        <h2>会社員として働く感覚と、専門家としての視点を両方持っています。</h2>
                    </div>
                </div>

                <div className="profile">
                    <figure className="profile-fig">
                        <img src="/profile.png" alt="橋本社会保険労務士事務所 プロフィール写真" loading="lazy" />
                    </figure>

                    <div>
                        <blockquote>
                            「わからない制度」を、あなたの状況で使える選択肢に変える。
                            そのための相談相手でありたいと考えています。
                        </blockquote>
                        <div className="pname">橋本社会保険労務士事務所</div>
                        <div className="ptitle">社会保険労務士 / 1級ファイナンシャル・プランニング技能士</div>
                        <p className="pbio">
                            大手損害保険会社で保険業務や顧客対応に従事する中で、中小企業の経営者や個人が抱える
                            「人」と「お金」の課題に直面。より専門的に支援するため、社会保険労務士資格を取得しました。
                            現在も現役会社員として働きながら、週末を中心に就業規則、社会保険、個人のFP相談に対応しています。
                        </p>

                        <div className="career">
                            {career.map(([year, title]) => (
                                <div className="career-row" key={year}>
                                    <span className="y">{year}</span>
                                    <span className="t">{title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
