import {
  ArrowRight, ArrowUpRight, Bot, BriefcaseBusiness, CheckCircle2,
  FileText, Globe2, Handshake, LockKeyhole, Menu, MessageCircleMore,
  ShieldCheck, UsersRound, X,
} from "lucide-react";
import { useEffect,useState } from "react";
import { siteHref } from "@/lib/site-path";
import { loadPortalStore,portalStoreEventName,type PortalStore } from "@/lib/portal-store";
import inrishiLogo from "@/assets/inrishi-public-logo.png";
import partnerNetworkArt from "@/assets/partner-network.svg";
import websiteVisual from "@/assets/product-website.svg";
import crmVisual from "@/assets/product-crm.svg";
import emsVisual from "@/assets/product-ems.svg";
import aiVisual from "@/assets/product-ai.svg";

const offers=[
  {name:"Business Website",problem:"Customers cannot find or trust us online.",icon:Globe2,detail:"A professional website, domain, hosting, SEO setup and Google Business Profile management.",visual:websiteVisual},
  {name:"CRM",problem:"We lose leads, calls and follow-ups.",icon:UsersRound,detail:"Leads, customer records, calls, messages, follow-ups and a clear sales workflow.",visual:crmVisual},
  {name:"Employee Management",problem:"Attendance, leave and employee records are still manual.",icon:BriefcaseBusiness,detail:"Attendance, employee records, leave, approvals, documents and reports in one place.",visual:emsVisual},
  {name:"AI Automation",problem:"Our team repeats the same work every day.",icon:Bot,detail:"Customer support, document generation, internal workflows and AI business assistants.",visual:aiVisual},
];

