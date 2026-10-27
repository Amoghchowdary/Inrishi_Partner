# partner.inrishi.in deployment

Deploy this folder from a **separate GitHub Pages repository/site** (recommended repository name: `Inrishi_Partner`).

GitHub repository Settings → Pages → Custom domain: `partner.inrishi.in`

Hostinger DNS:
- Type: CNAME
- Name/Host: `partner`
- Target: `Amoghchowdary.github.io`

Do not point `partner` to `www.inrishi.in`. Do not use a wildcard. Enable Enforce HTTPS after GitHub reports the DNS check as successful.
