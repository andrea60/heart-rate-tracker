import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { CoreRoutingModule } from './core-routing.module';
import { SkeletonExternalComponent } from './layout/skeleton-external/skeleton-external.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { SharedModule } from '../shared/shared.module';
import { ModalsModule } from '../modals/modals.module';


@NgModule({
  declarations: [
    NavbarComponent,
    SkeletonComponent,
    SkeletonExternalComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ModalsModule
  ]
})
export class CoreModule { 
  constructor(library:FaIconLibrary){
    library.addIconPacks(fas, far);
  }

}
