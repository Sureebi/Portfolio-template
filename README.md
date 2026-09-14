# Vue Editorial Portfolio Template

A modern, interactive and multilingual portfolio template built with **Vue 3**, **Vite** and **Vue Router**.

This project is designed for developers, IT professionals, designers, freelancers and other creatives who want a clean portfolio with strong visuals, smooth transitions and reusable components.

> This repository is intended to be used as a starting point. Replace the demo content, images, links and contact details with your own.

---

## Preview

Add your project screenshot here:

```md
![Portfolio Preview](./public/preview.png)
```

---

## Features

- Vue 3 + Vite
- Vue Router
- Responsive layout
- Interactive highlight cards
- Smooth hover interactions
- Animated page transitions
- Custom asset loader
- Multilingual support
- Animated language switching
- Persistent language preference
- Clipboard contact button
- Reusable components
- Custom CSS design system
- Image preloading
- Easy-to-customize content structure
- No UI framework required

---

## Tech Stack

- **Vue 3**
- **Vite**
- **Vue Router**
- **JavaScript**
- **HTML5**
- **CSS3**

The interface is built with custom Vue components and CSS without a third-party UI framework.

---

## Project Structure

```

src/
├── components/
│   ├── HighlightCards.vue
│   └── PortfolioHighlights.vue
├── composables/
│   └── useLanguage.js
├── router/
│   └── index.js
├── views/
│   ├── AboutMeView.vue
│   ├── HighlightDetailView.vue
│   ├── HighlightsView.vue
│   └── MoreProjectsView.vue
├── App.vue
├── about.css
├── highlight-detail.css
├── main.js
├── more-projects.css
└── style.css
```

You can rename or reorganize the files to match your own project structure.

---

## Getting Started

### Requirements

Install:

- Node.js
- npm

### Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

### Enter the project directory

```bash
cd YOUR-REPOSITORY
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will display the local development URL in your terminal.

---

## Production Build

Create an optimized production build:

```bash
npm run build
```

The final files will be generated in:

```text
dist/
```

Preview the production build locally:

```bash
npm run preview
```

---

## Customization

### 1. Replace the portfolio identity

Update the site name, role, navigation labels and page copy in:

```text
src/composables/useLanguage.js
```

---

### 2. Replace the highlight cards

Highlight cards are defined in:

```text
src/components/PortfolioHighlights.vue
```

Each card has its own route, for example:

```js
{
  id: '01',
  title: t('highlights.about.title'),
  description: t('highlights.about.description'),
  to: '/intro'
}
```

You can add, remove or rename cards depending on your portfolio.

---

### 3. Replace the images

The template ships without personal images. Cards and About visuals use abstract placeholders by default.

Place your own images inside:

```text
src/assets/
```

Then import them in `src/components/PortfolioHighlights.vue` and add an `image` property to the relevant card.

Example:

```js
import introImage from '../assets/intro.jpg'

{
  id: '01',
  title: t('highlights.about.title'),
  description: t('highlights.about.description'),
  image: introImage,
  to: '/intro'
}
```

For best results, use images with similar aspect ratios and leave enough space around the subject for responsive cropping.

---

### 4. Edit the colors

The main theme variables can be changed in your global stylesheet.

Example:

```css
:root {
  --bg: #f8fbf9;
  --surface: #88c4af;
  --surface-2: #79bda7;
  --text: #21342d;
  --muted: #5e746b;
  --accent: #69c7ba;
  --accent-strong: #317c70;
}
```

Changing these variables is the easiest way to create your own visual identity.

---

### 5. Change the fonts

The default design uses a display font for headings and a separate body font.

Update the font import and variables in your main stylesheet:

```css
:root {
  --font-display: 'Your Display Font', sans-serif;
  --font-body: 'Your Body Font', sans-serif;
}
```

---

## Multilingual Support

The template includes a simple custom language system.

Example:

```js
const messages = {
  en: {
    nav: {
      about: 'About',
      projects: 'Projects'
    }
  },

  bg: {
    nav: {
      about: 'За мен',
      projects: 'Проекти'
    }
  }
}
```

Use translations inside Vue templates with:

```vue
{{ t('nav.about') }}
```

The selected language is stored in `localStorage`, so the user's preference is preserved between visits.

You can replace Bulgarian with any second language or expand the language system with additional locales.

---

## Contact Button

The template includes a contact button that can copy an email address to the clipboard.

Replace the demo email:

```js
const email = 'hello@example.com'
```

You can also replace this behavior with:

- a `mailto:` link
- a contact form
- a modal
- a social profile
- a custom contact page

---

## Routing

Example routes:

```text
/
├── /intro
├── /outside-work
├── /journey
├── /lab-projects
├── /next
├── /about-me
└── /more-projects
```

Update your routes inside:

```text
src/router/index.js
```

The project supports animated transitions between Vue Router views.

---

## Deployment

Because this is a Vite application, the production build can be hosted on most static hosting platforms.

Common options include:

- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel
- Caddy
- Nginx
- Apache
- Self-hosted infrastructure

For history-mode Vue Router deployments, make sure your web server falls back to `index.html`.

Example Caddy configuration:

```caddy
example.com {
    root * /var/www/portfolio
    try_files {path} /index.html
    file_server
}
```

---

## Suggested GitHub Template Workflow

After configuring the repository:

1. Open the repository on GitHub.
2. Go to **Settings**.
3. Enable **Template repository**.
4. Users will then be able to select **Use this template**.
5. They can create a new repository without forking the original project.

---

## Recommended Before Publishing

Before publishing your own portfolio, make sure you replace:

- [ ] Name
- [ ] Job title
- [ ] Email address
- [ ] Social links
- [ ] CV link
- [ ] Portfolio images
- [ ] About text
- [ ] Projects
- [ ] Professional experience
- [ ] Language strings
- [ ] Metadata
- [ ] Page title
- [ ] Favicon
- [ ] Open Graph image
- [ ] Domain
- [ ] README screenshot

---

## Roadmap

Possible future improvements:

- [ ] Config-driven portfolio content
- [ ] Additional highlight pages
- [ ] Mobile navigation
- [ ] More language options
- [ ] Accessibility improvements
- [ ] Reduced-motion support
- [ ] SEO metadata
- [ ] Open Graph metadata
- [ ] Automated deployment workflow
- [ ] Additional card layouts
- [ ] Theme presets
- [ ] Dark mode

---

## Design Notes

The template uses an editorial card-based layout, soft motion, language transitions and abstract placeholder visuals. It is intended to be customized with your own content, images, colors and portfolio structure.

---

## License

This project is released under the **MIT License**. See `LICENSE` for details.

Make sure that any images, fonts, icons or other third-party assets included in your version are licensed for redistribution.

---

## Contributing

Contributions, improvements and bug fixes are welcome.

You can:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Open a pull request

---

## Support

If you use the template and find a bug, open an issue in the repository.

If you build something with it, feel free to share your version.

---

## Status

**Template under active development.**

The structure, components and customization options may continue to evolve.