export function PartnerWebsite(){
  const[store,setStore]=useState<PortalStore|null>(null),[menu,setMenu]=useState(false);
  useEffect(()=>{const sync=()=>setStore(loadPortalStore());sync();const e=portalStoreEventName();addEventListener(e,sync);return()=>removeEventListener(e,sync)},[]);
  const c=store?.partnerWebsiteControls;
  const registerHref=siteHref("/register"),loginHref=siteHref("/login");
  return <div className="partner-site v73-public v74-public v73-partner min-h-screen text-white">
    {c?.announcementEnabled&&c.announcementText&&<div className="v73-announcement px-4 py-2 text-center text-xs font-semibold">{c.announcementText}</div>}
    <header className="partner-nav v73-header"><div className="mx-auto flex h-[78px] max-w-[1440px] items-center justify-between px-5 lg:px-8"><a href={siteHref("/")}><img src={inrishiLogo} alt="INRISHI" className="public-brand-logo"/></a><nav className="hidden items-center gap-7 lg:flex"><a href="#refer">What to refer</a><a href="#visuals">See the products</a><a href="#portal">Partner Portal</a><a href="#rules">Rules</a></nav><div className="hidden items-center gap-3 lg:flex">{c?.loginVisible!==false&&<a href={loginHref} className="v73-login"><LockKeyhole size={15}/> Partner Login</a>}{c?.registrationOpen!==false&&<a href={registerHref} className="v73-primary-link">Become a Partner <ArrowUpRight size={15}/></a>}</div><button className="lg:hidden" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div>{menu&&<nav className="v73-mobile-nav flex flex-col gap-4 px-5 py-5 lg:hidden"><a href="#refer">What to refer</a><a href="#visuals">See the products</a><a href="#portal">Partner Portal</a><a href={registerHref}>Register</a><a href={loginHref}>Login</a></nav>}</header>

    <main>
      <section className="v73-partner-hero"><div className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-16 lg:grid-cols-[.92fr_1.08fr] lg:px-8 lg:py-20"><div><div className="v73-kicker"><Handshake size={16}/> INRISHI PARTNER NETWORK</div><h1>Refer the problem. We build the solution.</h1><p>Recognise a genuine business need, submit the opportunity, and track it privately. Inrishi handles the product explanation, scope, quotation and delivery.</p><div className="mt-8 flex flex-wrap gap-3">{c?.registrationOpen!==false&&<a href={registerHref} className="v73-primary-link">Become a Partner <ArrowRight size={16}/></a>}<a href="#refer" className="v73-secondary-link">See what to refer</a></div><div className="v73-trust-row"><span><CheckCircle2/> Simple to understand</span><span><CheckCircle2/> Inrishi handles the product discussion</span><span><CheckCircle2/> Commercial terms stay private</span></div></div><div className="v74-partner-hero-visual"><img src={partnerNetworkArt} alt="Inrishi Partner Network visual journey"/></div></div></section>

      <section className="v73-reel"><div className="v73-reel-track">{[0,1,2,3].map(group=><div className="v73-reel-group" key={group}>{offers.map(x=>{const Icon=x.icon;return <a href="#refer" className="v73-reel-chip v74-slide" key={`${group}-${x.name}`}><Icon size={18}/>{x.name}</a>})}</div>)}</div></section>

      <section id="visuals" className="v73-section"><div className="v73-section-head"><div><p className="v73-kicker">SEE WHAT YOU ARE REFERRING</p><h2>Show the product. Keep the explanation simple.</h2></div><p>These product visuals make it easier to understand the customer problem before you submit a lead.</p></div><div className="v73-partner-product-visuals">{offers.map(x=><PartnerVisual key={x.name} {...x}/>)}</div></section>

      <section id="refer" className="v73-section"><div className="v73-section-head"><div><p className="v73-kicker">WHAT TO REFER</p><h2>Listen for the problem. Match the right product.</h2></div><p>Customers usually describe the pain first. Your job is only to recognise the signal and connect the business to Inrishi.</p></div><div className="v73-refer-grid">{offers.map(({name,problem,icon:Icon,detail,visual})=><article key={name} className="v73-hover-card v74-tile"><img src={visual} alt={`${name} visual`} className="v74-refer-image"/><div className="v73-refer-icon"><Icon size={36}/></div><small>WHEN A BUSINESS SAYS</small><blockquote>“{problem}”</blockquote><h3>{name}</h3><p>{detail}</p></article>)}</div></section>

      <section className="v73-section"><div className="v73-section-head"><div><p className="v73-kicker">WHO TO TALK TO</p><h2>Look for businesses where manual work is slowing growth.</h2></div><p>Strong opportunities are businesses that already have customers and operations, but their systems have not kept up.</p></div><div className="v73-industry-row">{["Startups","SMEs","CA firms","Manufacturers","Retailers","Colleges","Medical institutions","Traditional businesses"].map(x=><span key={x}>{x}</span>)}</div></section>

      <section id="portal" className="v73-section"><div className="v73-portal-story"><div className="v73-section-head"><div><p className="v73-kicker">YOUR PRIVATE PARTNER PORTAL</p><h2>Leads, status, documents and Admin chat in one place.</h2></div><p>Commercial terms and incentive details remain inside the authenticated Partner Portal, not on the public website.</p></div><div className="v73-portal-frame"><aside><b>Partner Portal</b><span className="active">Dashboard</span><span>Leads</span><span>Customers</span><span>Projects</span><span>Earnings</span><span>Chat with Admin</span></aside><div className="v73-portal-body"><div className="v73-portal-kpis"><span><small>Active leads</small><b>08</b></span><span><small>Converted</small><b>03</b></span><span><small>Commercial terms</small><b>Private</b></span></div><div className="v73-portal-lead"><div><strong>ABC Manufacturing</strong><small>CRM + automation requirement</small></div><span>Inrishi reviewing</span></div><div className="v73-chat-preview"><div className="v73-chat-bubble admin">Hi. We reviewed the requirement. We need one clarification on the customer workflow.</div><div className="v73-chat-bubble partner">Sure, I will confirm with the customer and update here.</div><div className="v73-chat-input">Message Inrishi Admin… <MessageCircleMore/></div></div></div></div></div></section>

      <section id="rules" className="v73-section"><div className="v73-rules-grid"><article className="v73-hover-card v74-tile"><ShieldCheck/><h3>Do not promise price, discount or delivery date yourself.</h3><p>Use the price and scope formally confirmed by Inrishi for that customer.</p></article><article className="v73-hover-card v74-tile"><MessageCircleMore/><h3>When in doubt, chat with Admin.</h3><p>The Partner Portal includes direct Partner ↔ Inrishi Admin chat with attachments.</p></article><article className="v73-hover-card v74-tile"><FileText/><h3>Approval email includes your documents.</h3><p>Approved Partners receive credentials, allocated-service brochure, Partner Terms and Privacy Policy by email.</p></article></div></section>

      <section className="v73-section"><div className="v73-partner-final"><div><p className="v73-kicker">START WITH ONE GOOD OPPORTUNITY</p><h2>Know a business that can work better with software?</h2><p>Create your Partner account. If approved, your credentials and Partner documents are emailed to you.</p></div><a href={registerHref} className="v73-primary-link">Register as a Partner <ArrowUpRight size={17}/></a></div></section>
    </main>
    <footer className="v73-partner-footer"><div><strong>Inrishi Partner Network</strong><span>Intelligence inside.</span></div><nav><a href="https://www.inrishi.in/privacy.html">Privacy Policy</a><a href="https://www.inrishi.in/terms.html">Terms</a><a href="https://www.inrishi.in/partner-terms.html">Partner Terms</a></nav><small>© {new Date().getFullYear()} Inrishi. All rights reserved.</small></footer>
  </div>
}

function PartnerVisual({name,detail,visual}:{name:string;detail:string;visual:string}){return <article className="v73-visual-card v74-visual-card v74-tile"><img src={visual} alt={`${name} product visual`}/><div className="v74-visual-caption"><strong>{name}</strong><p>{detail}</p></div></article>}
