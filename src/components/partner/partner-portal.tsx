import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { BadgeIndianRupee, BookOpenCheck, LayoutDashboard, LogOut, Plus, RefreshCw, Target, UsersRound, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import inrishiLogo from "@/assets/inrishi-logo.png";
import type { PortalStore } from "@/lib/portal-store";
import { logoutPartnerFn } from "@/services/partner-auth";
import { createPartnerLeadFn, getPartnerPortalSnapshotFn } from "@/services/partner-portal";
import { siteHref } from "@/lib/site-path";

type Tab="dashboard"|"guide"|"leads"|"customers"|"projects"|"incentives";
const tabs:[Tab,string,typeof LayoutDashboard][]=[
  ["dashboard","Dashboard",LayoutDashboard],
  ["guide","How to bring leads",BookOpenCheck],
  ["leads","Leads",Target],
  ["customers","Customers",UsersRound],
  ["projects","Projects",Workflow],
  ["incentives","Incentives",BadgeIndianRupee],
];
const emptyLead={customerName:"",company:"",phone:"",email:"",location:"",notes:"",source:"Direct",followUpDate:""};

export function PartnerPortal({session}:{session:{loginId?:string;email:string;name?:string}}){
  const[store,setStore]=useState<PortalStore|null>(null);
  const[tab,setTab]=useState<Tab>("dashboard");
  const[showForm,setShowForm]=useState(false);
  const[lead,setLead]=useState(emptyLead);
  const[loading,setLoading]=useState(true);
  const[saving,setSaving]=useState(false);
  const[error,setError]=useState("");

  const refresh=useCallback(async()=>{
    setLoading(true);setError("");
    try{const snapshot=await getPartnerPortalSnapshotFn();setStore(snapshot.store)}
    catch(e){setError(e instanceof Error?e.message:"Partner data could not be loaded.")}
    finally{setLoading(false)}
  },[]);

  useEffect(()=>{void refresh()},[refresh]);
  const partner=useMemo(()=>store?.partners.find(p=>p.loginId===session.loginId||p.email===session.email)??store?.partners[0]??null,[store,session]);
  async function logout(){await logoutPartnerFn();location.assign(siteHref("/login"))}
  async function addLead(e:FormEvent){e.preventDefault();setSaving(true);setError("");try{await createPartnerLeadFn(lead);setLead(emptyLead);setShowForm(false);await refresh()}catch(err){setError(err instanceof Error?err.message:"Lead could not be saved.")}finally{setSaving(false)}}

  if(loading&&!store)return <div className="workspace-shell grid min-h-screen place-items-center px-5"><div className="workspace-panel max-w-lg p-8 text-center"><RefreshCw className="mx-auto animate-spin text-primary"/><h1 className="mt-4 font-display text-2xl font-semibold">Loading partner workspace</h1><p className="mt-3">Connecting to the Inrishi production backend.</p></div></div>;
  if(!partner)return <div className="workspace-shell grid min-h-screen place-items-center px-5"><div className="workspace-panel max-w-lg p-8 text-center"><h1 className="font-display text-2xl font-semibold">Partner workspace unavailable</h1><p className="mt-3">{error||"The signed-in partner record is not available in the production database."}</p><Button className="mt-5" onClick={()=>void refresh()}>Retry</Button></div></div>;

  const customers=store?.customers??[];
  const projects=customers.filter(c=>c.projectId);
  return <div className="workspace-shell partner-workspace min-h-screen">
    <header className="workspace-header border-b border-white/10"><div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 lg:px-8"><a href={siteHref("/")}><img src={inrishiLogo} alt="INRISHI" className="brand-logo"/></a><div className="flex items-center gap-3"><span className="hidden text-sm text-white/70 sm:inline">{partner.name}</span><Button onClick={()=>void refresh()} variant="ghost"><RefreshCw size={16}/> Refresh</Button><Button onClick={logout} variant="ghost"><LogOut size={16}/> Sign out</Button></div></div></header>
    <div className="mx-auto grid max-w-[1500px] gap-5 px-5 py-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:px-8">
      <aside className="workspace-sidebar h-fit p-3"><p className="px-3 py-2 text-xs font-bold uppercase tracking-[.16em] text-white/40">Partner portal</p>{tabs.map(([key,label,Icon])=><button key={key} onClick={()=>setTab(key)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold ${tab===key?"bg-primary/12 text-primary":"text-white/65 hover:text-white"}`}><Icon size={17}/>{label}</button>)}</aside>
      <main className="workspace-content min-w-0">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[.15em] text-primary">INRISHI PARTNER PORTAL</p><h1 className="mt-2 font-display text-3xl font-semibold text-white">{partner.company||partner.name}</h1></div>{tab==="leads"&&<Button onClick={()=>setShowForm(v=>!v)}><Plus size={16}/> Add lead</Button>}</div>
        {error&&<div className="workspace-panel mb-5 border-red-200 p-4 text-sm font-semibold text-red-700">{error}</div>}
        {showForm&&tab==="leads"&&<form onSubmit={addLead} className="workspace-panel mb-5 grid gap-4 p-6 sm:grid-cols-2"><label className="form-label">Customer name<input required value={lead.customerName} onChange={e=>setLead({...lead,customerName:e.target.value})} className="form-input"/></label><label className="form-label">Company<input value={lead.company} onChange={e=>setLead({...lead,company:e.target.value})} className="form-input"/></label><label className="form-label">Phone<input required value={lead.phone} onChange={e=>setLead({...lead,phone:e.target.value})} className="form-input"/></label><label className="form-label">Email<input type="email" value={lead.email} onChange={e=>setLead({...lead,email:e.target.value})} className="form-input"/></label><label className="form-label">Location<input value={lead.location} onChange={e=>setLead({...lead,location:e.target.value})} className="form-input"/></label><label className="form-label">Follow-up date<input type="date" value={lead.followUpDate} onChange={e=>setLead({...lead,followUpDate:e.target.value})} className="form-input"/></label><label className="form-label sm:col-span-2">Requirement / notes<textarea rows={4} value={lead.notes} onChange={e=>setLead({...lead,notes:e.target.value})} className="form-input" placeholder="Describe the customer's requirement and the service they are interested in."/></label><Button type="submit" disabled={saving} className="sm:col-span-2">{saving?"Saving…":"Save lead to Inrishi"}</Button></form>}
        {tab==="dashboard"&&<div className="grid gap-4 md:grid-cols-4"><Metric label="Leads" value={partner.leads.length}/><Metric label="Customers" value={customers.length}/><Metric label="Projects" value={projects.length}/><Metric label="Incentives" value={partner.incentives.length}/></div>}
        {tab==="guide"&&<LeadGuide/>}
        {tab==="leads"&&<div className="grid gap-3">{partner.leads.length?partner.leads.map(l=><article key={l.id} className="workspace-panel p-5"><div className="flex flex-wrap justify-between gap-3"><div><strong>{l.customerName}</strong><p className="mt-1 text-sm">{l.company||l.location||"Customer lead"}</p><p className="mt-2 text-xs">{l.phone}{l.email?` · ${l.email}`:""}</p></div><span className="text-sm font-semibold text-emerald-700">{l.status}</span></div>{l.notes&&<p className="mt-3 text-sm">{l.notes}</p>}</article>):<Empty title="No leads yet" body="Use Add lead after you have identified and spoken with an eligible prospect."/>}</div>}
        {tab==="customers"&&<div className="grid gap-3">{customers.length?customers.map(c=><article key={c.id} className="workspace-panel grid gap-2 p-5 md:grid-cols-4"><strong>{c.name}</strong><span>{c.company||"—"}</span><span>{c.status}</span><span>{c.projectId||"No project ID"}</span></article>):<Empty title="No converted customers yet" body="Customers appear here after an eligible lead completes the conversion process."/>}</div>}
        {tab==="projects"&&<div className="grid gap-3">{projects.length?projects.map(c=><article key={c.id} className="workspace-panel p-5"><div className="flex flex-wrap justify-between gap-3"><div><strong>{c.company||c.name}</strong><p className="mt-1 text-sm">Project: {c.projectId}</p></div><span className="font-semibold">{Math.round(c.progress.length?c.progress.reduce((s,p)=>s+p.percent,0)/c.progress.length:0)}%</span></div><div className="mt-4 grid gap-2">{c.progress.map(p=><div key={p.id} className="rounded-lg bg-slate-50 p-3"><div className="flex justify-between gap-3"><span className="font-semibold">{p.label}</span><span>{p.percent}%</span></div><p className="mt-1 text-xs">{p.status}</p></div>)}</div></article>):<Empty title="No active projects yet" body="Project records appear after a lead is converted into a customer."/>}</div>}
        {tab==="incentives"&&<div className="grid gap-3">{partner.incentives.length?partner.incentives.map(i=><div key={i.id} className="workspace-panel grid gap-2 p-5 sm:grid-cols-3"><strong>{i.service}</strong><span>₹{i.incentiveAmount.toLocaleString("en-IN")}</span><span>{i.status}</span></div>):<Empty title="No incentives yet" body="Incentives appear after the related customer and payment conditions are recorded."/>}</div>}
      </main>
    </div>
  </div>;
}

function Metric({label,value}:{label:string;value:number}){return <div className="workspace-panel p-6"><p>{label}</p><strong className="mt-2 block text-4xl">{value}</strong></div>}
function Empty({title,body}:{title:string;body:string}){return <div className="workspace-panel p-7"><h2 className="font-display text-xl font-semibold">{title}</h2><p className="mt-2 text-sm">{body}</p></div>}
function LeadGuide(){const steps=[
  ["01","Identify an eligible prospect","Speak with businesses that have a genuine requirement for an approved Inrishi service."],
  ["02","Understand the requirement","Confirm the decision-maker, business need, contact details, location and expected timeline. Do not promise unapproved pricing or delivery dates."],
  ["03","Add the lead in the Partner Portal","Enter accurate customer details and requirement notes. A lead should be added only after the prospect has agreed to be contacted about the requirement."],
  ["04","Maintain the customer relationship","Follow up with the prospect, keep the requirement current and coordinate discussions while Inrishi handles technical scope and delivery planning."],
  ["05","Inrishi confirms scope and commercials","The Inrishi team validates feasibility, service scope, official pricing and the next commercial step before any commitment is made."],
  ["06","Qualifying payment and customer conversion","After the approved qualifying payment is recorded, the lead can move into the customer/project workflow."],
  ["07","Track delivery and incentive","Follow project progress in the portal and track the incentive status linked to the eligible converted lead."],
];return <div className="grid gap-4"><div className="workspace-panel p-7"><p className="section-kicker">PARTNER SCOPE OF WORK</p><h2 className="mt-3 font-display text-3xl font-semibold">How to bring leads to Inrishi</h2><p className="mt-3 text-sm">Your role is to identify genuine prospects, understand the requirement, maintain the relationship and enter accurate lead information. Inrishi confirms technical scope, official commercials and delivery.</p></div><div className="grid gap-4 md:grid-cols-2">{steps.map(([n,t,b])=><article key={n} className="workspace-panel p-6"><span className="font-mono text-xs text-emerald-700">/{n}</span><h3 className="mt-3 font-display text-xl font-semibold">{t}</h3><p className="mt-2 text-sm">{b}</p></article>)}</div></div>}
