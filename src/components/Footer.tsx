const links = [
    ['サービス', '#services'],
    ['ライフプラン', '#/lifeplan'],
    ['予約', '#booking'],
    ['プライバシーポリシー', '#/legal/privacy'],
    ['利用規約', '#/legal/terms'],
    ['特定商取引法に基づく表記', '#/legal/tokushoho'],
];

export const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="wrap">
                <div className="foot">
                    <div>
                        <div className="b-name">橋本社会保険労務士事務所</div>
                        <div className="b-desc">
                            就業規則、社会保険、個人のライフプラン相談まで。
                            会社と個人の両側に立つ社労士事務所です。
                        </div>
                    </div>
                    <div>
                        <h4>LINKS</h4>
                        <ul>
                            {links.slice(0, 3).map(([name, href]) => (
                                <li key={href}><a href={href}>{name}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>SOCIAL</h4>
                        <ul>
                            <li><a href="https://note.com/brainy_racoon772" target="_blank" rel="noopener noreferrer">note</a></li>
                            <li><a href="https://x.com/sharoushi_info?s=21" target="_blank" rel="noopener noreferrer">X</a></li>
                            <li><a href="https://linevoom.line.me/user/_dfrrE2jsqeDRRaDQW17VwcjgnjmXWjHFqyhUHqU" target="_blank" rel="noopener noreferrer">LINE</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4>LEGAL</h4>
                        <ul>
                            {links.slice(3).map(([name, href]) => (
                                <li key={href}><a href={href}>{name}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="foot-bot">
                    <span>© {new Date().getFullYear()} HASHIMOTO SR & FP OFFICE</span>
                    <span>ONLINE WEEKEND CONSULTATION</span>
                </div>
            </div>
        </footer>
    );
};
