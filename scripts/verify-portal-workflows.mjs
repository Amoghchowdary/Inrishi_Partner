import fs from 'node:fs';
const e=[];const need=(ok,msg)=>{if(!ok)e.push(msg)};const home=fs.readFileSync('src/components/partner/partner-home.tsx','utf8'),portal=fs.readFileSync('src/components/partner/partner-portal.tsx','utf8'),chat=fs.readFileSync('src/components/secure-chat.tsx','utf8');
for(const m of ['Spot a business problem','Add the lead','Stay connected',"Inrishi's role",'Payment received','Eligibility updates','Admin verifies','Payout recorded'])need(home.includes(m),`Partner public workflow missing: ${m}`);
for(const m of ['What you can refer','Earnings','Chat with Admin','Record payment','eligibleAmount','paidIncentiveAmount'])need(portal.includes(m),`Partner portal workflow missing: ${m}`);
need(chat.includes('Inrishi Admin'),'Partner Admin chat identity missing.');
need(!chat.includes('This action is not available on the Partner site.'),'Old Partner-chat rejection copy remains.');
if(e.length){console.error(e.map(x=>`ERROR: ${x}`).join('\n'));process.exit(1)}
console.log('V72 Partner workflow gate passed: referral, payment, incentive and Admin-chat journeys are present.');
