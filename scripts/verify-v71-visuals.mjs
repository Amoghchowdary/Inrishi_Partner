import fs from "node:fs";
const errors=[];const need=(ok,msg)=>{if(!ok)errors.push(msg)};
const home=fs.readFileSync("src/components/partner/partner-home.tsx","utf8");
const css=fs.readFileSync("src/styles.css","utf8");
need(home.includes("v71-partner-hero-art")&&home.includes("heroArt"),"V71 Partner hero product artwork is missing.");
need(home.includes("v71-partner-product-visuals")&&home.includes("v71-product-shot"),"V71 product screenshot-style visual gallery is missing.");
need(home.includes("v71-journey-board")&&home.includes("v71-journey-step"),"V71 visual referral journey is missing.");
need(css.includes(".v71-product-shot")&&css.includes(".v71-journey-board"),"V71 Partner visual styling is missing.");
if(errors.length){console.error(errors.map(e=>`ERROR: ${e}`).join("\n"));process.exit(1)}
console.log("V71 Partner visual-content gate passed: hero artwork, software mockups and referral journey are present.");
