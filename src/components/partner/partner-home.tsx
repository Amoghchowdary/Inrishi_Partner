import {
  ArrowRight, BadgeCheck, Boxes, BriefcaseBusiness, CheckCircle2, Cloud, Handshake,
  IndianRupee, Lightbulb, LogIn, MessageSquare, Monitor, Search, ShieldCheck, Sparkles,
  UserPlus, UsersRound, WalletCards, Workflow, GraduationCap, ClipboardCheck, Building2,
  MessageCircleQuestion, Rocket, Eye, CircleDollarSign,
} from "lucide-react";
import { useEffect, useState } from "react";
import inrishiLogo from "@/assets/inrishi-public-logo.png";
import { loadPortalStore, portalStoreEventName, type PortalStore } from "@/lib/portal-store";
import { siteHref } from "@/lib/site-path";

const services=[
  {name:"AI Business Transformation",icon:Sparkles,signal:"We repeat the same work every day",label:"Automate repetitive work"},
  {name:"ERP",icon:Boxes,signal:"Sales, stock and finance are disconnected",label:"Connect operations"},
  {name:"CRM",icon:UsersRound,signal:"Leads are getting missed",label:"Organise sales follow-up"},
  {name:"Employee Management",icon:BriefcaseBusiness,signal:"Attendance and leave are messy",label:"Simplify people operations"},
  {name:"Books Customization",icon:WalletCards,signal:"Our billing workflow does not fit",label:"Adapt accounting workflows"},
  {name:"Custom Software",icon:Workflow,signal:"No standard tool fits our process",label:"Build around the process"},
  {name:"SaaS Products",icon:Cloud,signal:"We need something ready quickly",label:"Deploy ready software"},
  {name:"Website Design",icon:Monitor,signal:"Our website feels outdated",label:"Build a stronger presence"},
];

const leadSteps=[
  {n:"01",title:"Start a real conversation",body:"Talk to a business owner or decision-maker. Ask what slows the team down.",icon:MessageCircleQuestion},
  {n:"02",title:"Spot the business problem",body:"Listen for missed leads, repeated work, disconnected data, weak websites or manual tracking.",icon:Lightbulb},
  {n:"03",title:"Capture the essentials",body:"Record the contact, company, problem, location and expected timeline. Keep it factual.",icon:ClipboardCheck},
  {n:"04",title:"Submit the lead",body:"Add the opportunity in Partner Portal so the Inrishi team can review it properly.",icon:UserPlus},
  {n:"05",title:"Let Inrishi scope it",body:"We handle solution design, official pricing, timelines and technical commitments.",icon:ShieldCheck},
  {n:"06",title:"Customer decides",body:"When the customer accepts the approved proposal and the qualifying payment is recorded, the lead can convert.",icon:IndianRupee},
  {n:"07",title:"Track everything",body:"Follow project progress and incentive status directly inside your Partner Portal.",icon:Eye},
];

const journey=[
  {label:"Need",icon:Lightbulb},
  {label:"Refer",icon:UserPlus},
  {label:"Scope",icon:BadgeCheck},
  {label:"Deliver",icon:Rocket},
  {label:"Incentive",icon:CircleDollarSign},
];

