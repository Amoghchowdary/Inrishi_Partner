import{appsScriptCall}from"@/lib/apps-script-api";
export const submitWebsiteInquiry=(input:{name:string;phone:string;email?:string;requirement:string;source?:string})=>appsScriptCall<{ok:boolean;id:string;message:string}>("public.contact.submit",input,{role:"public"});
export const registerPartner=(input:{name:string;email:string;phone:string;company:string;city:string;experience:string;note:string;password:string})=>appsScriptCall<{ok:boolean;message?:string;loginId?:string;status?:string}>("partner.register",input,{role:"public"});
export const recordPartnerAdvancePayment=(input:{leadId:string;amount:number;reference:string})=>appsScriptCall<{ok:boolean;requiredAdvance:number}>("partner.recordAdvance",input,{role:"partner"});
export const convertPartnerLead=(input:{leadId:string})=>appsScriptCall<{ok:boolean;customerId:string;projectId:string;loginId:string}>("partner.convertLead",input,{role:"partner",timeoutMs:60000});
export const sendPartnerCustomerLogin=(input:{id:string;customerId:string})=>appsScriptCall<{ok:boolean;message:string}>("partner.sendCustomerLogin",input,{role:"partner",timeoutMs:60000});
