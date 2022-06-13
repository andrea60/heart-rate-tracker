import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { InSessionService as InSession } from "../shared/guards/in-session.service";
import { SessionsListPageComponent } from "./pages/sessions-list-page/sessions-list-page.component";

const routes:Route[] = [
    { path:'', canActivate:[], children:[
        { path:':id', component:SessionsListPageComponent},
        { path:'', component:SessionsListPageComponent}
    ] },
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class HistoryRoutingModule { }
  