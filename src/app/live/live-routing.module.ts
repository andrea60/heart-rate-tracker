import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { InSessionService as InSession } from "../shared/guards/in-session.service";
import { LiveViewComponent } from "./pages/live-view/live-view.component";
import { StartSessionComponent } from "./pages/start-session/start-session.component";

const routes:Route[] = [
    { path:'', canActivate:[InSession], component:LiveViewComponent },
    { path:'start-session', component:StartSessionComponent }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LiveRoutingModule { }
  