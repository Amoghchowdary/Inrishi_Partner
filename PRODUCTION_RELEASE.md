# INRISHI Partner V60 Production Release

V60 preserves the approved Partner design and canonical routes while stabilizing backend communication.

Production corrections:
- stable Apps Script Web App POST transport restored;
- only `/`, `/login`, `/register`, `/portal` are production Partner routes;
- Partner password and Login-ID recovery remains OTP-first;
- lead creation/conversion and portal snapshots remain server-backed;
- Main/Admin/Customer frontend code is excluded;
- V50-V59 path, route, transport and compile regressions remain blocked.

GitHub Actions is the only production build/deployment acceptance environment.
