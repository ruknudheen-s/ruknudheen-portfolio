# Ruknudheen S — Portfolio Website

A dependency-free portfolio site built from Ruknudheen S's resume (Data Analyst
— Python, SQL, Excel, Power BI).

## What's in this folder

```
portfolio/
├── index (1).html           # Page markup and styles
├── portfolio-app.js         # Module entry point
├── portfolio-data.js        # Resume, project and contact configuration
├── portfolio-*.js           # Feature modules
├── Ruknudheen_S_Resume.pdf  # Downloadable résumé, wired to the "Résumé" buttons
├── build_resume.py          # Script that generated the PDF from the resume text
└── README.md
```

No build step, no npm install, no framework — serve the folder over HTTP so the
browser can load the ES modules. It can be deployed as-is to any static host.

## Running it locally

Serve the folder so the module imports and relative links behave exactly like
production:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customization guide

All content lives in `portfolio-data.js`. Update `resumeData` and the page
re-renders projects, tags, and certifications from that shared data module.

| Want to change...            | Where                                                                                                                                                                                                                                                                                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Name, title, contact details | `resumeData.personal` in `portfolio-data.js`, plus the static hero/contact markup                                                                                                                                                                                                                                                                |
| Projects (add/edit/remove)   | `resumeData.projects` in `portfolio-data.js`                                                                                                                                                                                                                                                                                                     |
| Project filter categories    | The `data-filter` buttons in the `#projects` section, plus each project's `categories` array                                                                                                                                                                                                                                                     |
| Certifications               | `resumeData.certifications`                                                                                                                                                                                                                                                                                                                      |
| Résumé file                  | Replace `Ruknudheen_S_Resume.pdf` (keep the filename, or update the two `href`/`download` attributes that reference it)                                                                                                                                                                                                                          |
| Theme colors                 | The CSS custom properties at the top of `<style>` (`:root` for light mode, `html[data-theme="dark"]` for dark mode)                                                                                                                                                                                                                              |
| Fonts                        | The `--font-display` / `--font-body` / `--font-mono` variables. The site currently references Space Grotesk, IBM Plex Sans and IBM Plex Mono by name but doesn't load them from a CDN — add `<link>` tags for them in `<head>` (e.g. from Google Fonts) if you want the exact intended look; otherwise it falls back gracefully to system fonts. |
| Profile photo                | Not included — none was provided in the source resume. Add an `<img>` in the hero and swap the layout as desired.                                                                                                                                                                                                                                |

## Contact form configuration

The form validates client-side (required fields, email format, 20-character
minimum message) and shows a success state, but **it does not send email on
its own** — no backend is wired up, and the UI is intentionally honest about
that (see the note under the form).

To make it actually deliver messages, choose a provider and set the matching
configuration in `portfolio-data.js`:

- **Formspree** — create a form at formspree.io, then set
  `CONTACT_FORM_ENDPOINT = "https://formspree.io/f/your-form-id"`.
- **Web3Forms** — same idea, set the endpoint to your Web3Forms URL.
- **EmailJS** — swap the `fetch()` call in the `submit` handler for the
  EmailJS SDK call.
- **Custom backend** — point `CONTACT_FORM_ENDPOINT` at your own API route
  that accepts `{ name, email, subject, message }` as JSON. The module sends
  `Content-Type: application/json` and only shows success for a 2xx response.

Never commit real API keys into this file for a public repo — use a
serverless function or environment-variable-backed proxy if the service
requires a private key.

## Accessibility notes

- Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1`, logical
  heading order.
- Skip-to-content link, visible focus states on every interactive element.
- The project modal is a proper dialog: `role="dialog"`, `aria-modal`,
  labelled by its heading, traps Tab focus, closes on Escape or backdrop
  click, and returns focus to the button that opened it.
- Mobile menu and theme toggle both expose `aria-expanded` / `aria-pressed`
  and update their accessible labels.
- All motion (scroll reveal, transitions) is skipped when the OS is set to
  `prefers-reduced-motion: reduce`.

## SEO

`<title>`, meta description, canonical placeholder, Open Graph and Twitter
card tags, and a `Person` JSON-LD block are included in `<head>`. Update
`og:url` / `og:image` / `canonical` to the real deployed URL and a real
share image once you have them — placeholders currently point at
`https://example.com/`.

## Deployment

Because it's a single static file (plus the PDF), any static host works:

**Vercel**

```bash
npm i -g vercel
vercel --prod
```

**Netlify**
Drag the `portfolio` folder onto the Netlify dashboard, or:

```bash
npm i -g netlify-cli
netlify deploy --prod
```

**GitHub Pages**
Push this folder to a repo, then in Settings → Pages, set the source to the
branch/root containing `index.html`.

No routing configuration is needed anywhere — it's a single page with
in-page anchor navigation, so there are no nested routes to 404 on refresh.

## Testing checklist (already verified during build)

- [x] Nav links scroll to and highlight the correct section
- [x] Mobile hamburger menu opens/closes and traps nothing unexpectedly
- [x] Project filters show/hide the right cards
- [x] Project modals open, trap focus, close on Escape/backdrop/×, restore focus
- [x] Theme toggle persists via `localStorage` and respects system preference on first visit
- [x] Résumé download buttons point at the real PDF
- [x] Contact form blocks invalid input, posts JSON to the configured endpoint, handles failed requests, and shows success only after delivery
- [x] No fabricated employer history, stats, testimonials, or links — sections without resume data (work experience, testimonials, publications) were intentionally omitted rather than invented
- [x] Respects `prefers-reduced-motion`
