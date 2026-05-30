type CtaStripProps = {
    label?: string;
    message?: string;
    primaryHref?: string;
    primaryText?: string;
    ghostHref?: string;
    ghostText?: string;
};

export const CtaStrip = ({
    label = 'CONSULTATION',
    message = '初回60分は無料です。相談したい段階から気軽にご予約ください。',
    primaryHref = '#booking',
    primaryText = '初回60分無料で相談する',
    ghostHref = '#services',
    ghostText = 'サービス一覧へ',
}: CtaStripProps) => {
    return (
        <div className="cta-strip">
            <div className="wrap">
                <div className="cta-strip-inner">
                    <div className="cta-strip-text">
                        <span className="num">{label}</span>
                        <p>{message}</p>
                    </div>
                    <div className="cta-strip-actions">
                        <a className="cta" href={primaryHref}>
                            {primaryText} <span className="mono">→</span>
                        </a>
                        {ghostText && (
                            <a className="btn-ghost" href={ghostHref}>
                                {ghostText}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
