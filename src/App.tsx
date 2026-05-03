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
import { Tokushoho } from './components/Legal/Tokushoho';
import { Privacy } from './components/Legal/Privacy';
import { Terms } from './components/Legal/Terms';
import { useLegalRoute, useBookingManageToken } from './lib/useHashRoute';
import { BookingManage } from './components/BookingManage';

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
            <main>
                <Hero />
                <PainPoints />
                <Services />
                <WhyUs />
                <HowItWorks />
                <CTABanner />
                <Profile />
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
