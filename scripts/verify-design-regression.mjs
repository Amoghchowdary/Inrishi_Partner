import fs from "node:fs";
const s=fs.readFileSync("src/components/partner/partner-home.tsx","utf8");
const css=fs.readFileSync("src/styles.css","utf8");
const e=[];const n=(o,m)=>{if(!o)e.push(m)};
for(const t of ["Become an Inrishi Partner","INRISHI PARTNER NETWORK","One simple path from lead to incentive.","PARTNER SCOPE OF WORK · VISUAL PLAYBOOK","Partner Portal"])n(s.includes(t),`Partner V67 visual marker missing: ${t}`);
n(css.includes(".partner-site")&&css.includes(".partner-workspace"),"Partner visual system missing.");
n(css.includes(".partner-hover-card:hover"),"Partner V67 white-card hover lift is missing.");
n(css.includes(".partner-service-reel"),"Partner V67 continuous service reel is missing.");
n(css.includes(".partner-flow-grid"),"Partner V67 visual workflow grid is missing.");
if(e.length){console.error(e.map(x=>`ERROR: ${x}`).join("\n"));process.exit(1)}
console.log("V67 partner visual design gate passed: image-led workflow, service reel and white-card hover interaction are present.");
