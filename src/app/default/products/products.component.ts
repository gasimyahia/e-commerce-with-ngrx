import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { brandModel } from 'src/app/models/brand.model';
import { categoryModel } from 'src/app/models/category.model';
import { productsModel } from 'src/app/models/products.model';
import { ProductService } from 'src/app/services/product/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories:categoryModel[];
  brands:brandModel[];
  allProducts: productsModel[];
  copiedProduct: productsModel[];
  apiUrl=null;

  constructor(
    private proSer: ProductService,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.getProduct();
    this.apiUrl=environment.apiUrl;
  }

  getProduct() {
   this.proSer.allProducts.subscribe(res=>{
     this.allProducts=res;
    });
  }

  ProductDetails(id: any) {
    this.router.navigate([`/products/${id}`]);
  }

}
