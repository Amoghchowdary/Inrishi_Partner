import { createFileRoute, redirect } from "@tanstack/react-router";
import { PartnerPortal } from "@/components/partner/partner-portal";
import { getCurrentPartnerFn } from "@/services/partner-auth";
export const Route=createFileRoute("/portal")({head:()=>({meta:[{title:"Partner Workspace | Inrishi"},{name:"robots",content:"noindex, nofollow"}]}),loader:async()=>{const p=await getCurrentPartnerFn();if(!p)throw redirect({to:"/login"});return p},component:Page});
function Page(){return <PartnerPortal session={Route.useLoaderData()}/>;}
