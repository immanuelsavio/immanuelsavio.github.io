# immanuelsavio.com

Personal site for Immanuel Savio, plus the Syswin Pharmaceuticals concept site.

| Route | What |
| --- | --- |
| `/` | Portfolio home |
| `/blog`, `/blog/:slug` | Writing |
| `/playground`, `/playground/json-to-toon` | Tools |
| `/syswin`, `/syswin/about`, `/syswin/portfolio` | Syswin Pharmaceuticals site |

Built with React 18, Vite 5, Tailwind CSS 3, Framer Motion, Lenis and three.js
(`@react-three/fiber`, Syswin hero only). The portfolio and Syswin are separate
lazy-loaded chunks, so each only downloads its own code.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run build    # outputs dist/
```

Node 22 (pinned in package.json `engines`, which Vercel uses).

## Structure

```
api/contact.js        Vercel function behind the portfolio contact form (Resend)
src/App.jsx           Chooses the portfolio or Syswin app by path
src/portfolio/        Portfolio: pages, sections, layout, lib (smooth scroll, section pager, theme)
src/syswin/           Syswin: pages, components, three/ (hero scene), data/ (product catalog)
src/data/             resume.json and blog.json (portfolio content)
```

Content lives in `src/data/resume.json`, `src/data/blog.json` and
`src/syswin/data/products.js`; edit those rather than the components.

## Deploy (Vercel)

The site deploys on Vercel from `main`. `vercel.json` sets the build, the SPA
rewrites (every non-`/api` path serves `index.html`) and cache headers.

1. Import the GitHub repo in Vercel. Framework preset: Vite (auto-detected).
2. Optional, for the portfolio contact form: add the environment variables from
   `.env.example` (`RESEND_API_KEY`, and optionally `CONTACT_TO`, `CONTACT_FROM`).
   Without them the form shows a "send by email instead" fallback.
3. Custom domain: add `immanuelsavio.com` (and `www`) in Project Settings >
   Domains, then update DNS at your registrar as Vercel instructs.

GitHub Actions (`.github/workflows/ci.yml`) only lints and builds; it no longer
deploys to GitHub Pages.
