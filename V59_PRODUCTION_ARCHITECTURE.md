# INRISHI V59 Partner production architecture

- Repository: `Amoghchowdary/Inrishi_Partner`
- Custom domain: `partner.inrishi.in`
- Main site: `https://www.inrishi.in`
- Apps Script backend is separate from both Git repositories and preserves integrated Admin/Partner data.

## DNS
At Hostinger create:

- Type: `CNAME`
- Name: `partner`
- Target: `Amoghchowdary.github.io`

Do **not** enter `https://www.inrishi.in` as the CNAME target. DNS CNAME values are hostnames, not URLs, and this Partner site is published from its own GitHub Pages repository.

In `Amoghchowdary/Inrishi_Partner` → Settings → Pages, set custom domain to `partner.inrishi.in` and enable HTTPS after DNS verification.
