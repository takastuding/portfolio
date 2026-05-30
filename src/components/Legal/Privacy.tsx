import { LegalLayout } from './LegalLayout';

type Section = { heading: string; body: React.ReactNode };

const sections: Section[] = [
    {
        heading: '1. 基本方針',
        body: (
            <p>
                橋本社会保険労務士事務所（以下「当事務所」といいます）は、お客様の個人情報の重要性を認識し、個人情報の保護に関する法律、関連法令およびガイドラインを遵守し、適切な取扱いに努めます。
            </p>
        ),
    },
    {
        heading: '2. 取得する情報',
        body: (
            <>
                <p>当事務所は、以下の情報をお客様からのご登録・お問い合わせ・ご予約等の機会に取得します。</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                    <li>お名前、メールアドレスその他のご連絡先</li>
                    <li>ご相談内容、ご質問内容</li>
                    <li>ご予約日時その他サービスのご利用に必要な情報</li>
                    <li>決済に必要な情報（Stripeを通じて取得するものを含みます）</li>
                    <li>Cookie、アクセスログ、IPアドレス等の技術情報</li>
                </ul>
            </>
        ),
    },
    {
        heading: '3. 利用目的',
        body: (
            <>
                <p>取得した情報は、次の目的のために利用します。</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                    <li>お問い合わせ・ご予約・ご相談への対応</li>
                    <li>本サービスの提供、維持、改善</li>
                    <li>ご契約・ご請求・決済に関する事務処理</li>
                    <li>法令・ガイドラインに基づく対応</li>
                    <li>お知らせ・重要な変更のご連絡</li>
                </ul>
            </>
        ),
    },
    {
        heading: '4. 第三者提供',
        body: (
            <p>
                当事務所は、法令で認められる場合を除き、お客様の個人情報をご本人の同意なく第三者に提供することはありません。ただし、決済処理のためにStripe, Inc.等の決済事業者、メール送信のためにResend, Inc.等のサービス、予約・データ保管のためにSupabase, Inc.等のクラウドインフラ事業者を利用しており、業務遂行に必要な範囲でこれらの委託先に情報を取り扱わせることがあります。
            </p>
        ),
    },
    {
        heading: '5. Cookie・アクセス解析',
        body: (
            <p>
                当サイトでは、利用状況の把握および改善のため、Cookieおよび類似技術を利用することがあります。これらの情報には個人を直接特定する情報は含まれません。ブラウザの設定からCookieの受け入れを拒否することも可能ですが、その場合、一部機能がご利用いただけないことがあります。
            </p>
        ),
    },
    {
        heading: '6. 安全管理措置',
        body: (
            <p>
                当事務所は、個人情報の漏えい、滅失または毀損の防止その他の安全管理のために、必要かつ適切な措置を講じます。
            </p>
        ),
    },
    {
        heading: '7. 開示・訂正・利用停止',
        body: (
            <p>
                お客様ご本人から、ご自身の個人情報の開示・訂正・利用停止等のご請求をいただいた場合は、ご本人確認の上、法令に従って対応いたします。ご請求は下記のお問い合わせ先までご連絡ください。
            </p>
        ),
    },
    {
        heading: '8. 守秘義務',
        body: (
            <p>
                当事務所の代表者は社会保険労務士であり、社会保険労務士法第21条に基づき、業務上知り得たお客様の情報について守秘義務を負います。
            </p>
        ),
    },
    {
        heading: '9. 改定',
        body: (
            <p>
                本ポリシーの内容は、法令の改正その他の事情により変更されることがあります。変更後の内容は、本ウェブサイトに掲載した時点から効力を生じるものとします。
            </p>
        ),
    },
    {
        heading: '10. お問い合わせ窓口',
        body: (
            <p>
                本ポリシーに関するお問い合わせは、下記までご連絡ください。
                <br />
                橋本社会保険労務士事務所
                <br />
                メール：
                <a href="mailto:hashimoto@sharoushi-t.com" className="text-blue-800 hover:underline">
                    hashimoto@sharoushi-t.com
                </a>
            </p>
        ),
    },
];

export const Privacy = () => {
    return (
        <LegalLayout
            title="プライバシーポリシー"
            subtitle="当事務所における個人情報のお取り扱いについてご説明します。"
            lastUpdated="2026年4月23日"
        >
            <div className="space-y-8">
                {sections.map((s) => (
                    <section key={s.heading}>
                        <h2>
                            <span className="legal-h2-mark" />
                            {s.heading}
                        </h2>
                        <div>{s.body}</div>
                    </section>
                ))}
            </div>
        </LegalLayout>
    );
};
