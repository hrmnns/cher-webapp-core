# Nutzung des cher-webapp-core Frameworks

Dieses Dokument erklärt, wie eine WebApp auf Basis des
`cher-webapp-core` Frameworks aufgebaut wird und wie die zentralen Teile
des Frameworks genutzt werden.

Das Ziel ist: minimale Komplexität, maximale Modularität.

---

# 1. Grundstruktur einer WebApp

Eine WebApp basiert typischerweise auf dieser Struktur:

```
my-app/
│
├── index.html
├── config.js
└── pages/
    ├── start.html
    └── weitere-seiten.html
```

---

# 2. Einbindung des Frameworks

```html
<!-- Framework Core -->
<script src="../cher-webapp-core/lib/core/init.js"></script>
<script src="../cher-webapp-core/lib/core/router.js"></script>
<script src="../cher-webapp-core/lib/core/loader.js"></script>
<script src="../cher-webapp-core/lib/core/config.js"></script>

<!-- Designsystem -->
<link rel="stylesheet" href="../cher-webapp-core/lib/design/colors.css">
<link rel="stylesheet" href="../cher-webapp-core/lib/design/theme.css">
<link rel="stylesheet" href="../cher-webapp-core/lib/design/tailwind.css">
```

Start der App:

```js
initApp();
```

---

# 3. Routing

In `config.js`:

```js
window.appConfig = {
  startPage: "pages/start.html",
  routes: {
    "/start": "pages/start.html",
    "/ueber": "pages/ueber.html"
  }
};
```

---

# 4. Layout-System

Layouts liegen in:

```
lib/layout/
├── base.html
├── page.html
└── form.html
```

Beispiel:

```html
<div data-layout="page">
  <h1>Beispielseite</h1>
  <p>Dies ist eine einfache Seite.</p>
</div>
```

---

# 5. Designsystem

Besteht aus:

- `colors.css` (Farbvariablen)
- `theme.css` (Typografie + Grundlayout)
- `tailwind.css` (Utility-Klassen)

Beispiel:

```html
<section class="card mt-6">
  <h2>Info</h2>
  <p class="text-muted">Dies ist eine Komponente, die das Designsystem nutzt.</p>
</section>
```

Mit Tailwind:

```html
<button class="px-4 py-2 bg-blue-600 text-white">
  Weiter
</button>
```

---

# 6. Komponenten

Einbindung:

```html
<div data-component="header"></div>
```

Der Loader ersetzt diese Stelle durch:

```
lib/components/header.html
```

---

# 7. Utils

```
lib/utils/
├── dom.js
├── fetch.js
└── forms.js
```

Beispiel:

```js
import { qs } from "../cher-webapp-core/lib/utils/dom.js";
```

---

# 8. Produktion via CDN

```html
<link rel="stylesheet" href="https://cdn.cherware.de/v1/design.css">
```

---

# 9. Beispiel-App

Unter `examples/minimal-app` findest du eine vollständige Demo.

---

# 10. Zusammenfassung

Das Framework ermöglicht:

- schnelle Entwicklung
- klare Modulstruktur
- konsequente Trennung von Layout, Design, Struktur und Logik
- Wiederverwendbarkeit aller UI-Bausteine
