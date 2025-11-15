// /lib/core/loader.js
// Loader-Engine für cher-webapp-core
// Unterstützt: [data-include] und <component src="...">
// Lädt Fragmente rekursiv und feuert "includesLoaded", wenn alles fertig ist.

export async function loadIncludes() {
    const processed = new Set();

    async function loadOnce(root) {
        const includeElements = [
            ...root.querySelectorAll("[data-include]"),
            ...root.querySelectorAll("component[src]")
        ];

        if (includeElements.length === 0) return;

        for (const el of includeElements) {
            if (processed.has(el)) continue;

            let src =
                el.getAttribute("data-include") ||
                el.getAttribute("src");

            if (!src) continue;

            try {
                const response = await fetch(src);
                if (!response.ok) {
                    console.error("Include konnte nicht geladen werden:", src);
                    continue;
                }
                const html = await response.text();
                const temp = document.createElement("div");
                temp.innerHTML = html;

                // Fragment in den DOM einsetzen
                el.replaceWith(...temp.childNodes);

            } catch (e) {
                console.error("Fehler beim Laden von", src, e);
            }

            processed.add(el);
        }

        // Prüfen, ob durch das Einfügen neue Includes entstanden sind
        const newIncludes = [
            ...document.querySelectorAll("[data-include]"),
            ...document.querySelectorAll("component[src]")
        ].filter(el => !processed.has(el));

        if (newIncludes.length > 0) {
            await loadOnce(document);
        }
    }

    await loadOnce(document);

    // Nach dem Laden: Header an config.js anpassen
    applyConfigToHeader();

    // Event auslösen, damit andere Logik (Tests etc.) reagieren kann
    document.dispatchEvent(new Event("includesLoaded"));
}

// Zentrale Initialisierung für den Header
function applyConfigToHeader() {
    try {
        const titleEl = document.getElementById("app-title");
        const subtitleEl = document.getElementById("app-subtitle");

        if (!titleEl || !subtitleEl) {
            // Seite hat möglicherweise keinen Header – dann ruhig aussteigen
            return;
        }

        const cfg = window.appConfig || {};

        // Titel setzen (oder Fallback beibehalten)
        if (cfg.appTitle) {
            titleEl.textContent = cfg.appTitle;
        }

        // Untertitel ein-/ausblenden
        if (cfg.appSubtitle) {
            subtitleEl.textContent = cfg.appSubtitle;
            subtitleEl.classList.remove("hidden");
        } else {
            subtitleEl.classList.add("hidden");
        }
    } catch (err) {
        console.error("Fehler beim Initialisieren des Headers:", err);
    }
}

// Automatisch beim Laden der Seite starten
document.addEventListener("DOMContentLoaded", () => {
    loadIncludes();
});
