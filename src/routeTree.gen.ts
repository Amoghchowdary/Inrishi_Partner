/* eslint-disable */
// @ts-nocheck
// Generated route tree for Inrishi Partner V52.
import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as PartnerRouteImport } from './routes/partner'
import { Route as PartnerLoginRouteImport } from './routes/partner-login'
import { Route as PartnerRegisterRouteImport } from './routes/partner-register'
import { Route as PartnerPortalRouteImport } from './routes/partner-portal'
import { Route as LoginRouteImport } from './routes/login'
import { Route as RegisterRouteImport } from './routes/register'
import { Route as PortalRouteImport } from './routes/portal'
const IndexRoute=IndexRouteImport.update({id:'/',path:'/',getParentRoute:()=>rootRouteImport} as any)
const PartnerRoute=PartnerRouteImport.update({id:'/partner',path:'/partner',getParentRoute:()=>rootRouteImport} as any)
const PartnerLoginRoute=PartnerLoginRouteImport.update({id:'/partner-login',path:'/partner-login',getParentRoute:()=>rootRouteImport} as any)
const PartnerRegisterRoute=PartnerRegisterRouteImport.update({id:'/partner-register',path:'/partner-register',getParentRoute:()=>rootRouteImport} as any)
const PartnerPortalRoute=PartnerPortalRouteImport.update({id:'/partner-portal',path:'/partner-portal',getParentRoute:()=>rootRouteImport} as any)
const LoginRoute=LoginRouteImport.update({id:'/login',path:'/login',getParentRoute:()=>rootRouteImport} as any)
const RegisterRoute=RegisterRouteImport.update({id:'/register',path:'/register',getParentRoute:()=>rootRouteImport} as any)
const PortalRoute=PortalRouteImport.update({id:'/portal',path:'/portal',getParentRoute:()=>rootRouteImport} as any)
export interface FileRoutesByFullPath{'/':typeof IndexRoute;'/partner':typeof PartnerRoute;'/partner-login':typeof PartnerLoginRoute;'/partner-register':typeof PartnerRegisterRoute;'/partner-portal':typeof PartnerPortalRoute;'/login':typeof LoginRoute;'/register':typeof RegisterRoute;'/portal':typeof PortalRoute}
export interface FileRoutesByTo extends FileRoutesByFullPath{}
export interface FileRoutesById extends FileRoutesByFullPath{__root__:typeof rootRouteImport}
export interface FileRouteTypes{fileRoutesByFullPath:FileRoutesByFullPath;fullPaths:keyof FileRoutesByFullPath;fileRoutesByTo:FileRoutesByTo;to:keyof FileRoutesByTo;id:keyof FileRoutesById;fileRoutesById:FileRoutesById}
export interface RootRouteChildren{IndexRoute:typeof IndexRoute;PartnerRoute:typeof PartnerRoute;PartnerLoginRoute:typeof PartnerLoginRoute;PartnerRegisterRoute:typeof PartnerRegisterRoute;PartnerPortalRoute:typeof PartnerPortalRoute;LoginRoute:typeof LoginRoute;RegisterRoute:typeof RegisterRoute;PortalRoute:typeof PortalRoute}
declare module '@tanstack/react-router'{interface FileRoutesByPath{'/':{id:'/';path:'/';fullPath:'/';preLoaderRoute:typeof IndexRouteImport;parentRoute:typeof rootRouteImport};'/partner':{id:'/partner';path:'/partner';fullPath:'/partner';preLoaderRoute:typeof PartnerRouteImport;parentRoute:typeof rootRouteImport};'/partner-login':{id:'/partner-login';path:'/partner-login';fullPath:'/partner-login';preLoaderRoute:typeof PartnerLoginRouteImport;parentRoute:typeof rootRouteImport};'/partner-register':{id:'/partner-register';path:'/partner-register';fullPath:'/partner-register';preLoaderRoute:typeof PartnerRegisterRouteImport;parentRoute:typeof rootRouteImport};'/partner-portal':{id:'/partner-portal';path:'/partner-portal';fullPath:'/partner-portal';preLoaderRoute:typeof PartnerPortalRouteImport;parentRoute:typeof rootRouteImport};'/login':{id:'/login';path:'/login';fullPath:'/login';preLoaderRoute:typeof LoginRouteImport;parentRoute:typeof rootRouteImport};'/register':{id:'/register';path:'/register';fullPath:'/register';preLoaderRoute:typeof RegisterRouteImport;parentRoute:typeof rootRouteImport};'/portal':{id:'/portal';path:'/portal';fullPath:'/portal';preLoaderRoute:typeof PortalRouteImport;parentRoute:typeof rootRouteImport}}}
const rootRouteChildren:RootRouteChildren={IndexRoute,PartnerRoute,PartnerLoginRoute,PartnerRegisterRoute,PartnerPortalRoute,LoginRoute,RegisterRoute,PortalRoute}
export const routeTree=rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()
