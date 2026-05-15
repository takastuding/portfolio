import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ArrowUpRight, Calendar } from 'lucide-react';

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

type NoteArticlesProps = {
    mockItems?: Article[];
};

export const NoteArticles = ({ mockItems }: NoteArticlesProps = {}) => {
    const [articles, setArticles] = useState<Article[] | null>(mockItems ?? null);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        if (mockItems) return;

        let aborted = false;
        fetch('/api/note-feed')
            .then((r) => r.json())
            .then((data: { items?: Article[] }) => {
                if (aborted) return;
                if (data.items && data.items.length > 0) setArticles(data.items);
                else setFailed(true);
            })
            .catch(() => {
                if (!aborted) setFailed(true);
            });
        return () => {
            aborted = true;
        };
    }, [mockItems]);

    // フェッチ失敗 or 空配列の場合はセクションごと非表示
    if (failed || (articles && articles.length === 0)) return null;

    return (
        <section id="articles" className="py-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-100/20 rounded-full blur-3xl" />

            <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 flex items-end justify-between gap-6 flex-wrap"
                >
                    <div>
                        <p className="section-label mb-3">07 — Articles</p>
                        <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900">
                            発信・コラム
                        </h2>
                        <div className="mt-4 h-px w-16 bg-gradient-to-r from-blue-600 to-transparent" />
                        <p className="mt-4 text-stone-500 text-sm max-w-xl leading-relaxed [text-wrap:pretty]">
                            note にて、社会保険・年金・ライフプランに関する記事を継続的に発信しています。
                        </p>
                    </div>
                    <a
                        href="https://note.com/brainy_racoon772"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-blue-800 text-xs font-bold bg-white border border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                        note の記事一覧へ
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {articles
                        ? articles.map((a, index) => (
                              <motion.a
                                  key={a.link}
                                  href={a.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  initial={{ opacity: 0, y: 16 }}
                                  whileInView={{ opacity: 1, y: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.4, delay: (index % 3) * 0.08 }}
                                  className="group relative bg-white rounded-2xl border border-blue-100 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300"
                              >
                                  <div className="flex items-center gap-1.5 mb-3 text-stone-400 text-[10px] font-bold tracking-widest uppercase">
                                      <Calendar className="w-3 h-3" />
                                      <time dateTime={a.pubDate}>{formatDate(a.pubDate)}</time>
                                  </div>
                                  <h3 className="text-navy-900 font-bold text-base leading-snug mb-2 group-hover:text-blue-800 transition-colors [text-wrap:pretty]">
                                      {a.title}
                                  </h3>
                                  {a.description && (
                                      <p className="text-stone-500 text-xs leading-relaxed line-clamp-3 [text-wrap:pretty]">
                                          {a.description}
                                      </p>
                                  )}
                                  <div className="mt-4 inline-flex items-center gap-1 text-blue-700 text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                      <BookOpen className="w-3 h-3" />
                                      記事を読む
                                      <ArrowUpRight className="w-3 h-3" />
                                  </div>
                              </motion.a>
                          ))
                        : Array.from({ length: 3 }).map((_, i) => (
                              <div
                                  key={i}
                                  className="bg-white rounded-2xl border border-blue-100 p-6 animate-pulse"
                                  aria-hidden="true"
                              >
                                  <div className="h-3 w-24 bg-stone-100 rounded mb-3" />
                                  <div className="h-5 w-full bg-stone-100 rounded mb-2" />
                                  <div className="h-5 w-3/4 bg-stone-100 rounded mb-4" />
                                  <div className="h-3 w-full bg-stone-100 rounded mb-1" />
                                  <div className="h-3 w-5/6 bg-stone-100 rounded" />
                              </div>
                          ))}
                </div>
            </div>
        </section>
    );
};
