import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';
import { CoreRoutingModule } from './core-routing.module';
import { SkeletonExternalComponent } from './layout/skeleton-external/skeleton-external.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';



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
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class CoreModule { 
  constructor(library:FaIconLibrary){
    library.addIconPacks(fas, far);
  }

}
