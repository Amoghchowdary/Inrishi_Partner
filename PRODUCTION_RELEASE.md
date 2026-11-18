# INRISHI Partner V78 Production Release

Frontend: **78.0.0**  
Required backend: **Apps Script 64.0.0 / 74 actions**  
Production domain: **https://partner.inrishi.in**  
GTM: **GTM-NH8FPTZF**

V78 focuses on Partner Portal speed, easier navigation, resilient historical data handling and complete onboarding/legal delivery. Local production legal pages are included for Privacy Policy, Terms of Use and Partner Terms.

The GitHub Actions workflow verifies the deployed Apps Script backend before build/deploy, then runs the complete repository preflight and production smoke test.

Apps Script V64 must be deployed first on the existing Web App URL.
