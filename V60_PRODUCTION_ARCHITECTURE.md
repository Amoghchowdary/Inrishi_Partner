# INRISHI V60 Partner production architecture

- Repository: `Amoghchowdary/Inrishi_Partner`
- Production domain: `https://partner.inrishi.in`
- Canonical routes: `/`, `/login`, `/register`, `/portal`.
- Main/Admin/Customer frontend source is not bundled here.
- Backend is the separate shared Google Apps Script deployment; Partner actions are isolated by site, role, action and session.
- Partner login/password/Login-ID recovery remains OTP-first through the registered recovery email.
- Partner lead creation, conversion, project tracking and incentive data are server-backed.
- GitHub Actions is the production compiler/build/audit/deployment gate.
