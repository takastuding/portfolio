import { lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PageGuide } from './components/PageGuide';
import { PainPoints } from './components/PainPoints';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { HowItWorks } from './components/HowItWorks';
import { Profile } from './components/Profile';
import { Booking } from './components/Booking';
import { Footer } from './components/Footer';
import { NoteArticles } from './components/NoteArticles';
import { CtaStrip } from './components/CtaStrip';
import { MockDesign } from './components/MockDesign';
import { useLegalRoute, useBookingManageToken, useLifeplanRoute } from './lib/useHashRoute';

const Tokushoho = lazy(() =>
    import('./components/Legal/Tokushoho').then((m) => ({ default: m.Tokushoho })),
);
const Privacy = lazy(() =>
    import('./components/Legal/Privacy').then((m) => ({ default: m.Privacy })),
);
const Terms = lazy(() =>
    import('./components/Legal/Terms').then((m) => ({ default: m.Terms })),
);
const BookingManage = lazy(() =>
    import('./components/BookingManage').then((m) => ({ default: m.BookingManage })),
);
const LifeplanSimulation = lazy(() =>
    import('./components/LifeplanSimulation').then((m) => ({ default: m.LifeplanSimulation })),
);

const RouteFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--line)', borderTopColor: 'var(--accent)' }} />
    </div>
);

function App() {
    const legalRoute = useLegalRoute();
    const manageToken = useBookingManageToken();
    const lifeplan = useLifeplanRoute();
    const isMockDesign = window.location.pathname === '/mock';

    if (isMockDesign) return <MockDesign />;

    if (manageToken) {
        return (
            <Suspense fallback={<RouteFallback />}>
                <BookingManage token={manageToken} />
            </Suspense>
        );
    }
    if (lifeplan) {
        return (
            <Suspense fallback={<RouteFallback />}>
                <LifeplanSimulation />
            </Suspense>
        );
    }
    if (legalRoute === 'tokushoho') {
        return (
            <Suspense fallback={<RouteFallback />}>
                <Tokushoho />
            </Suspense>
        );
    }
    if (legalRoute === 'privacy') {
        return (
            <Suspense fallback={<RouteFallback />}>
                <Privacy />
            </Suspense>
        );
    }
    if (legalRoute === 'terms') {
        return (
            <Suspense fallback={<RouteFallback />}>
                <Terms />
            </Suspense>
        );
    }

    return (
        <div className="handoff-page min-h-screen">
            <Header />
            <main>
                <Hero visualSrc="/mock/consultation-desk.png" />
                <PageGuide />
                <PainPoints />
                <Services />
                <CtaStrip
                    label="BOOKING"
                    message="初回60分は無料です。就業規則、社保手続き、個人のライフプランなど、まず話して整理したい段階でも構いません。"
                    primaryHref="#booking"
                    primaryText="初回60分無料で相談する"
                    ghostHref="#how-it-works"
                    ghostText="相談の流れを見る"
                />
                <WhyUs />
                <CtaStrip
                    label="LIFEPLAN"
                    message="退職・独立・転職の前に、資産推移をざっくり確認できます。相談前の整理ツールとしてご利用ください。"
                    primaryHref="#/lifeplan"
                    primaryText="ライフプランを試算する"
                    ghostHref="#booking"
                    ghostText="直接相談する"
                />
                <HowItWorks />
                <Profile />
                <CtaStrip
                    label="CONSULTATION"
                    message="会社員として働く視点と、専門家の知識を両方持っています。制度を使えるアドバイスにこだわります。"
                    primaryHref="#booking"
                    primaryText="初回60分無料で相談する"
                    ghostHref="#services"
                    ghostText="サービス詳細を見る"
                />
                <NoteArticles />
                <CtaStrip
                    label="BOOKING"
                    message="記事で気になったテーマを、実際の状況に当てはめて整理します。初回60分は無料です。"
                    primaryHref="#booking"
                    primaryText="予約カレンダーへ"
                    ghostHref="https://note.com/brainy_racoon772"
                    ghostText="noteを読む"
                />
                <Booking />
            </main>
            <Footer />
        </div>
    );
}

export default App;
