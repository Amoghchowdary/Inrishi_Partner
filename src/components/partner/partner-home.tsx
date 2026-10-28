import {
  ArrowRight, BadgeCheck, Boxes, BriefcaseBusiness, CheckCircle2, Cloud, Handshake,
  IndianRupee, LogIn, MessageSquare, Monitor, Search, ShieldCheck, Sparkles,
  UserPlus, UsersRound, WalletCards, Workflow,
} from "lucide-react";
import { useEffect, useState } from "react";
import inrishiLogo from "@/assets/inrishi-public-logo.png";
import { loadPortalStore, portalStoreEventName, type PortalStore } from "@/lib/portal-store";
import { siteHref } from "@/lib/site-path";

const services=[
  {name:"AI Business Transformation",icon:Sparkles,label:"Automate work"},
  {name:"ERP",icon:Boxes,label:"Run operations"},
  {name:"CRM",icon:UsersRound,label:"Manage leads"},
  {name:"Employee Management",icon:BriefcaseBusiness,label:"Manage teams"},
  {name:"Books Customization",icon:WalletCards,label:"Fit accounting"},
  {name:"Custom Software",icon:Workflow,label:"Build your process"},
  {name:"SaaS Products",icon:Cloud,label:"Ready software"},
  {name:"Website Design",icon:Monitor,label:"Build presence"},
];

const leadSteps=[
  {n:"01",title:"Find a genuine business requirement",body:"Identify a business that genuinely needs an Inrishi service.",icon:Search},
  {n:"02",title:"Qualify the opportunity",body:"Capture the decision-maker, need, location and expected timeline.",icon:BadgeCheck},
  {n:"03",title:"Add the lead in your Partner Portal",body:"Enter accurate customer and requirement details in Partner Portal.",icon:UserPlus},
  {n:"04",title:"Stay connected",body:"Maintain the customer relationship while Inrishi scopes the solution.",icon:MessageSquare},
  {n:"05",title:"Inrishi confirms scope and commercials",body:"Inrishi confirms the official solution, pricing and timeline.",icon:ShieldCheck},
  {n:"06",title:"Payment & conversion",body:"Approved qualifying payment moves the eligible lead into conversion.",icon:IndianRupee},
  {n:"07",title:"Track delivery and incentive",body:"Track project progress and your incentive status in the portal.",icon:Workflow},
];

