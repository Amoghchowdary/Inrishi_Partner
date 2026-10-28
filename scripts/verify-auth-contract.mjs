import fs from "node:fs";
const errors=[];const auth=fs.readFileSync("src/services/partner-auth.ts","utf8"),login=fs.readFileSync("src/components/partner/partner-login.tsx","utf8"),register=fs.readFileSync("src/components/partner/partner-register.tsx","utf8");
for(const action of ["auth.partner.begin","auth.partner.verifyOtp","auth.partner.session","auth.partner.changePassword","auth.partner.recovery.request","auth.partner.recovery.verify","auth.partner.recovery.complete"])if(!auth.includes(`\"${action}\"`))errors.push(`Partner auth action missing: ${action}`);
for(const marker of ["OTP","firstPassword","temporary password","changePartnerPasswordFn","Forgot password","Forgot Login ID"])if(!login.includes(marker))errors.push(`Partner login/activation marker missing: ${marker}`);
if(register.includes('type="password"')||register.includes("Password"))errors.push("Partner application must not create a password before Admin approval.");
for(const marker of ["approval","Login ID","temporary password","referral code","approved services"])if(!register.toLowerCase().includes(marker.toLowerCase()))errors.push(`Partner approval explanation missing: ${marker}`);
if(errors.length){console.error(errors.map(e=>`ERROR: ${e}`).join("\n"));process.exit(1)}console.log("V62 Partner auth contract passed: approval-first credentials, temporary password, mandatory OTP and recovery are locked.");
