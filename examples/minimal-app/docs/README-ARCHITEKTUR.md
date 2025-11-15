# Architektur des cher-webapp-core Frameworks

Dieses Dokument beschreibt die grundlegende Architektur des
`cher-webapp-core` Frameworks. Ziel ist ein leichtgewichtiges, modulares und
übersichtlich strukturiertes Fundament für WebApps, das ohne Build-Tooling
auskommt und dennoch klare Konzepte für Struktur, Layout und Design bietet.

Das Framework folgt drei zentralen Prinzipien:

1. **Strikte Trennung der Verantwortlichkeiten**
2. **Maximale Wiederverwendbarkeit von Komponenten**
3. **Minimale, erweiterbare Basis für eigene WebApps**

---

# 1. Verzeichnisstruktur

Die Verzeichnisstruktur des Frameworks ist klar gegliedert und unterscheidet
explizit zwischen Funktionalität, Layout, Design, Komponenten und externen
Bibliotheken.

```
cher-webapp-core/
│
├── lib/
│   ├── core/
│   │   ├── init.js
│   │   ├── router.js
│   │   ├── loader.js
│   │   └── config.js
│   │
│   ├── components/
│   │   ├── header.html
│   │   ├── footer.html
│   │   ├── nav-main.html
│   │   └── card.html
│   │
│   ├── layout/
│   │   ├── base.html
│   │   ├── page.html
│   │   └── form.html
│   │
│   ├── design/
│   │   ├── tailwind.css
│   │   ├── theme.css
│   │   └── colors.css
│   │
│   ├── utils/
│   │   ├── dom.js
│   │   ├── fetch.js
│   │   └── forms.js
│   │
│   └── vendor/
│       └── (externe Libs)
│
├── cdn/
│   ├── v1/
│   └── v2/
│
├── examples/
│   ├── minimal-app/
│   └── docs-app/
│
├── docs/
│   ├── README-ARCHITEKTUR.md
│   ├── README-KOMPONENTEN.md
│   └── README-NUTZUNG.md
│
└── README.md
```

---

# 2. Architekturprinzipien

## 2.1 Trennung von Struktur, Layout, Design und Logik

Das Framework basiert auf einer sauberen Schichtung:

| Ebene | Umsetzung im Framework | Beschreibung |
|-------|------------------------|--------------|
| **Struktur** | `/lib/layout/` | Grundskelett einer Seite oder eines Formulars |
| **Komponenten** | `/lib/components/` | Wiederverwendbare UI-Bausteine (Header, Footer, Cards) |
| **Design** | `/lib/design/` | Farben, Typografie, Tailwind-Basis, Theme |
| **Logik** | `/lib/core/` + `/lib/utils/` | Routing, Initialisierung, Hilfsfunktionen |
| **Externe Libs** | `/lib/vendor` | Optionale Tools |

Damit können Layout, Komponenten und Design unabhängig voneinander gepflegt und erweitert werden.

---

# 3. Designsystem (v0.1.0)

Das Designsystem besteht aus drei Dateien:

```
lib/design/
├── tailwind.css   ← Tailwind-Basis (base, components, utilities)
├── theme.css      ← Typografie + Grundlayout
└── colors.css     ← Farb-Design Tokens
```

- `colors.css` definiert alle semantischen Farbvariablen  
- `theme.css` definiert Schriftarten, Überschriften, Container, Abstände  
- `tailwind.css` stellt Tailwind-Utility-Klassen bereit

Das Framework nutzt **Tailwind als Utility-Layer**, **theme.css als Look-and-Feel** und **colors.css als Variablen-Schicht**.

---

# 4. Wiederverwendbare Komponenten

UI-Komponenten liegen in `/lib/components` und bestehen aus reinem HTML.  
Sie verwenden:

- Tailwind-Utilities für Layout  
- Variablen aus `colors.css`  
- Typografie aus `theme.css`

Dies ermöglicht maximale Wiederverwendbarkeit.

Beispiele:

- `header.html`
- `nav-main.html`
- `card.html`

---

# 5. Layout-Templates

Im Ordner `/lib/layout` liegen wiederverwendbare Seitenstrukturen:

- `base.html` → Grundgerüst für jede Seite
- `page.html` → Standardseite
- `form.html` → Formulare/Interaktion

Diese Layout-Files sind bewusst design-neutral und nutzen hauptsächlich Tailwind-Utilities.

---

# 6. Routing & Initialisierung

In `/lib/core` stecken die zentralen Funktionen des Frameworks:

- `init.js` → Bootstrapping der App
- `router.js` → Clientseitiges Routing
- `loader.js` → Laden externer Komponenten
- `config.js` → App-Konfiguration

---

# 7. CDN und Release-Konzept

Die Dateien im Ordner `cdn/` werden automatisch im Releaseprozess generiert.

- `/cdn/v1/` enthält minifizierte Dateien für v0.1.x  
- `/cdn/v2/` wird für die nächste große Version verwendet

WebApps können wählen:

- **Entwicklung:** direkte Einbindung der Dateien aus `/lib/design`  
- **Produktion:** Einbindung der kompilierten Datei aus `/cdn/v1/design.css`

---

# 8. Beispiele

Unter `/examples/` befinden sich Demo-WebApps:

- Minimal-App  
- Dokumentations-App  

---

# 9. Ziel der Architektur

Die Architektur stellt sicher, dass:

- WebApps **einheitlich strukturiert**, aber frei gestaltbar sind  
- Komponenten **wiederverwendbar** bleiben  
- Tailwind **leichtgewichtig** eingesetzt wird  
- das Framework **ohne Build-Tools** funktioniert  
- Apps über CDN oder lokal betrieben werden können  
