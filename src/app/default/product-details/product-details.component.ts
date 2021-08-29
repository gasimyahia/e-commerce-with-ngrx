import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productsModel } from 'src/app/models/products.model';
import { ProductService } from 'src/app/services/product/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  Product:productsModel=null;
  ProductId:any;
  apiUrl:any=null;
  allProducts:productsModel[];
  showMore=false;

  constructor(
              private productService:ProductService,
              private route:ActivatedRoute
             ) {}
  ngOnInit(): void {
    this.apiUrl=environment.apiUrl;
    this.getProductDetails();
    this.getProduct();
  }

  getProductDetails() {
    this.ProductId = this.route.snapshot.paramMap.get("id");
    this.productService.getProductById(this.ProductId).subscribe((res:any)=>{
      let products=res.product;
      console.log(products);
      products.forEach(pro => {
        if(pro.id==this.ProductId){
          this.Product=pro;
          console.log(this.Product.name);
        }
      });
    });
  }

  getProduct() {
    this.productService.allProducts.subscribe(res=>{
      this.allProducts=res;
     });
   }
}
