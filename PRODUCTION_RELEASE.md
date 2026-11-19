# INRISHI Partner V81 Production Release

V81 is the single-production Partner refinish. It removes legacy route recovery, preserves the V80 public SEO/AEO layer, keeps only the canonical Partner routes, and adds a terminal custom 404 for every non-whitelisted URL.

## Production topology
- Partner home: https://partner.inrishi.in/
- Login: /login
- Register: /register
- Portal: /portal
- Backend: Apps Script V64 / contract 64.0.0

## V81 controls
- Unknown URLs return a custom hard 404.
- /login, /register and /portal remain direct-entry compatible and noindex.
- Current referral choices are limited to Website Design, CRM, Employee Management and AI Business Transformation.
- GitHub Actions rebuilds from a clean dist and verifies HTTP 404 behavior after deployment.
