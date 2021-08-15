import { Component, OnInit } from '@angular/core';
import { brandModel } from 'src/app/models/brand.model';
import { categoryModel } from 'src/app/models/category.model';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  categories:categoryModel[];
  brands:brandModel[];
  allProducts: any[];
  copiedProduct: any[];

  constructor(
    private proSer: ProductService,
  ) { }
  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
   this.proSer.allProducts.subscribe(res=>{
     this.allProducts=res;
     console.log(this.allProducts);
    });
  }
  
}
