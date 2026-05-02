import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { Services } from './components/Services';
import { Templates } from './components/Templates';
import { HowItWorks } from './components/HowItWorks';
import { Notice } from './components/Notice';
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
        <div className="min-h-screen bg-surface-50 font-sans text-stone-800">
            <Header />
            <main>
                <Hero />
                <Profile />
                <Services />
                <Templates />
                <HowItWorks />
                <Notice />
                <Booking />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
