import fs from 'node:fs';
const e=[]; const need=(ok,msg)=>{if(!ok)e.push(msg)};
const portal=fs.readFileSync('src/components/partner/partner-portal.tsx','utf8');
const register=fs.readFileSync('src/components/partner/partner-register.tsx','utf8');
const home=fs.readFileSync('src/components/partner/partner-home.tsx','utf8');
const contract=JSON.parse(fs.readFileSync('backend-contract.json','utf8'));
need(contract.version==='64.0.0','Backend contract must be V64.');
need(contract.actions.length===74,'Backend contract must expose 74 actions.');
need(portal.includes('const leads=partner.leads??[],incentives=partner.incentives??[]'),'Partner portal must tolerate legacy missing arrays.');
need(portal.includes('sessionStorage')&&portal.includes('#partner-'),'Partner snapshot cache/hash navigation missing.');
need(portal.includes('emailSent===false'),'Customer-login delivery warning missing after conversion.');
need(register.includes('acknowledgementSent'),'Partner application acknowledgement status missing.');
for(const f of ['public/privacy.html','public/terms.html','public/partner-terms.html'])need(fs.existsSync(f),`Missing legal production file: ${f}`);
for(const href of ['/privacy.html','/terms.html','/partner-terms.html'])need(register.includes(href)||home.includes(href),`Local legal link missing: ${href}`);
if(e.length){console.error(e.map(x=>`ERROR: ${x}`).join('\n'));process.exit(1)}
console.log('V81 Partner reliability gate passed: cached navigation, safe legacy records, acknowledgement flow, customer-login warnings and local legal documents are locked.');
