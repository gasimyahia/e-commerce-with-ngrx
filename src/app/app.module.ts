import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from './services/toast/toast.service';
import { ProductService } from './services/product/product.service';
import { BrandService } from './services/brand/brand.service';
import { CategoryService } from './services/category/category.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [ToastService,ProductService,BrandService,CategoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
