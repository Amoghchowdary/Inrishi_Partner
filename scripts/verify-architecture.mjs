import fs from "node:fs";
const errors=[];
const tree=fs.readFileSync("src/routeTree.gen.ts","utf8");
for(const r of ["'/'","'/login'","'/register'","'/portal'"])if(!tree.includes(r))errors.push(`Missing canonical partner route ${r}`);
for(const stale of ["'/partner'","'/partner-login'","'/partner-register'","'/partner-portal'"])if(tree.includes(stale))errors.push(`Legacy partner route remains in route tree: ${stale}`);
for(const forbidden of ["src/routes/partner.tsx","src/routes/partner-login.tsx","src/routes/partner-register.tsx","src/routes/partner-portal.tsx","src/routes/admin.tsx","src/services/admin-auth.ts","src/routes/customer-login.tsx","src/routes/customer-portal.tsx"])if(fs.existsSync(forbidden))errors.push(`Forbidden legacy/Main source in Partner routes: ${forbidden}`);
for(const component of ["src/components/partner/partner-home.tsx","src/components/partner/partner-login.tsx","src/components/partner/partner-register.tsx","src/components/partner/partner-portal.tsx"])if(!fs.existsSync(component))errors.push(`Partner component missing: ${component}`);
const api=fs.readFileSync("src/lib/business-api.ts","utf8");if(/role:"admin"|admin\.inquiries/.test(api))errors.push("Partner bundle still contains Admin API actions.");
if(errors.length){console.error(errors.map(e=>`ERROR: ${e}`).join("\n"));process.exit(1)}
console.log("V56 partner architecture passed: canonical routes are isolated from legacy/Main/Admin route sources.");
