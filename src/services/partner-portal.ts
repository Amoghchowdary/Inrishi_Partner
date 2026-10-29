import { appsScriptCall } from "@/lib/apps-script-api";
import type { PortalStore } from "@/lib/portal-store";
export type PartnerService={id:string;name:string;description:string;incentiveType:"Fixed"|"Percentage";incentiveValue:number;qualifyingPaymentPercent:number};
export type PartnerPortalSnapshot={ok:boolean;version:string;revision:number;generatedAt:string;store:PortalStore;eligibleServices:PartnerService[];referralCode:string;notifications:Array<{id:string;title:string;body:string;read:boolean;createdAt:string}>};
export type PartnerLeadInput={customerName:string;company:string;phone:string;email:string;location:string;notes:string;source:string;followUpDate:string;serviceId:string;expectedValue:number};
export const getPartnerPortalSnapshotFn=()=>appsScriptCall<PartnerPortalSnapshot>("partner.portal.snapshot",{},{role:"partner"});
export const createPartnerLeadFn=(data:PartnerLeadInput)=>appsScriptCall<{ok:boolean;leadId:string}>("partner.lead.create",data,{role:"partner"});
export const recordPartnerPaymentFn=(leadId:string,amount:number,reference:string)=>appsScriptCall<{ok:boolean;requiredAdvance:number;qualifyingPaymentPercent?:number;totalPaid?:number;eligibleIncentive?:number;totalIncentive?:number}>("partner.recordAdvance",{leadId,amount,reference},{role:"partner"});
export const convertPartnerLeadFn=(leadId:string)=>appsScriptCall<{ok:boolean;customerId:string;projectId:string;incentiveId?:string;incentiveStatus?:string}>("partner.convertLead",{leadId},{role:"partner"});
