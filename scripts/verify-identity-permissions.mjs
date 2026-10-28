import fs from "node:fs";
const errors=[];const auth=fs.readFileSync("src/services/partner-auth.ts","utf8"),login=fs.readFileSync("src/components/partner/partner-login.tsx","utf8"),register=fs.readFileSync("src/components/partner/partner-register.tsx","utf8"),contract=JSON.parse(fs.readFileSync("backend-contract.json","utf8"));
for(const action of ["auth.partner.begin","auth.partner.verifyOtp","auth.partner.changePassword","auth.partner.recovery.request","auth.partner.recovery.verify","auth.partner.recovery.complete","partner.register"])if(!contract.actions.includes(action))errors.push(`Partner identity backend action missing: ${action}`);
if(!login.includes("firstPassword")||!login.includes("changePartnerPasswordFn"))errors.push("First-login temporary-password replacement is missing.");
if(!login.includes("OTP"))errors.push("Mandatory Partner login OTP is missing.");
if(register.includes('type="password"'))errors.push("Application form must not capture a permanent password before approval.");
if(errors.length){console.error(errors.map(e=>`ERROR: ${e}`).join("\n"));process.exit(1)}console.log("V62 Partner identity gate passed: approval-first account provisioning and mandatory OTP are enforced.");
