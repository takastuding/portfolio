import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Profile } from './components/Profile';
import { Services } from './components/Services';
import { Templates } from './components/Templates';
import { HowItWorks } from './components/HowItWorks';
import { Links } from './components/Links';
import { Booking } from './components/Booking';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans text-stone-800">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Profile />
        <Services />
        <Templates />
        <HowItWorks />
        <Booking />
        <Links />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
