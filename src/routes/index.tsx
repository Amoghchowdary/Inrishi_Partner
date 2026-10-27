import { createFileRoute } from "@tanstack/react-router";
import { PartnerWebsite } from "@/components/partner/partner-home";
export const Route=createFileRoute("/")({head:()=>({meta:[{title:"Become an Inrishi Partner | Inrishi"},{name:"description",content:"Join the Inrishi Partner Network, register, sign in and manage leads, projects and incentives."}]}),component:PartnerWebsite});
