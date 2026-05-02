import { useEffect, useState } from 'react';

export type LegalRoute = 'tokushoho' | 'privacy' | 'terms' | null;

function parseLegal(hash: string): LegalRoute {
    const m = hash.match(/^#\/legal\/(tokushoho|privacy|terms)\/?$/);
    return (m?.[1] as LegalRoute) ?? null;
}

function parseManageToken(hash: string): string | null {
    const m = hash.match(/^#\/booking\/manage(?:\/?\?(.*))?$/);
    if (!m) return null;
    const query = m[1] ?? '';
    const params = new URLSearchParams(query);
    const token = params.get('token');
    if (!token) return null;
    if (!/^[a-f0-9]{32,128}$/i.test(token)) return null;
    return token;
}

export const useLegalRoute = (): LegalRoute => {
    const [route, setRoute] = useState<LegalRoute>(() =>
        typeof window !== 'undefined' ? parseLegal(window.location.hash) : null,
    );

    useEffect(() => {
        const onHash = () => setRoute(parseLegal(window.location.hash));
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, []);

    useEffect(() => {
        if (route) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, [route]);

    return route;
};

export const useBookingManageToken = (): string | null => {
    const [token, setToken] = useState<string | null>(() =>
        typeof window !== 'undefined' ? parseManageToken(window.location.hash) : null,
    );

    useEffect(() => {
        const onHash = () => setToken(parseManageToken(window.location.hash));
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, []);

    useEffect(() => {
        if (token) window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, [token]);

    return token;
};
