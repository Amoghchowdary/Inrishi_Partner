import { ArrowLeft, KeyRound, LogIn, RefreshCw, UserRoundSearch } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import inrishiLogo from "@/assets/inrishi-logo.png";
import {
  beginPartnerPasswordLoginFn,
  completePartnerRecoveryFn,
  requestPartnerRecoveryOtpFn,
  verifyPartnerLoginOtpFn,
  verifyPartnerRecoveryOtpFn,
  changePartnerPasswordFn,
  type PartnerRecoveryKind,
} from "@/services/partner-auth";
import { siteHref } from "@/lib/site-path";

type Mode="login"|"loginOtp"|"firstPassword"|"recoveryRequest"|"recoveryOtp"|"recoveryComplete";

export function PartnerLogin(){
  const[mode,setMode]=useState<Mode>("login");
  const[identifier,setIdentifier]=useState("");
  const[password,setPassword]=useState("");
  const[otp,setOtp]=useState("");
  const[recoveryEmail,setRecoveryEmail]=useState("");
  const[recoveryKind,setRecoveryKind]=useState<PartnerRecoveryKind>("password");
  const[recoveryToken,setRecoveryToken]=useState("");
  const[newPassword,setNewPassword]=useState("");
  const[newLoginId,setNewLoginId]=useState("");
  const[masked,setMasked]=useState("");
  const[message,setMessage]=useState("");
  const[loading,setLoading]=useState(false);

  async function login(e:FormEvent){
    e.preventDefault();setLoading(true);setMessage("");
    try{
      const r=await beginPartnerPasswordLoginFn({data:{identifier,password}});
      if(!r.ok){setMessage(r.message||"Unable to continue.");return}
      setIdentifier(r.loginId);setMasked(r.maskedRecoveryEmail);setOtp("");setMode("loginOtp");
      setMessage(`Verification code sent to ${r.maskedRecoveryEmail}.`);
    }catch(c){setMessage(c instanceof Error?c.message:"Unable to continue.")}
    finally{setLoading(false)}
  }

  async function verifyLoginOtp(e:FormEvent){
    e.preventDefault();setLoading(true);setMessage("");
    try{
      const r=await verifyPartnerLoginOtpFn({data:{identifier,otp}});
      if(!r.ok){setMessage(r.message||"Invalid verification code.");return}
      if(r.mustChangePassword){setMode("firstPassword");setMessage("OTP verified. Create your permanent password before entering the Partner Portal.");return}
      window.location.assign(siteHref("/portal"));
    }catch(c){setMessage(c instanceof Error?c.message:"Unable to verify.")}
    finally{setLoading(false)}
  }


  async function completeFirstPassword(e:FormEvent){
    e.preventDefault();setLoading(true);setMessage("");
    try{const r=await changePartnerPasswordFn({currentPassword:password,newPassword});if(!r.ok){setMessage(r.message||"Password could not be changed.");return}setPassword("");setNewPassword("");setMode("login");setMessage("Permanent password created. Sign in again; OTP remains mandatory.")}
    catch(c){setMessage(c instanceof Error?c.message:"Password could not be changed.")}finally{setLoading(false)}
  }

  function beginRecovery(kind:PartnerRecoveryKind){
    setRecoveryKind(kind);setRecoveryEmail("");setOtp("");setRecoveryToken("");setNewPassword("");setNewLoginId("");setMessage("");setMode("recoveryRequest");
  }

  async function requestRecovery(e:FormEvent){
    e.preventDefault();setLoading(true);setMessage("");
    try{
      const r=await requestPartnerRecoveryOtpFn({data:{recoveryEmail,kind:recoveryKind}});
      if(!r.ok){setMessage(r.message||"Unable to send verification code.");return}
      setMasked(r.maskedRecoveryEmail);setOtp("");setMode("recoveryOtp");
      setMessage(`Verification code sent to ${r.maskedRecoveryEmail}.`);
    }catch(c){setMessage(c instanceof Error?c.message:"Unable to send verification code.")}
    finally{setLoading(false)}
  }

  async function verifyRecovery(e:FormEvent){
    e.preventDefault();setLoading(true);setMessage("");
    try{
      const r=await verifyPartnerRecoveryOtpFn({data:{recoveryEmail,kind:recoveryKind,otp}});
      if(!r.ok||!r.recoveryToken){setMessage(r.message||"Verification failed.");return}
      setRecoveryToken(r.recoveryToken);setMode("recoveryComplete");
      setMessage("OTP verified. You can now create the new credential.");
    }catch(c){setMessage(c instanceof Error?c.message:"Unable to verify the code.")}
    finally{setLoading(false)}
  }

  async function completeRecovery(e:FormEvent){
    e.preventDefault();if(!recoveryToken)return;setLoading(true);setMessage("");
    try{
      const recoveryData={
        recoveryToken,
        kind:recoveryKind,
        ...(recoveryKind==="password"?{newPassword}:{}),
        ...(recoveryKind==="loginId"?{newLoginId}:{}),
      };
      const r=await completePartnerRecoveryFn({data:recoveryData});
      if(!r.ok){setMessage(r.message||"Unable to update the credential.");return}
      setIdentifier(r.loginId||newLoginId||"");setPassword("");setOtp("");setRecoveryToken("");setMode("login");
      setMessage(r.message||"Credential updated successfully. Sign in with the new details.");
    }catch(c){setMessage(c instanceof Error?c.message:"Unable to update the credential.")}
    finally{setLoading(false)}
  }

  return <div className="workspace-shell min-h-screen"><main className="mx-auto max-w-[1050px] px-5 py-10">
    <a href={siteHref("/")} className="inline-flex items-center gap-2 text-xs text-white/60"><ArrowLeft size={14}/> Back</a>
    <div className="mt-8 grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
      <aside className="workspace-panel p-7"><img src={inrishiLogo} alt="INRISHI" className="brand-logo"/><p className="section-kicker mt-8">PARTNER NETWORK</p><h1 className="mt-4 font-display text-4xl font-semibold">Secure partner access.</h1><p className="mt-4">Sign in with your Inrishi Partner Login ID. Login and recovery verification codes are sent only to the registered recovery email.</p></aside>
      <section className="workspace-panel p-7 sm:p-9">
        {mode==="login"&&<form onSubmit={login} className="grid gap-5"><KeyRound className="text-primary"/><h2 className="font-display text-3xl font-semibold">Partner Login</h2><label className="form-label">Partner Login ID<input required value={identifier} onChange={e=>setIdentifier(e.target.value)} className="form-input"/></label><label className="form-label">Password<input required type="password" value={password} onChange={e=>setPassword(e.target.value)} className="form-input"/></label><Button type="submit" disabled={loading}>{loading?"Checking…":"Continue"}<LogIn size={16}/></Button><div className="grid gap-2 sm:grid-cols-2"><button type="button" onClick={()=>beginRecovery("password")} className="text-left text-sm font-semibold text-emerald-700">Forgot password?</button><button type="button" onClick={()=>beginRecovery("loginId")} className="text-left text-sm font-semibold text-emerald-700 sm:text-right">Forgot Login ID?</button></div></form>}
        {mode==="loginOtp"&&<form onSubmit={verifyLoginOtp} className="grid gap-5"><h2 className="font-display text-3xl font-semibold">Verification</h2><p>Enter the 6-digit code sent to {masked}.</p><label className="form-label">Verification code<input required inputMode="numeric" maxLength={6} value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,"").slice(0,6))} className="form-input"/></label><Button type="submit" disabled={loading}>{loading?"Verifying…":"Verify and sign in"}</Button><button type="button" onClick={()=>setMode("login")} className="text-left text-sm font-semibold text-emerald-700">Back to login</button></form>}
        {mode==="firstPassword"&&<form onSubmit={completeFirstPassword} className="grid gap-5"><KeyRound className="text-primary"/><h2 className="font-display text-3xl font-semibold">Create permanent password</h2><p>Your temporary password and mandatory OTP have been verified. Create your permanent password now.</p><label className="form-label">New password<input required minLength={8} type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className="form-input"/></label><Button type="submit" disabled={loading}>{loading?"Updating…":"Create permanent password"}</Button></form>}
        {mode==="recoveryRequest"&&<form onSubmit={requestRecovery} className="grid gap-5">{recoveryKind==="password"?<RefreshCw className="text-primary"/>:<UserRoundSearch className="text-primary"/>}<h2 className="font-display text-3xl font-semibold">{recoveryKind==="password"?"Forgot password":"Forgot Login ID"}</h2><p>Enter the recovery email registered with your partner account. The credential cannot be changed until the OTP is verified.</p><label className="form-label">Registered recovery email<input required type="email" value={recoveryEmail} onChange={e=>setRecoveryEmail(e.target.value)} className="form-input"/></label><Button type="submit" disabled={loading}>{loading?"Sending…":"Send OTP"}</Button><button type="button" onClick={()=>setMode("login")} className="text-left text-sm font-semibold text-emerald-700">Back to login</button></form>}
        {mode==="recoveryOtp"&&<form onSubmit={verifyRecovery} className="grid gap-5"><KeyRound className="text-primary"/><h2 className="font-display text-3xl font-semibold">Verify recovery OTP</h2><p>Enter the 6-digit code sent to {masked}. Only after verification can you create a new {recoveryKind==="password"?"password":"Partner Login ID"}.</p><label className="form-label">Verification code<input required inputMode="numeric" maxLength={6} value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,"").slice(0,6))} className="form-input"/></label><Button type="submit" disabled={loading}>{loading?"Verifying…":"Verify OTP"}</Button></form>}
        {mode==="recoveryComplete"&&<form onSubmit={completeRecovery} className="grid gap-5"><h2 className="font-display text-3xl font-semibold">{recoveryKind==="password"?"Create new password":"Create new Partner Login ID"}</h2><p>OTP verification is complete. This change will invalidate existing partner sessions.</p>{recoveryKind==="password"?<label className="form-label">New password<input required minLength={8} type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className="form-input"/></label>:<label className="form-label">New Partner Login ID<input required minLength={4} value={newLoginId} onChange={e=>setNewLoginId(e.target.value)} placeholder="Example: amogh.partner or partner.amogh@inrishi.in" className="form-input"/><span className="text-xs text-slate-500">If you enter a short ID, Inrishi will convert it to a secure @inrishi.in Partner Login ID.</span></label>}<Button type="submit" disabled={loading}>{loading?"Updating…":recoveryKind==="password"?"Create new password":"Create new Login ID"}</Button></form>}
        {message&&<p role="status" className="mt-5 text-sm font-semibold">{message}</p>}
      </section>
    </div>
  </main></div>;
}
