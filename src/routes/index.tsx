import { createFileRoute } from "@tanstack/react-router";
import { PartnerWebsite } from "@/components/partner/partner-home";
export const Route=createFileRoute("/")({head:()=>({meta:[{title:"INRISHI Partner Network | Business Referral Program India"},{name:"description",content:"Join the INRISHI Partner Network to refer genuine business requirements for AI automation, CRM, employee management and business websites with private portal tracking."}]}),component:PartnerWebsite});
