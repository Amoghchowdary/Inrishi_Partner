import fs from "node:fs";

const errors=[];
const auth=fs.readFileSync("src/services/partner-auth.ts","utf8");
const login=fs.readFileSync("src/components/partner/partner-login.tsx","utf8");
const runtime=fs.readFileSync("src/lib/runtime-config.ts","utf8");
const publicConfig=fs.readFileSync("public/inrishi-config.js","utf8");
for(const token of ['"auth.partner.begin"','"auth.partner.verifyOtp"','"auth.partner.requestReset"','"auth.partner.resetPassword"']){
  if(!auth.includes(token)) errors.push(`Partner auth action missing: ${token}`);
}
if(!login.includes("Partner Login")) errors.push("Partner login UI missing.");
const backend="https://script.google.com/macros/s/AKfycbzQ1YMIghWp_p3hy3NxsJraffY_AjLA77JlyfYF7YvkGlylLnV2MiDgJViLjByn9ntq/exec";
if(!runtime.includes(backend)||!publicConfig.includes(backend)) errors.push("Approved Apps Script backend must remain embedded in Partner runtime layers.");
const apiSource=fs.readFileSync("src/lib/apps-script-api.ts","utf8");if(!apiSource.includes("site:config.SITE_ID")) errors.push("Apps Script request must carry production site identity.");if(!apiSource.includes("origin:location.origin")) errors.push("Apps Script request must carry browser origin.");if(errors.length){console.error(errors.map(e=>`ERROR: ${e}`).join("\n"));process.exit(1)}
console.log("V55 partner auth contract passed: partner auth actions and backend lock verified.");
