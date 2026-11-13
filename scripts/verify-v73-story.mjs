import fs from "node:fs";
const errors=[];const need=(ok,msg)=>{if(!ok)errors.push(msg)};const read=p=>fs.readFileSync(p,"utf8");
const home=read("src/components/partner/partner-home.tsx"),portal=read("src/components/partner/partner-portal.tsx"),css=read("src/styles.css");
need(home.includes("Spot the business problem")&&home.includes("Make the introduction")&&home.includes("Track privately"),"V73 Partner storytelling journey is missing.");
need(home.includes("Business Website")&&home.includes("CRM")&&home.includes("Employee Management")&&home.includes("AI Automation"),"V73 Partner product story is incomplete.");
need(!home.includes('name:"ERP"')&&!home.includes('>ERP<')&&!home.includes('ERP ·'),"ERP is still exposed on the public Partner website.");
need(!home.includes("₹5,000")&&!home.includes("% configured incentive")&&!home.includes("incentiveValue"),"Public Partner page exposes incentive commercial details.");
need(home.includes("Commercial terms")&&home.includes("Private"),"Partner public site must direct commercial terms to the private portal.");
need(portal.includes('filter(s=>s.name!=="ERP")'),"Partner Portal must block ERP from new referral choices.");
need(css.includes('.v73-public :is(')&&css.includes('color:#fff!important'),"White-only public typography override is missing.");
need(home.includes("v73-partner-product-visuals")&&home.includes("v73-partner-story")&&home.includes("v73-portal-frame"),"V73 Partner visual storytelling surfaces are missing.");
if(errors.length){console.error(errors.map(e=>`ERROR: ${e}`).join("\n"));process.exit(1)}
console.log("V73 PARTNER storytelling gate passed: ERP removed publicly, commercial terms private, white typography and visual story are present.");
