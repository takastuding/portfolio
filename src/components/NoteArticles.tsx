import { useEffect, useState } from 'react';

type Article = {
    title: string;
    link: string;
    pubDate: string;
    description: string;
};

function formatDate(pubDate: string): string {
    const d = new Date(pubDate);
    if (Number.isNaN(d.getTime())) return '';
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

const fallbackItems: Article[] = [
    {
        title: '就業規則を「読まれるもの」にするための小さな工夫',
        link: 'https://note.com/brainy_racoon772',
        pubDate: '2026-05-02',
        description: '規程を作るだけで終わらせないための、説明と運用の考え方。',
    },
    {
        title: '退職・独立前に確認したい社会保険と年金のポイント',
        link: 'https://note.com/brainy_racoon772',
        pubDate: '2026-04-21',
        description: '働き方を変える前に、保険・年金・家計の見通しを整理します。',
    },
    {
        title: '副業・フリーランス相談でよく出る三つの不安',
        link: 'https://note.com/brainy_racoon772',
        pubDate: '2026-03-27',
        description: '労務とお金の両面から、判断材料を増やすための視点。',
    },
];

type NoteArticlesProps = {
    mockItems?: Article[];
};

export const NoteArticles = ({ mockItems }: NoteArticlesProps = {}) => {
    const [articles, setArticles] = useState<Article[]>(mockItems ?? fallbackItems);

    useEffect(() => {
        if (mockItems) return;

        let aborted = false;
        fetch('/api/note-feed')
            .then(r => r.json())
            .then((data: { items?: Article[] }) => {
                if (!aborted && data.items?.length) setArticles(data.items.slice(0, 4));
            })
            .catch(() => undefined);
        return () => {
            aborted = true;
        };
    }, [mockItems]);

    return (
        <section id="articles" className="paper-section">
            <div className="wrap">
                <div className="sec-head">
                    <div className="label"><span className="num">09 / JOURNAL</span></div>
                    <div>
                        <h2>発信・コラム</h2>
                        <p className="lede">
                            社会保険、年金、就業規則、ライフプランについて、相談現場でよく出るテーマを中心に発信しています。
                        </p>
                    </div>
                </div>

                <div className="news-list">
                    {articles.map(article => (
                        <a className="news-row" key={article.link + article.title} href={article.link} target="_blank" rel="noopener noreferrer">
                            <span className="date">{formatDate(article.pubDate)}</span>
                            <span className="cat">NOTE</span>
                            <span className="ttl">{article.title}</span>
                            <span className="arr">→</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
