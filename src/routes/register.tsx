import { createFileRoute } from "@tanstack/react-router";
import { PartnerRegister } from "@/components/partner/partner-register";
export const Route=createFileRoute("/register")({head:()=>({meta:[{title:"Partner Registration | Inrishi"},{name:"robots",content:"noindex, nofollow"}]}),component:PartnerRegister});
