import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { cartModel } from 'src/app/models/cart.model';
import { productsModel } from 'src/app/models/products.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductService } from 'src/app/services/product/product.service';
import { ToastService } from 'src/app/services/toast/toast.service';
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
  cartForm:FormGroup;

  constructor(
              private productService:ProductService,
              private route:ActivatedRoute,
              private toastService:ToastService,
              private cartService:CartService,
              private formBulider:FormBuilder
             ) {}
  ngOnInit(): void {
    this.apiUrl=environment.apiUrl;
    this.getProductDetails();
    this.getProduct();
    this.initForm();
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

   addToCart(product:productsModel){
     let Qty=this.cartForm.value.quantity;
    let cartItem=new cartModel(product.id,product.name,product.price,product.imgpath,Qty);
    console.log(cartItem);
    this.cartService.addCartItems(cartItem);
    this.toastSuccess("Product added to Cart Successfuly");
  }

  toastSuccess(message) {
    this.toastService.show(message, { classname: 'bg-info text-light', delay: 5000 });
  }

  private initForm(){
    this.cartForm=this.formBulider.group({
      quantity:[1,[Validators.required]],
    });
  }
}
