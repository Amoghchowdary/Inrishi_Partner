# INRISHI Partner V78

Production frontend for https://partner.inrishi.in.

V78 is the Partner reliability, navigation and onboarding release paired with Apps Script V64. It preserves the image-led public design, optimized media, private commercial positioning and GTM while fixing the operational complaints from the Partner journey.

## V78 fixes
- Partner Portal tolerates historical records with missing leads/incentives arrays.
- Portal snapshot caching and silent refresh reduce repeated blocking loads.
- Selected portal section persists in the URL hash.
- Desktop navigation is sticky; mobile navigation becomes a horizontal sticky scroller.
- Partner conversion clearly reports when a Customer was created but credential email needs Admin retry.
- Partner application acknowledgement delivery is reported to the applicant.
- Privacy Policy, Terms of Use and Partner Terms are deployed directly on partner.inrishi.in.
- Partner approval emails attach service brochure, Partner Terms, Privacy Policy and Terms of Use through Apps Script V64.
- Partner GTM remains GTM-NH8FPTZF.

## Production rule
Deploy Apps Script V64 first. V78 GitHub Actions intentionally blocks if the live backend is not 64.0.0.