export function PartnerWebsite(){
  const loginHref=siteHref("/login");
  const registerHref=siteHref("/register");
  const portalHref=siteHref("/portal");
  const[store,setStore]=useState<PortalStore|null>(null);
  useEffect(()=>{const sync=()=>setStore(loadPortalStore());sync();const e=portalStoreEventName();addEventListener(e,sync);return()=>removeEventListener(e,sync)},[]);
  const c=store?.partnerWebsiteControls;

  return <div className="partner-site min-h-screen text-white">
    {c?.announcementEnabled&&c.announcementText&&<div className="border-b border-primary/20 bg-primary/10 px-5 py-2 text-center text-xs font-semibold text-primary">{c.announcementText}</div>}
    <header className="partner-nav border-b border-white/10"><div className="mx-auto flex h-[78px] max-w-[1320px] items-center justify-between px-5 lg:px-8"><a href={siteHref("/")}><img src={inrishiLogo} alt="INRISHI" className="public-brand-logo"/></a><nav className="hidden items-center gap-6 text-sm font-semibold text-white/75 lg:flex"><a href="#why">Why partner</a><a href="#lead-scope">How it works</a><a href="#services">What to spot</a><a href="#incentives">Incentives</a><a href="#pricing">Pricing rules</a><a href="#process">Start</a>{c?.loginVisible!==false&&<a href={portalHref} className="text-primary">Partner Portal</a>}</nav><div className="flex gap-2">{c?.loginVisible!==false&&<a href={portalHref} className="inline-flex h-10 items-center gap-2 border border-white/15 px-4 text-sm font-semibold"><LogIn size={15}/> Partner Portal</a>}{c?.registrationOpen!==false&&<a href={registerHref} className="hidden h-10 items-center gap-2 bg-primary px-4 text-sm font-semibold text-slate-950 sm:inline-flex">Register <ArrowRight size={15}/></a>}</div></div></header>
    <nav className="partner-mobile-nav lg:hidden"><a href="#why">Why partner</a><a href="#lead-scope">How it works</a><a href="#services">What to spot</a><a href="#incentives">Incentives</a><a href="#pricing">Pricing</a><a href="#process">Start</a></nav>

    <main>
      <section className="mx-auto grid min-h-[650px] max-w-[1320px] items-center gap-12 px-5 py-16 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div className="partner-hero-copy"><p className="section-kicker">INRISHI PARTNER NETWORK</p><h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">{c?.heroTitle||"Turn business conversations into technology opportunities."}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">{c?.heroSubtitle||"You find the need and build the relationship. Inrishi handles solution design, official pricing, delivery and support."}</p><div className="mt-8 flex flex-wrap gap-3">{c?.registrationOpen!==false&&<a href={registerHref} className="inline-flex h-12 items-center gap-2 bg-primary px-6 font-semibold text-slate-950">Become a Partner <ArrowRight size={17}/></a>}{c?.loginVisible!==false&&<a href={loginHref} className="inline-flex h-12 items-center gap-2 border border-white/20 bg-black/10 px-6 font-semibold">Partner Login <LogIn size={17}/></a>}</div><div className="partner-audience-strip mt-8"><GraduationCap/><span>Built to be easy to learn: spot a problem → refer it → track it.</span></div></div>
        <div className="partner-hero-visual partner-hover-card" aria-label="Partner journey visual"><div className="partner-hero-orbit" aria-hidden="true"><Handshake size={64}/></div><p className="section-kicker">YOUR JOURNEY</p><h2 className="mt-3 font-display text-3xl font-semibold">Five clear checkpoints. No guesswork.</h2><p className="mt-3 max-w-[520px] text-sm leading-6">Your job is to create the connection. The portal shows what happens next.</p><div className="partner-journey-line">{journey.map(({label,icon:Icon},i)=><div className="partner-journey-node" key={label}><span><Icon size={24}/></span><b>{label}</b>{i<journey.length-1&&<ArrowRight className="partner-journey-arrow" size={18}/>}</div>)}</div></div>
      </section>

      <section className="partner-service-reel-shell" aria-label="Inrishi partner services"><div className="partner-service-reel">{[...services,...services].map(({name,icon:Icon},i)=><a href="#services" className="partner-service-chip" key={`${name}-${i}`} aria-hidden={i>=services.length}><Icon size={21}/><span>{name}</span></a>)}</div></section>

      <section id="why" className="mx-auto max-w-[1320px] px-5 py-20 lg:px-8"><p className="section-kicker">WHY BECOME A PARTNER</p><h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold sm:text-5xl">A simple role with a <span className="text-primary">clear handoff.</span></h2><p className="partner-section-intro mt-4 max-w-3xl">You do not need to be a software engineer or salesperson. You need to understand the problem clearly and connect the right business to Inrishi.</p><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[[MessageCircleQuestion,"Ask better questions","Understand what the business struggles with before talking about a product."],[UserPlus,"Refer in minutes","Submit the customer and requirement in Partner Portal. Keep the information accurate."],[Eye,"See every stage","Track review, conversion, project progress and incentive status without chasing updates."],[GraduationCap,"Learn through real cases","See how everyday business problems map to CRM, ERP, automation, software and websites."]].map(([I,t,b])=>{const Icon=I as typeof UsersRound;return <article key={String(t)} className="partner-hover-card partner-benefit-card p-7"><div className="partner-card-illustration"><Icon size={58}/></div><h3 className="mt-5 font-display text-2xl font-semibold">{String(t)}</h3><p className="mt-2 text-base leading-7">{String(b)}</p></article>})}</div></section>

      <section id="lead-scope" className="mx-auto max-w-[1320px] px-5 py-20 lg:px-8"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="section-kicker">YOUR PARTNER PLAYBOOK</p><h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold sm:text-5xl">What do you actually do?</h2></div><p className="partner-section-intro max-w-[430px]">Seven short steps. Each card tells you one action and what happens next.</p></div><div className="partner-flow-grid mt-9">{leadSteps.map(({n,title,body,icon:Icon})=><article key={n} className="partner-hover-card partner-flow-card"><div className="partner-step-illustration"><span className="partner-step-number">/{n}</span><Icon size={58}/></div><h3 className="font-display text-2xl font-semibold">{title}</h3><p className="mt-2 text-base leading-7">{body}</p></article>)}</div>
        <div className="partner-role-split mt-6"><article className="partner-hover-card p-7"><div className="partner-role-heading"><Handshake/><div><span>YOUR ROLE</span><h3>Connect, understand, submit.</h3></div></div><div className="partner-role-flow"><span>Find</span><ArrowRight/><span>Understand</span><ArrowRight/><span>Refer</span><ArrowRight/><span>Stay connected</span></div></article><article className="partner-hover-card p-7"><div className="partner-role-heading"><Building2/><div><span>INRISHI'S ROLE</span><h3>Scope, quote, build, support.</h3></div></div><div className="partner-role-flow"><span>Scope</span><ArrowRight/><span>Price</span><ArrowRight/><span>Deliver</span><ArrowRight/><span>Support</span></div></article></div>
        <div className="partner-hover-card mt-6 p-7"><h3 className="font-display text-2xl font-semibold">Three things you never promise on your own</h3><div className="mt-5 grid gap-3 md:grid-cols-3">{["A price or discount that Inrishi has not approved","A technical scope or delivery date that is not confirmed","A guaranteed business result that is outside the proposal"].map((x,i)=><div key={x} className="partner-dont-card"><ShieldCheck size={28}/><span>0{i+1}</span><strong>{x}</strong></div>)}</div></div>
      </section>

      <section id="services" className="mx-auto max-w-[1320px] px-5 py-20 lg:px-8"><p className="section-kicker">WHAT TO LISTEN FOR</p><h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold sm:text-5xl">Hear the problem. <span className="text-primary">Match the service.</span></h2><p className="partner-section-intro mt-4 max-w-3xl">Customers rarely ask for “ERP” or “CRM” first. They describe a problem. These examples help you recognise the opportunity.</p><div className="partner-services-visual mt-8">{services.map(({name,icon:Icon,signal,label})=><article key={name} className="partner-hover-card partner-service-visual"><div className="partner-service-picture"><Icon size={54}/></div><span className="partner-signal-label">IF THEY SAY…</span><blockquote>“{signal}.”</blockquote><h3 className="font-display text-xl font-semibold">{name}</h3><p>{label}</p></article>)}</div></section>

      <section id="incentives" className="mx-auto max-w-[1320px] px-5 py-20 lg:px-8"><p className="section-kicker">HOW INCENTIVE ELIGIBILITY WORKS</p><h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold sm:text-5xl">Four checkpoints you can <span className="text-primary">see in the portal.</span></h2><div className="partner-incentive-flow mt-8">{[[Search,"Lead submitted","A genuine business opportunity is recorded."],[BadgeCheck,"Solution confirmed","Inrishi reviews the requirement and confirms the approved scope."],[IndianRupee,"Payment recorded","The applicable qualifying customer payment is received and recorded."],[CheckCircle2,"Status shown","Your portal shows the applicable incentive status: eligible, approved or paid."]].map(([I,t,b],i)=>{const Icon=I as typeof Search;return <article key={String(t)} className="partner-hover-card partner-incentive-card"><span className="font-mono text-xs text-primary">/0{i+1}</span><div className="partner-card-illustration"><Icon size={54}/></div><h3 className="font-display text-xl font-semibold">{String(t)}</h3><p className="mt-2 text-sm leading-6">{String(b)}</p></article>})}</div><div className="partner-portal-rule mt-5"><Monitor size={30}/><div><strong>Trust the portal, not memory.</strong><p>The Partner Portal displays the current status and the commercial rules configured by Inrishi.</p></div></div></section>

      <section id="pricing" className="mx-auto max-w-[1320px] px-5 py-20 lg:px-8"><div className="partner-hover-card partner-commercial-card grid items-center gap-8 p-8 md:grid-cols-[1fr_auto]"><div><p className="section-kicker">COMMERCIAL RULE</p><h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">Never quote from memory.</h2><p className="mt-4 max-w-3xl text-base leading-7">Use only the scope, price, discount and timeline formally confirmed by Inrishi for that customer. If something is unclear, submit the requirement and let the team confirm it.</p></div><div className="partner-pricing-visual"><Handshake size={58}/><IndianRupee size={58}/><ShieldCheck size={58}/></div></div></section>

      <section id="process" className="mx-auto max-w-[1320px] px-5 py-20 lg:px-8"><p className="section-kicker">START IN THREE MOVES</p><h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold sm:text-5xl">Register. Get approved. <span className="text-primary">Start referring.</span></h2><div className="mt-8 grid gap-4 md:grid-cols-3">{[[UserPlus,"01","Create your account","Share your basic details and complete the Partner registration."],[BadgeCheck,"02","Get activated","Inrishi reviews the application and activates approved Partner access."],[Workflow,"03","Use the portal","Add genuine leads, follow progress and view the applicable incentive status."]].map(([I,n,t,b])=>{const Icon=I as typeof UserPlus;return <article key={String(n)} className="partner-hover-card p-7"><div className="partner-card-illustration"><Icon size={54}/></div><span className="font-mono text-xs text-primary">/{String(n)}</span><h3 className="mt-3 font-display text-2xl font-semibold">{String(t)}</h3><p className="mt-2 text-base leading-7">{String(b)}</p></article>})}</div>{c?.registrationOpen!==false&&<div className="mt-8 flex justify-center"><a href={registerHref} className="inline-flex h-12 items-center gap-2 bg-primary px-7 font-semibold text-slate-950">Register as a Partner <ArrowRight size={17}/></a></div>}</section>
    </main>
    <footer className="border-t border-white/10 px-5 py-8 text-center text-xs text-white/55">Inrishi Partner Network · Intelligence inside.</footer>
  </div>;
}
