import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
    { name: '事務所', href: '#about' },
    { name: 'サービス', href: '#services' },
    { name: '選ばれる理由', href: '#why-us' },
    { name: '相談の流れ', href: '#how-it-works' },
    { name: 'プロフィール', href: '#profile' },
    { name: '発信', href: '#articles' },
];

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="site-header">
            <div className="head">
                <a href="#top" className="brand" aria-label="ホームへ戻る">
                    <span className="brand-mark" aria-hidden="true" />
                    <span>
                        <span className="brand-name">橋本社会保険労務士事務所</span>
                        <span className="brand-sub">HASHIMOTO SR & FP OFFICE</span>
                    </span>
                </a>

                <nav className="desktop-nav" aria-label="メインナビゲーション">
                    <ul>
                        {navItems.map(item => (
                            <li key={item.href}>
                                <a href={item.href}>{item.name}</a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <a className="cta head-cta" href="#booking">
                    初回相談を予約 <span className="mono">→</span>
                </a>

                <button
                    className="menu-button"
                    type="button"
                    onClick={() => setIsOpen(value => !value)}
                    aria-expanded={isOpen}
                    aria-controls="mobile-nav"
                    aria-label="メニュー"
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {isOpen && (
                <nav id="mobile-nav" className="mobile-nav" aria-label="モバイルナビゲーション">
                    {navItems.map(item => (
                        <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                            {item.name}
                        </a>
                    ))}
                    <a className="cta" href="#booking" onClick={() => setIsOpen(false)}>
                        初回相談を予約 <span className="mono">→</span>
                    </a>
                </nav>
            )}
        </header>
    );
};
