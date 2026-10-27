/* eslint-disable */
// @ts-nocheck
// Generated route tree for Inrishi Partner V56 canonical production routes.
import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as LoginRouteImport } from './routes/login'
import { Route as RegisterRouteImport } from './routes/register'
import { Route as PortalRouteImport } from './routes/portal'
const IndexRoute=IndexRouteImport.update({id:'/',path:'/',getParentRoute:()=>rootRouteImport} as any)
const LoginRoute=LoginRouteImport.update({id:'/login',path:'/login',getParentRoute:()=>rootRouteImport} as any)
const RegisterRoute=RegisterRouteImport.update({id:'/register',path:'/register',getParentRoute:()=>rootRouteImport} as any)
const PortalRoute=PortalRouteImport.update({id:'/portal',path:'/portal',getParentRoute:()=>rootRouteImport} as any)
export interface FileRoutesByFullPath{'/':typeof IndexRoute;'/login':typeof LoginRoute;'/register':typeof RegisterRoute;'/portal':typeof PortalRoute}
export interface FileRoutesByTo extends FileRoutesByFullPath{}
export interface FileRoutesById extends FileRoutesByFullPath{__root__:typeof rootRouteImport}
export interface FileRouteTypes{fileRoutesByFullPath:FileRoutesByFullPath;fullPaths:keyof FileRoutesByFullPath;fileRoutesByTo:FileRoutesByTo;to:keyof FileRoutesByTo;id:keyof FileRoutesById;fileRoutesById:FileRoutesById}
export interface RootRouteChildren{IndexRoute:typeof IndexRoute;LoginRoute:typeof LoginRoute;RegisterRoute:typeof RegisterRoute;PortalRoute:typeof PortalRoute}
declare module '@tanstack/react-router'{interface FileRoutesByPath{'/':{id:'/';path:'/';fullPath:'/';preLoaderRoute:typeof IndexRouteImport;parentRoute:typeof rootRouteImport};'/login':{id:'/login';path:'/login';fullPath:'/login';preLoaderRoute:typeof LoginRouteImport;parentRoute:typeof rootRouteImport};'/register':{id:'/register';path:'/register';fullPath:'/register';preLoaderRoute:typeof RegisterRouteImport;parentRoute:typeof rootRouteImport};'/portal':{id:'/portal';path:'/portal';fullPath:'/portal';preLoaderRoute:typeof PortalRouteImport;parentRoute:typeof rootRouteImport}}}
const rootRouteChildren:RootRouteChildren={IndexRoute,LoginRoute,RegisterRoute,PortalRoute}
export const routeTree=rootRouteImport._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>()
