import { Header } from './components/Header';
import { Booking } from './components/Booking';
import { Footer } from './components/Footer';
import { Tokushoho } from './components/Legal/Tokushoho';
import { Privacy } from './components/Legal/Privacy';
import { Terms } from './components/Legal/Terms';
import { useLegalRoute, useBookingManageToken } from './lib/useHashRoute';
import { BookingManage } from './components/BookingManage';

type Cell = { src: string; alt: string; id?: string };

function SectionRow({ cells }: { cells: [Cell, Cell, Cell] }) {
    return (
        <div className="grid grid-cols-3">
            {cells.map(({ src, alt, id }) => (
                <div key={src} id={id}>
                    <img src={src} alt={alt} className="w-full block" loading="lazy" />
                </div>
            ))}
        </div>
    );
}

function App() {
    const legalRoute = useLegalRoute();
    const manageToken = useBookingManageToken();

    if (manageToken) return <BookingManage token={manageToken} />;
    if (legalRoute === 'tokushoho') return <Tokushoho />;
    if (legalRoute === 'privacy') return <Privacy />;
    if (legalRoute === 'terms') return <Terms />;

    return (
        <div className="min-h-screen font-sans text-stone-800 bg-white">
            <Header />
            <main className="pt-20">
                {/* Row 1: ヒーロー / サービス / 写真 */}
                <SectionRow cells={[
                    { src: '/sections/01-hero.png',        alt: '人と企業の未来を支える信頼のパートナー', id: 'top' },
                    { src: '/sections/02-services.png',    alt: '服務内容のご案内', id: 'services' },
                    { src: '/sections/03-photo-tagline.png', alt: '信頼と実績の社労士事務所' },
                ]} />

                {/* Row 2: お悩み / 選ばれる理由 / 相談の流れ */}
                <SectionRow cells={[
                    { src: '/sections/04-pain-points.png',  alt: 'このようなお悩みはありませんか' },
                    { src: '/sections/05-why-us-icons.png', alt: '当事務所が選ばれる3つの理由', id: 'why-us' },
                    { src: '/sections/06-flow.png',          alt: '相談の流れ', id: 'how-it-works' },
                ]} />

                {/* Row 3: 理由詳細 / CTAバナー / プロフィール */}
                <SectionRow cells={[
                    { src: '/sections/07-why-us-detail.png', alt: '選ばれる3つの理由の詳細' },
                    { src: '/sections/08-cta-banner.png',    alt: '初回相談は無料です' },
                    { src: '/sections/09-profile.png',       alt: 'プロフィール', id: 'profile' },
                ]} />

                {/* 予約フォーム（HTML維持） */}
                <div id="booking">
                    <Booking />
                </div>

                {/* Row 4: 特徴 / お客様の声 / お問い合わせ */}
                <SectionRow cells={[
                    { src: '/sections/10-features.png',     alt: 'サービスの特徴' },
                    { src: '/sections/11-testimonials.png', alt: 'お客様の声' },
                    { src: '/sections/12-contact.png',      alt: 'お問い合わせ・電話番号', id: 'contact' },
                ]} />
            </main>
            <Footer />
        </div>
    );
}

export default App;
