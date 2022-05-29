import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthGuardService } from "../services/auth-guard.service";
import { SkeletonExternalComponent } from "./layout/skeleton-external/skeleton-external.component";
import { SkeletonComponent } from "./layout/skeleton/skeleton.component";
import { LoginPageComponent } from "./pages/login-page/login-page.component";

const routes:Route[] = [
    { 
        path:'', 
        component:SkeletonComponent,
        canActivate:[AuthGuardService],
        children:[
            { path:'live', loadChildren:() => import('../live/live.module').then(m => m.LiveModule)},
            { path:'history', loadChildren: () => import('../history/history.module').then(m => m.HistoryModule) }
        ]
    },
    {
        path:'',
        component:SkeletonExternalComponent,
        children:[
            { path:'login', component: LoginPageComponent }
        ]
    },
    { path:'', pathMatch:'full', redirectTo:'/live'},
    { path:'**', redirectTo:'/live' }
    
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CoreRoutingModule { }
  