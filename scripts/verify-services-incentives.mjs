import fs from 'node:fs';
const e=[];const need=(ok,msg)=>{if(!ok)e.push(msg)};const home=fs.readFileSync('src/components/partner/partner-home.tsx','utf8'),portal=fs.readFileSync('src/components/partner/partner-portal.tsx','utf8'),svc=fs.readFileSync('src/services/partner-portal.ts','utf8');
for(const m of ['₹25,000','₹12,500','₹2,500','₹5,000','Partial customer payment = proportional incentive eligibility'])need(home.includes(m),`Partner incentive example missing: ${m}`);
need(portal.includes('eligibleAmount')&&portal.includes('paidIncentiveAmount'),'Partner portal proportional incentive fields missing.');
need(svc.includes('eligibleIncentive')&&svc.includes('totalIncentive'),'Partner payment API result contract missing.');
if(e.length){console.error(e.map(x=>`ERROR: ${x}`).join('\n'));process.exit(1)}
console.log('V71 Partner incentive gate passed: proportional customer-payment eligibility and portal earnings fields are wired.');
