declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const GA_OPT_OUT_STORAGE_KEY = 'sharoushi.ga.optOut';
const GA_OPT_OUT_PARAM = 'ga_opt_out';

const currentPagePath = () => `${window.location.pathname}${window.location.search}${window.location.hash}`;

const currentPageParams = () => ({
    page_path: currentPagePath(),
    page_location: window.location.href,
    page_title: document.title,
});

const setGaDisabledFlag = () => {
    if (!GA_MEASUREMENT_ID) return;

    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
};

const updateOptOutFromUrl = () => {
    const optOutValue = new URLSearchParams(window.location.search).get(GA_OPT_OUT_PARAM);

    try {
        if (optOutValue === '1' || optOutValue === 'true') {
            window.localStorage.setItem(GA_OPT_OUT_STORAGE_KEY, 'true');
        }

        if (optOutValue === '0' || optOutValue === 'false') {
            window.localStorage.removeItem(GA_OPT_OUT_STORAGE_KEY);
        }
    } catch {
        // Some privacy modes block localStorage; in that case, fall back to normal tracking.
    }
};

const isOptedOut = () => {
    updateOptOutFromUrl();

    try {
        return window.localStorage.getItem(GA_OPT_OUT_STORAGE_KEY) === 'true';
    } catch {
        return false;
    }
};

export const initAnalytics = () => {
    if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;

    if (isOptedOut()) {
        setGaDisabledFlag();
        return;
    }

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag() {
        window.dataLayer?.push(arguments);
    };

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    document.head.appendChild(script);

    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, currentPageParams());

    const trackPageView = () => {
        window.gtag?.('config', GA_MEASUREMENT_ID, currentPageParams());
    };

    window.addEventListener('hashchange', trackPageView);
    window.addEventListener('popstate', trackPageView);
};

export {};
