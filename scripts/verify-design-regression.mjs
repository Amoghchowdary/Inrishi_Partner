import fs from 'node:fs';
const e=[];const need=(ok,msg)=>{if(!ok)e.push(msg)};
const home=fs.readFileSync('src/components/partner/partner-home.tsx','utf8');
const css=fs.readFileSync('src/styles.css','utf8');
for(const m of ['Refer businesses.','Earn as they pay.','Find the need.','Make the connection.','WHAT TO REFER','HOW EARNINGS WORK','ONE PARTNER PORTAL','Chat with Inrishi Admin'])need(home.includes(m),`Partner V72 marker missing: ${m}`);
for(const m of ['.v69-hover-card','.v69-partner-hero','.v69-partner-nav','.v69-chat-preview'])need(css.includes(m),`Partner visual system missing: ${m}`);
need(css.includes('.v69-hover-card:hover'),'White hover-card interaction missing.');
need(css.includes('Plus Jakarta Sans')&&css.includes('Sora'),'Premium typography tokens missing.');
need(!home.includes('WEBSITE REFERRAL EXAMPLE')&&!home.includes('₹5,000 total incentive'),'Public website referral incentive example must remain removed in V72.');
if(e.length){console.error(e.map(x=>`ERROR: ${x}`).join('\n'));process.exit(1)}
console.log('V72 Partner design gate passed: public ₹5,000 referral example removed; visual journey and portal preview remain locked.');
