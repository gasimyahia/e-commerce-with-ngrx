import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'products',
        component:ProductsComponent,
      },
      {
        path:'',
        component:HomeComponent,
      },
      {
        path:'categories',
        component:CategoryComponent,
      },
      {
        path:'footer',
        component:FooterComponent,
      },
      {
        path:'brands',
        component:BrandComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
