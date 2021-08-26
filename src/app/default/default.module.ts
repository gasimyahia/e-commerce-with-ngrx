import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { ProductsComponent } from './products/products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeftsidebarComponent } from './leftsidebar/leftsidebar.component';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ToastComponent } from './toast/toast.component';
import { ShowComponent } from './products/show/show.component';
import { HomeComponent } from './home/home.component';
import { AppFooterComponent } from './app-footer/app-footer.component';



@NgModule({
  declarations: [
    DefaultComponent,
    ProductsComponent,
    LeftsidebarComponent,
    RegistrationComponent,
    LoginComponent,
    TopbarComponent,
    AboutComponent,
    ContactusComponent,
    ToastComponent,
    ShowComponent,
    HomeComponent,
    AppFooterComponent
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers:[
    ProductsComponent
  ]
})
export class DefaultModule { }
