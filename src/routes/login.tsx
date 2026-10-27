import { createFileRoute } from "@tanstack/react-router";
import { PartnerLogin } from "@/components/partner/partner-login";
export const Route=createFileRoute("/login")({head:()=>({meta:[{title:"Partner Login | Inrishi"},{name:"robots",content:"noindex, nofollow"}]}),component:PartnerLogin});
