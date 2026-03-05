import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Profile } from './components/Profile';
import { Services } from './components/Services';
import { Links } from './components/Links';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#050b18] font-sans text-slate-100">
      <Header />
      <main>
        <Hero />
        <Profile />
        <Services />
        <Links />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
