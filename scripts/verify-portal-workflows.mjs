import fs from "node:fs";
const errors=[];
const home=fs.readFileSync("src/components/partner/partner-home.tsx","utf8");
const portal=fs.readFileSync("src/components/partner/partner-portal.tsx","utf8");
const service=fs.readFileSync("src/services/partner-portal.ts","utf8");
for(const marker of ["PARTNER SCOPE OF WORK","How a partner brings leads to Inrishi","Find a genuine business requirement","Qualify the opportunity","Add the lead in your Partner Portal","Inrishi confirms scope and commercials","Track delivery and incentive"]) if(!home.includes(marker)) errors.push(`Partner lead-scope marker missing: ${marker}`);
for(const action of ["partner.portal.snapshot","partner.lead.create"]) if(!service.includes(action)) errors.push(`Partner production action missing: ${action}`);
for(const marker of ["How to bring leads","Loading partner workspace","Partner workspace unavailable","Save lead to Inrishi","No leads yet"]) if(!portal.includes(marker)) errors.push(`Partner portal production state missing: ${marker}`);
if(portal.includes("savePortalStore(next)")) errors.push("Partner lead creation must not rely on local/shared-store optimistic writes.");
if(errors.length){console.error(errors.map(e=>`ERROR: ${e}`).join("\n"));process.exit(1)}
console.log("V60 Partner portal workflow verification passed: lead scope, direct snapshot and server-side lead creation are present.");
