import fs from "node:fs";
const errors=[];const need=(ok,msg)=>{if(!ok)errors.push(msg)};const read=p=>fs.readFileSync(p,"utf8");
const home=read("src/components/partner/partner-home.tsx"),portal=read("src/components/partner/partner-portal.tsx"),css=read("src/styles.css");
need(home.includes("Refer the problem. We build the solution."),"V81 Partner short hero headline is missing.");
need(!home.includes("How it works")&&!portal.includes('"How it works"'),"How it works must be removed from Partner public site and portal navigation label.");
need(home.includes("partner-network.svg")&&home.includes("product-website.svg")&&home.includes("product-crm.svg")&&home.includes("product-ems.svg")&&home.includes("product-ai.svg"),"V81 Partner visual assets are incomplete.");
for(const asset of ["partner-network.svg","product-website.svg","product-crm.svg","product-ems.svg","product-ai.svg"])need(fs.existsSync(`src/assets/${asset}`),`Missing Partner V81 image asset: ${asset}`);
need(home.includes("v81-tile")&&home.includes("v81-slide")&&css.includes(".v81-tile:hover")&&css.includes("background:#fff!important")&&css.includes("color:var(--v81-ink)!important"),"Partner V81 white-tile/black-text hover behavior is missing.");
need(home.includes("Business Website")&&home.includes("CRM")&&home.includes("Employee Management")&&home.includes("AI Automation"),"V81 Partner product story is incomplete.");
need(!home.includes('name:"ERP"')&&!home.includes('>ERP<')&&!home.includes('ERP ·'),"ERP is still exposed on the public Partner website.");
need(!home.includes("₹5,000")&&!home.includes("% configured incentive")&&!home.includes("incentiveValue"),"Public Partner page exposes incentive commercial details.");
need(home.includes("Commercial terms")&&home.includes("Private"),"Partner public site must keep commercial terms private.");
need(portal.includes('CURRENT_REFERRABLE_SERVICES')&&!portal.includes('CURRENT_REFERRABLE_SERVICES=new Set(["ERP"'),"Partner Portal must block ERP from new referral choices.");
need(css.includes('.v73-public :is(')&&css.includes('color:#fff!important'),"White-only default public typography is missing.");
for(const asset of ["partner-approval-control.webp","partner-admin-chat.webp","partner-approval-email.webp"])need(fs.existsSync(`src/assets/${asset}`),`Missing Partner V81 realistic image asset: ${asset}`);
need(home.includes("v81-rule-visual-grid")&&home.includes("approvalControl")&&home.includes("adminChatVisual")&&home.includes("approvalEmailVisual"),"Partner V81 realistic support visuals are missing.");
need((home.match(/images\.unsplash\.com/g)||[]).length>=3,"Partner V81 must include at least three realistic business photographs.");

if(errors.length){console.error(errors.map(e=>`ERROR: ${e}`).join("\n"));process.exit(1)}
console.log("V81 PARTNER storytelling gate passed: realistic business photography, realistic support scenes, private commercial terms and white/black tile hover are present.");
