# INRISHI Partner Production — V60

Production frontend for `https://partner.inrishi.in`.

- GitHub repository: `Amoghchowdary/Inrishi_Partner`
- Routes: `/`, `/login`, `/register`, `/portal`
- Backend: separate shared Google Apps Script Web App; no `.gs` source belongs in this repository.
- Partner recovery: registered recovery email -> OTP -> verified password or Partner Login-ID change.
- Partner workflow: bring qualified leads, submit them, track customer conversion/projects and incentive status.
- GitHub Actions performs backend-version check, strict TypeScript, dependency audits, production build, dist verification, Pages deployment and post-deploy smoke test.
