import fs from "node:fs";
const errors=[];const read=p=>fs.readFileSync(p,"utf8"),tree=read("src/routeTree.gen.ts"),four=read("public/404.html"),html=read("index.html");
for(const r of ["/","/login","/register","/portal"])if(!tree.includes(`'${r}'`))errors.push(`Partner route missing: ${r}`);
for(const r of ["/admin","/customer-login","/customer-portal","/partner-login","/partner-register","/partner-portal"])if(tree.includes(`'${r}'`))errors.push(`Retired/non-partner route exists: ${r}`);
if(/location\.replace|\/\?\/|~and~|Finding your Partner page|Route recovery/i.test(four+html))errors.push("Legacy Partner SPA route-recovery mechanism still exists.");
if(!four.includes("404 / INRISHI PARTNER")||!four.includes("Page not found.")||!four.includes("noindex,nofollow,noarchive"))errors.push("Terminal Partner 404 is incomplete.");
if(errors.length){console.error(errors.map(e=>`ERROR: ${e}`).join("\n"));process.exit(1)}console.log("V81 Partner strict-route/terminal-404 gate passed.");
