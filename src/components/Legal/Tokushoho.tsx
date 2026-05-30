import { LegalLayout } from './LegalLayout';

type Row = { label: string; value: React.ReactNode };

const rows: Row[] = [
    { label: '販売事業者', value: '橋本社会保険労務士事務所' },
    { label: '運営責任者', value: '橋本 貴嗣' },
    {
        label: '所在地',
        value: (
            <span className="text-stone-500">
                ご請求をいただいた場合、遅滞なく開示いたします。
                <br />
                <span className="text-stone-400 text-xs">
                    ※ 開示ご希望の方は下記メールアドレスまでご連絡ください。
                </span>
            </span>
        ),
    },
    {
        label: '電話番号',
        value: (
            <span className="text-stone-500">
                ご請求をいただいた場合、遅滞なく開示いたします。
                <br />
                <span className="text-stone-400 text-xs">
                    ※ お問い合わせは原則メールにて承っております。
                </span>
            </span>
        ),
    },
    {
        label: 'メールアドレス',
        value: (
            <a href="mailto:hashimoto@sharoushi-t.com" className="text-blue-800 hover:underline">
                hashimoto@sharoushi-t.com
            </a>
        ),
    },
    {
        label: '販売価格',
        value: (
            <>
                就業規則ひな形サブスク：<strong>月額 2,980円（税込）</strong>
                <br />
                <span className="text-stone-400 text-xs">
                    ※ オンライン個別相談は初回60分無料、継続相談は1時間 5,500円（税込）を予定。正式な料金はご相談後にお見積りとして提示いたします。
                </span>
            </>
        ),
    },
    {
        label: '商品代金以外に必要な料金',
        value: 'インターネット接続料金および通信費（お客様負担）',
    },
    {
        label: 'お支払い方法',
        value: 'クレジットカード決済（Stripe経由／Visa・Mastercard・JCB・AMEX 等）',
    },
    {
        label: 'お支払い時期',
        value: 'お申込時に初回決済、以降は毎月同日に自動課金されます。',
    },
    {
        label: '商品の引渡時期',
        value: '決済完了後、即時にサブスク会員向けコンテンツへのアクセスを付与します。',
    },
    {
        label: '返品・キャンセル',
        value: (
            <>
                デジタルコンテンツの性質上、決済後のご返金・ご返品は原則承っておりません。
                <br />
                次回決済日の前日までに解約手続きを行っていただくことで、以降の課金は発生しません。
                <br />
                <span className="text-stone-400 text-xs">
                    ※ 未ダウンロードであることや当方の重大な契約不履行が認められる場合に限り、個別にご返金対応いたします。
                </span>
            </>
        ),
    },
    {
        label: '動作環境',
        value: (
            <>
                PDF / Word形式のファイルを閲覧・編集できる環境。
                <br />
                オンライン相談：Zoom または Google Meet を利用できる端末・ネットワーク環境。
            </>
        ),
    },
    {
        label: '特別な販売条件',
        value: 'ひな形は購入契約企業様の範囲内でご利用いただけるものとし、二次配布・転売はお断りしております。',
    },
];

export const Tokushoho = () => {
    return (
        <LegalLayout
            title="特定商取引法に基づく表記"
            subtitle="特定商取引法第11条に基づき、本サービスの事業者情報を掲載いたします。"
            lastUpdated="2026年4月23日"
        >
            <dl className="legal-table">
                {rows.map((r) => (
                    <div
                        key={r.label}
                        className="legal-table-row sm:grid-cols-[160px_1fr]"
                    >
                        <dt>{r.label}</dt>
                        <dd>{r.value}</dd>
                    </div>
                ))}
            </dl>

            <p className="mt-6 text-stone-400 text-xs leading-relaxed">
                本表記に関するお問い合わせは、上記メールアドレスまでご連絡ください。ご不明点があれば、合理的な期間内に回答いたします。
            </p>
        </LegalLayout>
    );
};
