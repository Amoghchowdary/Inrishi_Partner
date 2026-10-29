import fs from 'node:fs';
const e=[];const need=(ok,msg)=>{if(!ok)e.push(msg)};const home=fs.readFileSync('src/components/partner/partner-home.tsx','utf8'),css=fs.readFileSync('src/styles.css','utf8');
for(const m of ['Refer businesses.','Earn as they pay.','Find the need.','Make the connection.','WHAT TO REFER','HOW EARNINGS WORK','ONE PARTNER PORTAL','Chat with Inrishi Admin','₹5,000 total incentive'])need(home.includes(m),`Partner V71 marker missing: ${m}`);
for(const m of ['.v69-hover-card','.v69-partner-hero','.v69-partner-nav','.v69-chat-preview'])need(css.includes(m),`Partner visual system missing: ${m}`);
need(css.includes('.v69-hover-card:hover'),'White hover-card interaction missing.');
need(css.includes('Plus Jakarta Sans')&&css.includes('Sora'),'Premium typography tokens missing.');
if(e.length){console.error(e.map(x=>`ERROR: ${x}`).join('\n'));process.exit(1)}
console.log('V71 Partner design gate passed: visual referral journey, earning example, portal preview and hover-card system are locked.');
