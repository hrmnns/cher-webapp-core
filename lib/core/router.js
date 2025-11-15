// /lib/core/router.js
import { loadPageContent } from './loader.js';

export function initRouter() {
  document.addEventListener("click", async (e) => {
    const link = e.target.closest("a[href]");
    if (!link) return;

    const url = link.getAttribute("href");

    // Only handle internal navigation
    if (url.startsWith("/pages/")) {
      e.preventDefault();
      history.pushState({}, "", url);
      await loadPageContent(url);
    }
  });

  // Handle browser back/forward
  window.addEventListener("popstate", async () => {
    const url = location.pathname;
    if (url.startsWith("/pages/")) {
      await loadPageContent(url);
    }
  });
}
