import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { cartModel } from 'src/app/models/cart.model';
import { Cart } from 'src/app/models/carts.module';
import { productsModel } from 'src/app/models/products.model';
import { ProductService } from 'src/app/services/product/product.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { AppState } from 'src/app/store/app.state';
import { environment } from 'src/environments/environment';
import { addItemToCart, updateCartItem } from '../cart/state/cart.actions';
import { getCartItems } from '../cart/state/cart.selector';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit,OnDestroy {
  Product:productsModel=null;
  ProductId:any;
  apiUrl:any=null;
  allProducts:productsModel[];
  showMore=false;
  subscription:Subscription;
  cartForm:FormGroup;

  constructor(
              private productService:ProductService,
              private route:ActivatedRoute,
              private toastService:ToastService,
              private formBulider:FormBuilder,
              private store:Store<AppState>,
             ) {}
  ngOnInit(): void {
    this.apiUrl=environment.apiUrl;
    this.getProductDetails();
    this.getProduct();
    this.initForm();
  }


  getProductDetails() {
    this.ProductId = this.route.snapshot.paramMap.get("id");
    this.subscription= this.productService.getProductById(this.ProductId).subscribe((res:any)=>{
      let products=res.product;
      products.forEach(pro => {
        if(pro.id==this.ProductId){
          this.Product=pro;
        }
      });
    });
  }

  getProduct() {
    this.subscription= this.productService.allProducts.subscribe(res=>{
      this.allProducts=res;
     });
   }

   getCartitems(){
     let cartItems:Cart[]=null;
     this.subscription=this.store.select(getCartItems).subscribe(items=>{
       cartItems=items;
       return cartItems;
     });
   }

   addToCart(product:productsModel){
    let items:Cart[]=null;
    let Qty=this.cartForm.value.quantity;
    this.subscription=this.store.select(getCartItems).subscribe(data=>{
      if(data.values != null){
        items=data;
      }
    });
    let cartItem=new cartModel(product.id,product.name,product.price,product.imgpath,Qty);
    if(items.length > 0){
      items.forEach((item)=>{
        if(item.id ==cartItem.id){
          cartItem.quantity=cartItem.quantity+item.quantity
          const updateCart:Update<Cart>={
            id:cartItem.id,
            changes:{
              name:cartItem.name,
              price:cartItem.price,
              image:cartItem.image,
              quantity:cartItem.quantity
            }
          }
          this.store.dispatch(updateCartItem({cartItem:updateCart}));
          this.toastSuccess("Product added to Cart Successfuly");
        }else{
          this.store.dispatch(addItemToCart({cartItem}));
          this.toastSuccess("Product added to Cart Successfuly");
        }
      });
    }else{
      this.store.dispatch(addItemToCart({cartItem}));
      this.toastSuccess("Product added to Cart Successfuly");
    }
  }

  toastSuccess(message) {
    this.toastService.show(message, { classname: 'bg-info text-light', delay: 5000 });
  }

  private initForm(){
    this.cartForm=this.formBulider.group({
      quantity:[1,[Validators.required]],
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
