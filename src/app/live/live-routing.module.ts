import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { LiveViewComponent } from "./pages/live-view/live-view.component";

const routes:Route[] = [
    { path:'', component:LiveViewComponent }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LiveRoutingModule { }
  