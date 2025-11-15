// /lib/core/loader.js

export async function loadComponents(root) {
  const components = root.querySelectorAll("component[src]");
  for (const comp of components) {
    const src = comp.getAttribute("src");
    const html = await fetch(src).then(r => r.text());
    comp.outerHTML = html;
  }
}

export async function loadLayout() {
  const layoutHtml = await fetch('/lib/layout/default.html').then(r => r.text());
  document.body.innerHTML = layoutHtml;
  await loadComponents(document.body);
}

export async function loadPageContent(url) {
  const html = await fetch(url).then(r => r.text());
  const main = document.getElementById("app-main");
  if (main) {
    main.innerHTML = html;
  }
}
