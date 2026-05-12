import { useEffect, useState } from 'react';

export type LegalRoute = 'tokushoho' | 'privacy' | 'terms' | null;

const TOKEN_RE = /^[a-f0-9]{32,128}$/i;

function parseLegalFromHash(hash: string): LegalRoute {
    const m = hash.match(/^#\/legal\/(tokushoho|privacy|terms)\/?$/);
    return (m?.[1] as LegalRoute) ?? null;
}

function parseLegalFromPath(pathname: string): LegalRoute {
    const m = pathname.match(/^\/legal\/(tokushoho|privacy|terms)\/?$/);
    return (m?.[1] as LegalRoute) ?? null;
}

function parseLegal(): LegalRoute {
    if (typeof window === 'undefined') return null;
    return parseLegalFromPath(window.location.pathname) ?? parseLegalFromHash(window.location.hash);
}

function parseLifeplan(): boolean {
    if (typeof window === 'undefined') return false;
    if (/^\/lifeplan\/?$/.test(window.location.pathname)) return true;
    return /^#\/lifeplan\/?$/.test(window.location.hash);
}

function parseManageToken(): string | null {
    if (typeof window === 'undefined') return null;
    // 1) パス形式： /booking/manage?token=...
    if (/^\/booking\/manage\/?$/.test(window.location.pathname)) {
        const token = new URLSearchParams(window.location.search).get('token');
        if (token && TOKEN_RE.test(token)) return token;
    }
    // 2) フォールバック：ハッシュ形式 #/booking/manage?token=...
    const m = window.location.hash.match(/^#\/booking\/manage(?:\/?\?(.*))?$/);
    if (m) {
        const token = new URLSearchParams(m[1] ?? '').get('token');
        if (token && TOKEN_RE.test(token)) return token;
    }
    return null;
}

export const useLegalRoute = (): LegalRoute => {
    const [route, setRoute] = useState<LegalRoute>(() => parseLegal());

    useEffect(() => {
        const update = () => setRoute(parseLegal());
        window.addEventListener('hashchange', update);
        window.addEventListener('popstate', update);
        return () => {
            window.removeEventListener('hashchange', update);
            window.removeEventListener('popstate', update);
        };
    }, []);

    useEffect(() => {
        if (route) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, [route]);

    return route;
};

export const useLifeplanRoute = (): boolean => {
    const [active, setActive] = useState<boolean>(() => parseLifeplan());

    useEffect(() => {
        const update = () => setActive(parseLifeplan());
        window.addEventListener('hashchange', update);
        window.addEventListener('popstate', update);
        return () => {
            window.removeEventListener('hashchange', update);
            window.removeEventListener('popstate', update);
        };
    }, []);

    useEffect(() => {
        if (active) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, [active]);

    return active;
};

export const useBookingManageToken = (): string | null => {
    const [token, setToken] = useState<string | null>(() => parseManageToken());

    useEffect(() => {
        const update = () => setToken(parseManageToken());
        window.addEventListener('hashchange', update);
        window.addEventListener('popstate', update);
        return () => {
            window.removeEventListener('hashchange', update);
            window.removeEventListener('popstate', update);
        };
    }, []);

    useEffect(() => {
        if (token) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, [token]);

    return token;
};
