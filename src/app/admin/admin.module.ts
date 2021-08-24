import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AsidebarComponent } from './asidebar/asidebar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './topbar/topbar.component';
import { ProductsComponent } from './products/products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './products/modal/modal.component';
import { CategoryComponent } from './category/category.component';
import { BrandComponent } from './brand/brand.component';
import { ToastComponent } from './toast/toast.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AdminComponent,
    AsidebarComponent,
    SidebarComponent,
    FooterComponent,
    TopbarComponent,
    ProductsComponent,
    ModalComponent,
    CategoryComponent,
    BrandComponent,
    ToastComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgbModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
