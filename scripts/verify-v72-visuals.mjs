import fs from "node:fs";
const errors=[];const need=(ok,msg)=>{if(!ok)errors.push(msg)};
const home=fs.readFileSync("src/components/partner/partner-home.tsx","utf8");
const css=fs.readFileSync("src/styles.css","utf8");
need(home.includes("v72-partner-hero-art")&&home.includes("heroArt"),"V72 Partner hero product artwork is missing.");
need(home.includes("v72-partner-product-visuals")&&home.includes("v72-product-shot"),"V72 product screenshot-style visual gallery is missing.");
need(home.includes("v72-journey-board")&&home.includes("v72-journey-step"),"V72 visual referral journey is missing.");
need(css.includes(".v72-product-shot")&&css.includes(".v72-journey-board"),"V72 Partner visual styling is missing.");
if(errors.length){console.error(errors.map(e=>`ERROR: ${e}`).join("\n"));process.exit(1)}
console.log("V72 Partner visual-content gate passed: hero artwork, software mockups and referral journey are present.");
