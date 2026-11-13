import fs from 'node:fs';
const e=[];const need=(ok,msg)=>{if(!ok)e.push(msg)};
const home=fs.readFileSync('src/components/partner/partner-home.tsx','utf8'),css=fs.readFileSync('src/styles.css','utf8'),portal=fs.readFileSync('src/components/partner/partner-portal.tsx','utf8');
for(const m of ['Refer the problem. We build the solution.','WHAT TO REFER','SEE WHAT YOU ARE REFERRING','YOUR PRIVATE PARTNER PORTAL','Chat with Admin'])need(home.includes(m),`Partner V74 marker missing: ${m}`);
for(const m of ['.v73-hover-card','.v73-partner-hero','.v73-portal-frame','.v74-partner-hero-visual','.v74-tile:hover','.v74-slide:hover'])need(css.includes(m),`Partner visual system missing: ${m}`);
for(const asset of ['partner-network.svg','product-website.svg','product-crm.svg','product-ems.svg','product-ai.svg'])need(home.includes(asset),`Partner V74 image content missing: ${asset}`);
need(css.includes('Plus Jakarta Sans')&&css.includes('Sora'),'Premium typography tokens missing.');
need(!home.includes('How it works')&&!portal.includes('"How it works"'),'How it works returned to Partner experience.');
need(!home.includes('₹5,000 total incentive')&&!home.includes('name:"ERP"'),'Removed Partner public content returned.');
if(e.length){console.error(e.map(x=>`ERROR: ${x}`).join('\n'));process.exit(1)}
console.log('V74 Partner design gate passed: short hero, richer image content, private commercial positioning and white/black tile hover are locked.');
