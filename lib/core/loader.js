// /lib/core/loader.js
// Neue Loader-Engine für cher-webapp-core
// Unterstützt: <component src="..."> und data-include="..."
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

                // Replace element with actual content
                el.replaceWith(...temp.childNodes);

            } catch (e) {
                console.error("Fehler beim Laden von", src, e);
            }

            processed.add(el);
        }

        // Prüfen, ob weitere Includes entstanden sind (rekursiv)
        const newIncludes = [
            ...document.querySelectorAll("[data-include]"),
            ...document.querySelectorAll("component[src]")
        ].filter(el => !processed.has(el));

        if (newIncludes.length > 0) {
            await loadOnce(document);
        }
    }

    await loadOnce(document);

    // Sehr wichtig: Event auslösen, wenn ALLES geladen ist
    document.dispatchEvent(new Event("includesLoaded"));
}

// Automatisch beim Laden der Seite starten
document.addEventListener("DOMContentLoaded", () => {
    loadIncludes();
});
