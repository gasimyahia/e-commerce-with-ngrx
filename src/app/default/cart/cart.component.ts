import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Update } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { cartModel } from 'src/app/models/cart.model';
import { Cart } from 'src/app/models/carts.module';
import { AppState } from 'src/app/store/app.state';
import { environment } from 'src/environments/environment';
import { deleteItemFromCart, updateCartItem } from './state/cart.actions';
import { getCartItems } from './state/cart.selector';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit ,OnDestroy {
  cartItems:Cart[];
  subscription:Subscription;
  apiUrl:any;
  totalAmount:number=0;
  cartForm:FormGroup;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.subscription=this.store.select(getCartItems).subscribe(data=>{
      if(data.values != null){
        this.cartItems=data;
      }
    });
    this.totalAmount=this.calcTotal(this.cartItems);
    this.apiUrl=environment.apiUrl;
  }

  calcTotal(cartItems:cartModel[]){
    let total:number=0;
    if(cartItems != null){
      cartItems.forEach(item=>{
        total+=item.price * item.quantity;
      });
    }
    return total;
  }

  deleteItem(id:number){
    this.store.dispatch(deleteItemFromCart({id}))
    if(this.cartItems.length==0)
    this.cartItems=null;
    this.totalAmount=this.calcTotal(this.cartItems);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  plus(item:Cart){
   const qty:number=item.quantity + 1;
    const updateCart:Update<Cart>={
      id:item.id,
      changes:{
        name:item.name,
        price:item.price,
        image:item.image,
        quantity:qty
      }
    }
    this.store.dispatch(updateCartItem({cartItem:updateCart}));
    this.totalAmount=this.calcTotal(this.cartItems);
  }

  minus(item:Cart){
    if(item.quantity <= 1){
      return
    }
    const qty:number=item.quantity - 1;
    const updateCart:Update<Cart>={
      id:item.id,
      changes:{
        name:item.name,
        price:item.price,
        image:item.image,
        quantity:qty
      }
    }
    this.store.dispatch(updateCartItem({cartItem:updateCart}));
    this.totalAmount=this.calcTotal(this.cartItems);
  }

}
