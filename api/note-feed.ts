/**
 * Vercel Edge Function: note.com の RSS フィードを取得して JSON で返す
 *
 * - フロントエンドから `/api/note-feed` を呼び出すと最新記事 5 件を返す
 * - CDN でキャッシュするため、note 側に負荷をかけず HP も高速
 * - フェッチ失敗時は空配列を返し、UI 側でセクションを非表示にする
 */

export const config = { runtime: 'edge' };

const NOTE_RSS_URL = 'https://note.com/brainy_racoon772/rss';
const MAX_ITEMS = 5;
const EXCERPT_LENGTH = 140;

type Article = {
    title: string;
    link: string;
    pubDate: string;
    description: string;
};

function decodeEntities(s: string): string {
    return s
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function extractTag(block: string, tag: string): string {
    const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`);
    const m = block.match(re);
    if (!m) return '';
    return decodeEntities(m[1].replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim());
}

function stripHtml(s: string): string {
    return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function parseRss(xml: string): Article[] {
    const items: Article[] = [];
    const itemRe = /<item>([\s\S]*?)<\/item>/g;
    let m: RegExpExecArray | null;
    while ((m = itemRe.exec(xml)) !== null) {
        const block = m[1];
        const description = stripHtml(extractTag(block, 'description'));
        items.push({
            title: extractTag(block, 'title'),
            link: extractTag(block, 'link'),
            pubDate: extractTag(block, 'pubDate'),
            description:
                description.length > EXCERPT_LENGTH
                    ? `${description.slice(0, EXCERPT_LENGTH)}…`
                    : description,
        });
    }
    return items;
}

export default async function handler(): Promise<Response> {
    try {
        const res = await fetch(NOTE_RSS_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; sharoushi-t.com/1.0; +https://sharoushi-t.com)',
                Accept: 'application/rss+xml, application/xml, text/xml',
            },
        });
        if (!res.ok) {
            return new Response(JSON.stringify({ items: [], error: `upstream_${res.status}` }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Cache-Control': 'public, s-maxage=60',
                },
            });
        }
        const xml = await res.text();
        const items = parseRss(xml).slice(0, MAX_ITEMS);
        return new Response(JSON.stringify({ items }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                // CDN で 30 分キャッシュ、最大 1 時間まで stale を許容
                'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=3600',
            },
        });
    } catch (err) {
        return new Response(JSON.stringify({ items: [], error: String(err) }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Cache-Control': 'public, s-maxage=60',
            },
        });
    }
}
