import fs from "node:fs";
const errors=[];const read=p=>fs.readFileSync(p,"utf8"),html=read("index.html"),robots=read("public/robots.txt"),sitemap=read("public/sitemap.xml"),home=read("src/components/partner/partner-home.tsx"),login=read("src/routes/login.tsx"),register=read("src/routes/register.tsx"),portal=read("src/routes/portal.tsx");
for(const marker of ['rel="canonical"','property="og:title"','property="og:description"','application/ld+json'])if(!html.includes(marker))errors.push(`Partner SEO metadata missing: ${marker}`);
for(const route of ["/login","/register","/portal"])if(!robots.includes(`Disallow: ${route}`))errors.push(`Private Partner route missing robots exclusion: ${route}`);
if(!robots.includes("Sitemap: https://partner.inrishi.in/sitemap.xml"))errors.push("Partner sitemap directive missing.");
if(!sitemap.includes("https://partner.inrishi.in/"))errors.push("Partner public homepage missing from sitemap.");
for(const [name,text] of [["login",login],["register",register],["portal",portal]])if(!text.includes("noindex"))errors.push(`Partner private ${name} route lacks noindex.`);
for(const marker of ["How a partner brings leads to Inrishi","HOW YOUR INCENTIVE WORKS","qualifying customer payment","Eligible","Approved","Paid"])if(!home.includes(marker))errors.push(`Partner public acquisition/SEO copy missing: ${marker}`);
if(errors.length){console.error(errors.map(e=>`ERROR: ${e}`).join("\n"));process.exit(1)}console.log("V62 Partner SEO gate passed: public Partner/incentive content is indexable while login/register/portal remain excluded.");
