import { Header } from './Header';
import { Hero } from './Hero';
import { PainPoints } from './PainPoints';
import { Services } from './Services';
import { WhyUs } from './WhyUs';
import { HowItWorks } from './HowItWorks';
import { CTABanner } from './CTABanner';
import { Profile } from './Profile';
import { NoteArticles } from './NoteArticles';
import { Booking } from './Booking';
import { Contact } from './Contact';
import { Footer } from './Footer';

const mockArticles = [
    {
        title: '社会保険と年金を、働き方から整理する',
        link: 'https://note.com/brainy_racoon772',
        pubDate: '2026-05-01T00:00:00.000Z',
        description: '会社員、副業、個人事業主で変わる制度の見え方を、現場目線で整理します。',
    },
    {
        title: '副業を始める前に確認したい労務とお金のこと',
        link: 'https://note.com/brainy_racoon772',
        pubDate: '2026-04-20T00:00:00.000Z',
        description: '社会保険、扶養、税金、将来の年金まで、最初に押さえたいポイントをまとめます。',
    },
    {
        title: '初めて人を雇うときの就業規則と手続き',
        link: 'https://note.com/brainy_racoon772',
        pubDate: '2026-04-08T00:00:00.000Z',
        description: '小さく始める事業者向けに、雇用前後の準備と運用ルールを解説します。',
    },
];

export const MockDesign = () => {
    return (
        <div className="design-mock min-h-screen font-sans text-stone-800 bg-[#f7f4ee]">
            <Header />
            <main>
                <Hero visualSrc="/mock/consultation-desk.png" />
                <PainPoints />
                <Services />
                <WhyUs />
                <HowItWorks />
                <CTABanner />
                <Profile />
                <NoteArticles mockItems={mockArticles} />
                <div id="booking">
                    <Booking />
                </div>
                <Contact />
            </main>
            <Footer />
        </div>
    );
};
