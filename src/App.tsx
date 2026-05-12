import { lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PainPoints } from './components/PainPoints';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { HowItWorks } from './components/HowItWorks';
import { CTABanner } from './components/CTABanner';
import { Profile } from './components/Profile';
import { Booking } from './components/Booking';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { NoteArticles } from './components/NoteArticles';
import { useLegalRoute, useBookingManageToken, useLifeplanRoute } from './lib/useHashRoute';

// ルートレベルのページは遅延読み込み（初回 JS サイズ削減）
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
        <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-700 rounded-full animate-spin" />
    </div>
);

function App() {
    const legalRoute = useLegalRoute();
    const manageToken = useBookingManageToken();
    const lifeplan = useLifeplanRoute();

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
        <div className="min-h-screen font-sans text-stone-800 bg-white">
            <Header />
            <main>
                <Hero />
                <PainPoints />
                <Services />
                <WhyUs />
                <HowItWorks />
                <CTABanner />
                <Profile />
                <NoteArticles />
                <div id="booking">
                    <Booking />
                </div>
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
