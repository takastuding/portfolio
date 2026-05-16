declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

const currentPagePath = () => `${window.location.pathname}${window.location.search}${window.location.hash}`;

const currentPageParams = () => ({
    page_path: currentPagePath(),
    page_location: window.location.href,
    page_title: document.title,
});

export const initAnalytics = () => {
    if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;

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
