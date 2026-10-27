import fs from "node:fs";
const errors=[];
const auth=fs.readFileSync("src/services/partner-auth.ts","utf8");
const login=fs.readFileSync("src/components/partner/partner-login.tsx","utf8");
const runtime=fs.readFileSync("src/lib/runtime-config.ts","utf8");
const publicConfig=fs.readFileSync("public/inrishi-config.js","utf8");
for(const token of ['"auth.partner.begin"','"auth.partner.verifyOtp"','"auth.partner.recovery.request"','"auth.partner.recovery.verify"','"auth.partner.recovery.complete"']) if(!auth.includes(token)) errors.push(`Partner auth action missing: ${token}`);
for(const marker of ["Forgot password?","Forgot Login ID?","Verify recovery OTP","OTP verified. You can now create the new credential.","Create new Partner Login ID"]) if(!login.includes(marker)) errors.push(`Partner recovery UI marker missing: ${marker}`);
if(login.indexOf("Verify recovery OTP")>login.indexOf("Create new Partner Login ID")) errors.push("OTP verification must occur before credential creation UI.");
const backend="https://script.google.com/macros/s/AKfycbzQ1YMIghWp_p3hy3NxsJraffY_AjLA77JlyfYF7YvkGlylLnV2MiDgJViLjByn9ntq/exec";
if(!runtime.includes(backend)||!publicConfig.includes(backend)) errors.push("Approved Apps Script backend must remain embedded in Partner runtime layers.");
if(errors.length){console.error(errors.map(e=>`ERROR: ${e}`).join("\n"));process.exit(1)}
console.log("V60 partner auth contract passed: login OTP and OTP-first password/Login-ID recovery are locked.");
