# INRISHI Partner V76 Production Release

V76 is a public Partner-site design and visual-content refinement release. Partner authentication, portal data, incentives and Admin chat continue to use Apps Script V63.

Production requirements:
- frontend 76.0.0;
- backend contract 63.0.0;
- partner.inrishi.in custom domain;
- GitHub Actions live-backend gate before build/deploy;
- no local-development step in production workflow.

## V76 analytics
Google Tag Manager is connected using `GTM-NH8FPTZF` on the Partner site. The release gate verifies the container ID before production build/deployment.
