import fs from 'node:fs';
const e=[];const need=(ok,msg)=>{if(!ok)e.push(msg)};
const home=fs.readFileSync('src/components/partner/partner-home.tsx','utf8'),css=fs.readFileSync('src/styles.css','utf8');
for(const m of ['Spot the business problem.','Make the introduction','WHAT TO REFER','SEE WHAT YOU ARE REFERRING','YOUR PRIVATE PARTNER PORTAL','Chat with Admin'])need(home.includes(m),`Partner V73 marker missing: ${m}`);
for(const m of ['.v73-hover-card','.v73-partner-hero','.v73-partner-story','.v73-portal-frame'])need(css.includes(m),`Partner visual system missing: ${m}`);
need(css.includes('.v73-hover-card:hover'),'Partner hover interaction missing.');
need(css.includes('Plus Jakarta Sans')&&css.includes('Sora'),'Premium typography tokens missing.');
need(!home.includes('₹5,000 total incentive')&&!home.includes('name:"ERP"'),'Removed Partner public content returned.');
if(e.length){console.error(e.map(x=>`ERROR: ${x}`).join('\n'));process.exit(1)}
console.log('V73 Partner design gate passed: story, visual product guidance, private commercial positioning and hover system are locked.');
