import type { ReactNode } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';

type Props = {
    title: string;
    subtitle?: string;
    lastUpdated: string;
    children: ReactNode;
};

export const LegalLayout = ({ title, subtitle, lastUpdated, children }: Props) => {
    return (
        <div className="handoff-page min-h-screen">
            <Header />
            <main className="max-w-3xl mx-auto px-6 lg:px-8 py-16">
                <span className="num">Legal</span>
                <h1
                    className="serif"
                    style={{
                        fontSize: 'clamp(26px, 3.5vw, 38px)',
                        fontWeight: 600,
                        lineHeight: 1.4,
                        margin: '16px 0 0',
                        color: 'var(--ink)',
                    }}
                >
                    {title}
                </h1>
                {subtitle && (
                    <p style={{ marginTop: 12, fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.75 }}>
                        {subtitle}
                    </p>
                )}
                <div style={{ marginTop: 20, height: 1, width: 36, background: 'var(--accent)' }} />

                <div className="legal-container">
                    {children}
                </div>

                <p
                    style={{
                        marginTop: 56,
                        paddingTop: 24,
                        borderTop: '1px solid var(--line-soft)',
                        color: 'var(--sub)',
                        fontSize: 12,
                        fontFamily: '"IBM Plex Mono", monospace',
                    }}
                >
                    最終更新日：{lastUpdated}
                </p>
            </main>
            <Footer />
        </div>
    );
};
