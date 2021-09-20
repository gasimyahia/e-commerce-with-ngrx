import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from './services/toast/toast.service';
import { ProductService } from './services/product/product.service';
import { BrandService } from './services/brand/brand.service';
import { CategoryService } from './services/category/category.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthGurad } from './services/user/auth-gurad.service';
import { StoreModule } from '@ngrx/store';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { AppReducer } from './store/app.state';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot(AppReducer),
    StoreDevtoolsModule.instrument({logOnly:environment.production}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot({}),
  ],
  providers: [ToastService,ToastrService,ProductService,BrandService,CategoryService,AuthGurad],
  bootstrap: [AppComponent]
})
export class AppModule { }
