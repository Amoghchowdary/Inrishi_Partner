import fs from 'node:fs';
const e=[];const need=(ok,msg)=>{if(!ok)e.push(msg)};
const home=fs.readFileSync('src/components/partner/partner-home.tsx','utf8');
const portal=fs.readFileSync('src/components/partner/partner-portal.tsx','utf8');
const svc=fs.readFileSync('src/services/partner-portal.ts','utf8');
need(!home.includes('WEBSITE REFERRAL EXAMPLE')&&!home.includes('₹5,000 total incentive')&&!home.includes('Customer pays balance'),'Public website referral incentive example must remain removed in V72.');
need(portal.includes('eligibleAmount')&&portal.includes('paidIncentiveAmount'),'Partner portal proportional incentive fields missing.');
need(svc.includes('eligibleIncentive')&&svc.includes('totalIncentive'),'Partner payment API result contract missing.');
if(e.length){console.error(e.map(x=>`ERROR: ${x}`).join('\n'));process.exit(1)}
console.log('V72 Partner incentive gate passed: public referral example removed; portal incentive engine remains wired.');