const journey=[
  {label:"Lead",icon:Search},
  {label:"Qualify",icon:BadgeCheck},
  {label:"Customer",icon:UsersRound},
  {label:"Project",icon:Workflow},
  {label:"Incentive",icon:IndianRupee},
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
    <header className="partner-nav border-b border-white/10"><div className="mx-auto flex h-[78px] max-w-[1320px] items-center justify-between px-5 lg:px-8"><a href={siteHref("/")}><img src={inrishiLogo} alt="INRISHI" className="public-brand-logo"/></a><nav className="hidden items-center gap-6 text-sm font-semibold text-white/70 lg:flex"><a href="#why">Why Inrishi</a><a href="#lead-scope">How to bring leads</a><a href="#become">Become a Partner</a><a href="#services">Services</a><a href="#incentives">Incentives</a><a href="#pricing">Commercials</a><a href="#process">Process</a>{c?.loginVisible!==false&&<a href={portalHref} className="text-primary">Partner Portal</a>}</nav><div className="flex gap-2">{c?.loginVisible!==false&&<a href={portalHref} className="inline-flex h-10 items-center gap-2 border border-white/15 px-4 text-sm font-semibold"><LogIn size={15}/> Partner Portal</a>}{c?.registrationOpen!==false&&<a href={registerHref} className="hidden h-10 items-center gap-2 bg-primary px-4 text-sm font-semibold text-slate-950 sm:inline-flex">Register <ArrowRight size={15}/></a>}</div></div></header>
    <nav className="partner-mobile-nav lg:hidden"><a href="#why">Why Inrishi</a><a href="#lead-scope">Bring leads</a><a href="#become">Become a Partner</a><a href="#services">Services</a><a href="#incentives">Incentives</a><a href="#pricing">Commercials</a><a href="#process">Process</a></nav>

    <main>
      <section className="mx-auto grid min-h-[650px] max-w-[1320px] items-center gap-10 px-5 py-16 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div><p className="section-kicker">INRISHI PARTNER NETWORK</p><h1 className="mt-5 font-display text-5xl font-semibold leading-tight sm:text-6xl">{c?.heroTitle||"Become an Inrishi Partner"}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">{c?.heroSubtitle||"Bring the customer. Inrishi handles the technology delivery."}</p><div className="mt-8 flex flex-wrap gap-3">{c?.registrationOpen!==false&&<a href={registerHref} className="inline-flex h-12 items-center gap-2 bg-primary px-6 font-semibold text-slate-950">Become a Partner <ArrowRight size={17}/></a>}{c?.loginVisible!==false&&<a href={loginHref} className="inline-flex h-12 items-center gap-2 border border-white/15 px-6 font-semibold">Partner Login <LogIn size={17}/></a>}</div></div>
        <div className="partner-hero-visual title-card" aria-label="Partner journey visual"><div className="partner-hero-orbit" aria-hidden="true"><Handshake size={64}/></div><p className="section-kicker">YOUR JOURNEY</p><h2 className="mt-3 font-display text-2xl font-semibold">One simple path from lead to incentive.</h2><div className="partner-journey-line">{journey.map(({label,icon:Icon},i)=><div className="partner-journey-node" key={label}><span><Icon size={24}/></span><b>{label}</b>{i<journey.length-1&&<ArrowRight className="partner-journey-arrow" size={18}/>}</div>)}</div></div>
      </section>

      <section className="partner-service-reel-shell" aria-label="Inrishi partner services"><div className="partner-service-reel">{[...services,...services].map(({name,icon:Icon},i)=><a href="#services" className="partner-service-chip" key={`${name}-${i}`} aria-hidden={i>=services.length}><Icon size={21}/><span>{name}</span></a>)}</div></section>

      <section id="why" className="mx-auto max-w-[1320px] px-5 py-20 lg:px-8"><p className="section-kicker">WHY INRISHI</p><h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold sm:text-5xl">You build the relationship. <span className="text-primary">We build the technology.</span></h2><div className="mt-8 grid gap-4 md:grid-cols-3">{[[UsersRound,"Meet & understand","Talk to businesses and identify genuine technology needs."],[Workflow,"Track visually","See leads, conversion, project progress and next steps in one portal."],[ShieldCheck,"Delivery by Inrishi","Technical scope, commercials and delivery remain controlled by Inrishi."]].map(([I,t,b])=>{const Icon=I as typeof UsersRound;return <article key={String(t)} className="title-card partner-hover-card p-7"><div className="partner-card-illustration"><Icon size={58}/></div><h3 className="mt-5 font-display text-xl font-semibold">{String(t)}</h3><p className="mt-2 text-sm">{String(b)}</p></article>})}</div></section>

      <section id="lead-scope" className="mx-auto max-w-[1320px] px-5 py-20 lg:px-8"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="section-kicker">PARTNER SCOPE OF WORK · VISUAL PLAYBOOK</p><h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold sm:text-5xl">How a partner brings leads to Inrishi.</h2></div><p className="max-w-[380px] text-sm leading-7 text-white/60">Designed for quick scanning: one action, one visual, one next step.</p></div><div className="partner-flow-grid mt-9">{leadSteps.map(({n,title,body,icon:Icon})=><article key={n} className="title-card partner-hover-card partner-flow-card"><div className="partner-step-illustration"><span className="partner-step-number">/{n}</span><Icon size={58}/></div><h3 className="font-display text-xl font-semibold">{title}</h3><p className="mt-2 text-sm">{body}</p></article>)}</div><div className="title-card partner-hover-card mt-5 p-7"><h3 className="font-display text-2xl font-semibold">Three things you never promise on your own</h3><div className="mt-5 grid gap-3 md:grid-cols-3">{["Unapproved price or discount","Unconfirmed technical scope or date","Guaranteed result outside the proposal"].map((x,i)=><div key={x} className="partner-dont-card"><ShieldCheck size={28}/><span>0{i+1}</span><strong>{x}</strong></div>)}</div></div></section>

      <section id="become" className="mx-auto max-w-[1320px] px-5 py-20 lg:px-8"><div className="title-card partner-hover-card grid items-center gap-7 p-8 md:grid-cols-[1fr_auto]"><div><p className="section-kicker">BECOMING A PARTNER</p><h2 className="mt-4 font-display text-4xl font-semibold">Register → approval → portal access.</h2><p className="mt-3 max-w-3xl">Your partner workspace opens after Inrishi reviews and activates the account.</p></div><div className="partner-register-visual"><UserPlus size={54}/><ArrowRight/><BadgeCheck size={54}/><ArrowRight/><Monitor size={54}/></div>{c?.registrationOpen!==false&&<a href={registerHref} className="inline-flex h-11 w-max items-center gap-2 bg-primary px-5 font-semibold text-slate-950">Register <ArrowRight size={16}/></a>}</div></section>

      <section id="services" className="mx-auto max-w-[1320px] px-5 py-20 lg:px-8"><p className="section-kicker">SERVICES YOU CAN REFER</p><h2 className="mt-4 font-display text-4xl font-semibold">Recognise the need. <span className="text-primary">Match the service.</span></h2><div className="partner-services-visual mt-8">{services.map(({name,icon:Icon,label})=><article key={name} className="title-card partner-hover-card partner-service-visual"><div className="partner-service-picture"><Icon size={54}/></div><h3 className="font-display text-lg font-semibold">{name}</h3><p>{label}</p></article>)}</div></section>

      <section id="incentives" className="mx-auto max-w-[1320px] px-5 py-20 lg:px-8"><p className="section-kicker">HOW YOUR INCENTIVE WORKS</p><h2 className="mt-4 max-w-4xl font-display text-4xl font-semibold sm:text-5xl">Four visual checkpoints.</h2><div className="partner-incentive-flow mt-8">{[[Search,"Lead","Submit a genuine opportunity"],[UsersRound,"Customer","Requirement converts"],[IndianRupee,"Payment","qualifying customer payment recorded"],[CheckCircle2,"Incentive","Eligible → Approved → Paid"]].map(([I,t,b],i)=>{const Icon=I as typeof Search;return <article key={String(t)} className="title-card partner-hover-card partner-incentive-card"><span className="font-mono text-xs text-primary">/0{i+1}</span><div className="partner-card-illustration"><Icon size={54}/></div><h3 className="font-display text-xl font-semibold">{String(t)}</h3><p className="mt-2 text-sm">{String(b)}</p></article>})}</div><div className="title-card partner-hover-card mt-5 p-7"><strong>Portal is the source of truth.</strong><p className="mt-2 text-sm">Service incentive rules, qualifying-payment thresholds, approval and payout status are controlled by Inrishi and shown in Partner Portal.</p></div></section>

      <section id="pricing" className="mx-auto max-w-[1320px] px-5 py-20 lg:px-8"><div className="title-card partner-hover-card grid items-center gap-7 p-8 md:grid-cols-[1fr_auto]"><div><p className="section-kicker">COMMERCIALS</p><h2 className="mt-4 font-display text-4xl font-semibold">Scope first. Official pricing next.</h2><p className="mt-3 max-w-3xl">Use only the current commercial terms confirmed by Inrishi.</p></div><div className="partner-pricing-visual"><Handshake size={58}/><IndianRupee size={58}/><ShieldCheck size={58}/></div></div></section>

      <section id="process" className="mx-auto max-w-[1320px] px-5 py-20 lg:px-8"><p className="section-kicker">START IN 3 STEPS</p><div className="mt-6 grid gap-4 md:grid-cols-3">{[[UserPlus,"01","Register","Submit your details."],[BadgeCheck,"02","Approval","Inrishi activates the account."],[Workflow,"03","Work together","Add leads and track everything visually."]].map(([I,n,t,b])=>{const Icon=I as typeof UserPlus;return <article key={String(n)} className="title-card partner-hover-card p-7"><div className="partner-card-illustration"><Icon size={54}/></div><span className="font-mono text-xs text-primary">/{String(n)}</span><h3 className="mt-3 font-display text-2xl font-semibold">{String(t)}</h3><p className="mt-2 text-sm">{String(b)}</p></article>})}</div></section>
    </main>
    <footer className="border-t border-white/10 px-5 py-8 text-center text-xs text-white/50">Inrishi Partner Network · Intelligence inside.</footer>
  </div>;
}
