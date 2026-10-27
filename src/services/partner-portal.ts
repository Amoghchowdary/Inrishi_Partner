import { appsScriptCall } from "@/lib/apps-script-api";
import type { PortalStore } from "@/lib/portal-store";

export type PartnerPortalSnapshot={ok:boolean;version:string;revision:number;generatedAt:string;store:PortalStore};
export type PartnerLeadInput={customerName:string;company:string;phone:string;email:string;location:string;notes:string;source:string;followUpDate:string};

export const getPartnerPortalSnapshotFn=()=>appsScriptCall<PartnerPortalSnapshot>("partner.portal.snapshot",{},{role:"partner"});
export const createPartnerLeadFn=(data:PartnerLeadInput)=>appsScriptCall<{ok:boolean;leadId:string}>("partner.lead.create",data,{role:"partner"});
