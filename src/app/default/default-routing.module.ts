import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGurad } from '../services/user/auth-gurad.service';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DefaultComponent } from './default.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:'',component:DefaultComponent,
    children:[
      {path:'',component:HomeComponent},
      {path:'products',component:ProductsComponent},
      {path:'products/:id',component:ProductDetailsComponent},
      {path:'contact',component:ContactusComponent},
      {path:'about',component:AboutComponent},
      {path:'account',component:LoginComponent},
      {path:'cart',component:CartComponent,canActivate:[AuthGurad]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
