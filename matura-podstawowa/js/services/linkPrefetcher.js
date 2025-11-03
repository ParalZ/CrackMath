
document.addEventListener('DOMContentLoaded', () => {
    console.log("--- Index Page Prefetcher Running ---");

    const prefetchedURLs = new Set();

    document.querySelectorAll('a').forEach(link => {
        const href = link.href;
        //origin is something like this http://127.0.0.1:5500/ or http://CrackMath/
        if (link.origin === window.location.origin &&
            link.pathname.endsWith('.html') &&
            link.href !== window.location.href &&
            !prefetchedURLs.has(href)) {

            prefetchedURLs.add(href);

            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = href;
            prefetchLink.as = 'document'; // Hint that we're fetching a page

            document.head.appendChild(prefetchLink);
        }
    });

    if (prefetchedURLs.size > 0) {
        console.log(`Prefetching ${prefetchedURLs.size} unique HTML documents.`);
    }
});