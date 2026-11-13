import fs from 'node:fs';
const e=[];const need=(ok,msg)=>{if(!ok)e.push(msg)};const home=fs.readFileSync('src/components/partner/partner-home.tsx','utf8'),html=fs.readFileSync('index.html','utf8'),sitemap=fs.readFileSync('public/sitemap.xml','utf8');
for(const m of ['Refer the problem. We build the solution.','WHAT TO REFER','Business Website','CRM','Employee Management','AI Automation'])need(home.includes(m),`Partner acquisition marker missing: ${m}`);
need(!home.includes('name:"ERP"')&&!home.includes('₹5,000'),'Partner public acquisition surface contains removed product/commercial content.');
need(home.includes('Become a Partner')&&home.includes('Partner Login'),'Partner conversion CTAs missing.');
need(html.toLowerCase().includes('partner'),'Partner index metadata missing.');
need(sitemap.includes('partner.inrishi.in'),'Partner sitemap domain missing.');
if(e.length){console.error(e.map(x=>`ERROR: ${x}`).join('\n'));process.exit(1)}
console.log('V74 Partner SEO gate passed: current referral proposition, products and conversion CTAs are present without public commercial disclosure.');
