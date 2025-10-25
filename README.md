## Mascot AI — Landing Page

Static, responsive “Coming Soon” page for Mascot AI. Includes a dynamic theme that extracts colors from the concept screenshot.

### Local preview

- Serve locally to allow color extraction (canvas):
  - `python3 -m http.server` → open http://localhost:8000

### Deploy to GitHub Pages

1. Create a GitHub repo and push this folder to `main`.
2. In repo Settings → Pages:
   - Source: "Deploy from a branch"
   - Branch: `main` and folder: `/ (root)`
   - Save. After a minute, Pages will publish.
3. Custom domain: set to `mascot-ai.com` and enable "Enforce HTTPS" once the certificate is issued.

This repo includes:

- `CNAME` → sets custom domain to `mascot-ai.com` automatically on deploy.
- `.nojekyll` → ensures Pages serves files as-is (no Jekyll processing).

### DNS records (at your domain registrar/DNS host)

- Apex `mascot-ai.com` → A records to GitHub Pages:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- `www.mascot-ai.com` → CNAME to your Pages domain:
  - `mascot-ai.github.io`

Some DNS providers support ALIAS/ANAME or CNAME flattening at the apex — those also work. After DNS propagates, return to GitHub → Settings → Pages and click "Check DNS" if needed.

### Optional improvements

- Replace auto-extracted theme with fixed brand colors.
- Add email capture (form action or waitlist tool).
- Add favicon/site icons (can derive from the mascot).
- Add SEO and social meta (Open Graph/Twitter image).
