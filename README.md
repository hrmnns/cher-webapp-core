# cher-webapp-core
Ein leichtgewichtiges, modular aufgebautes Framework zur Entwicklung responsiver WebApps -- komplett ohne Build-Tooling. 

Das Framework ist JSON-getrieben, Theme-fähig und unterstützt optionale Plugins. Es eignet sich ideal für kleine und mittelgroße WebApps, die schnell, portabel und flexibel entwickelt werden sollen.

## Ziele des Frameworks
cher-webapp-core verfolgt vier zentrale Prinzipien:

1.  **Modularität**
    Wiederverwendbare HTML-Komponenten (Header, Footer, Layout-Shell,
    UI-Bausteine).

2.  **Konfigurierbarkeit**
    Die gesamte WebApp wird über JSON definiert: Layout, Navigation,
    Theme, Plugins.

3.  **Responsives Design**
    Tailwind CSS per CDN, mobile-first, ohne Build-Prozess nutzbar.

4.  **Einfachheit & Effizienz**
    Template-HTML-Seiten ermöglichen schnelle Tests und iterative
    Entwicklung.

Das Framework ist so gestaltet, dass es viele WebApps gleichzeitig
unterstützen und zentral weiterentwickelt werden kann.

## Features

-   Dynamischer Component Loader\
-   Minimaler Hash-Router\
-   Externes Theme-System (per URL ladbar)\
-   JSON-basierte App-Konfiguration\
-   Plugin-System für optionale Erweiterungen\
-   Responsive Layouts mit Tailwind\
-   Sofort nutzbar über GitHub Pages\
-   Keine Abhängigkeiten, kein Build-Tooling

## Repository-Struktur

    webapp-core/
    │
    ├── index.html
    │
    ├── config/
    │   └── app-config.json
    │
    ├── lib/
    │   ├── core/
    │   │   ├── boot.js
    │   │   ├── router.js
    │   │   ├── loader.js
    │   │   ├── theme.js
    │   │   └── plugins.js
    │   │
    │   └── components/
    │       ├── layout-shell.html
    │       ├── header.html
    │       └── footer.html
    │
    └── pages/
        ├── home.html
        ├── demo-links.html
        └── demo-form.html

## Einstieg

### 1. Repository klonen

    git clone https://github.com/<user>/cher-webapp-core

### 2. Lokale Vorschau

Öffne die Datei:

    index.html

### 3. GitHub Pages aktivieren

Im Repository:\
Settings → Pages → Deploy from branch

## Konfiguration

Die zentrale App-Konfiguration liegt unter:

    config/app-config.json

Beispiel:

``` json
{
  "app": {
    "id": "demo-app",
    "title": "WebApp-Core Demo"
  },
  "theme": {
    "url": "https://themes.cherware.de/deepblue.json"
  },
  "layout": {
    "shellComponent": "lib/components/layout-shell.html",
    "mainContainerId": "app-main"
  },
  "navigation": [
    { "route": "home", "label": "Start", "page": "pages/home.html" }
  ],
  "plugins": [
    "breadcrumb"
  ]
}
```

## Themes

Themes werden als externe JSON-Dateien geladen.

Beispiel:

``` json
{
  "colors": {
    "primary": "#0A2240",
    "background": "#F4F7FA"
  },
  "ui": {
    "mode": "card"
  }
}
```

## Plugins

Aktivierung über die JSON-Konfiguration:

``` json
"plugins": ["breadcrumb"]
```

## Lizenz

Projektintern verwendbar.

## Kontakt

Weitere Informationen:\
https://www.cherware.de/reflect-it

