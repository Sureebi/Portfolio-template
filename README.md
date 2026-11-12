# Vue Editorial Portfolio Template

A bilingual Vue 3 and Vite portfolio with interactive highlight cards, animated navigation, a project showcase, and a career timeline. The bundled profile, projects, links, and illustrations are sample content.

## Preview

[![Portfolio homepage with five interactive highlight cards](docs/portfolio-preview.png)](https://sureebi.github.io/Portfolio-template/)

## Run locally

```sh
npm ci
npm run dev
```

Run `npm run build` for the default production build, or `npm run build:pages` for GitHub Pages.

## Customize

- Edit English and Bulgarian UI copy in `src/composables/useLanguage.js` and the timeline, showcase, and next steps in `src/data/highlightPageContent.js`.
- Update the introduction, personal section, and additional projects under `src/views/`.
- Set your contact address and footer links in `src/App.vue`. The demo uses `hello@example.com` and links to `example.com`.
- Replace the sample artwork in `src/assets/` and update imports in the relevant views or in `src/components/HighlightsShowcase.vue`.
- Update the title, description, and favicon in `index.html`.

## Deploy to GitHub Pages

In **Settings → Pages**, set **Source** to **GitHub Actions**. The workflow builds and deploys on pushes to `main` and can also be run manually.

The Pages build serves assets from `/Portfolio-template/` and uses hash URLs such as `/Portfolio-template/#/personal` so nested pages can be opened directly and refreshed. If you rename the repository, update the Pages base in `vite.config.js`.

[GitHub Pages demo](https://sureebi.github.io/Portfolio-template/)

Other hosts can use the default build with a fallback to `index.html` for Vue Router history URLs.

## License

MIT. See [LICENSE](LICENSE).
