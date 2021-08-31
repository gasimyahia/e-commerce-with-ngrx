import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cartModel } from 'src/app/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  changedCartItems=new BehaviorSubject<cartModel[]>(null);
  private cartItems:cartModel[]=null;

  setCartItems(cartItems:cartModel[]){
    this.cartItems=cartItems;
    this.changedCartItems.next(this.cartItems.slice());
  }

  getCartItems(){
    return this.cartItems.slice();
  }

  getCartItem(index:number){
    return this.cartItems[index];
  }

  addCartItems(cartItem:cartModel){
    this.cartItems.push(cartItem);
    this.changedCartItems.next(this.cartItems.slice());
  }

  updateRecipe(index:number,newCartItem:cartModel){
    this.cartItems[index]=newCartItem;
    this.changedCartItems.next(this.cartItems.slice());
  }

  deleteRecipe(index:number){
    this.cartItems.splice(index,1);
    this.changedCartItems.next(this.cartItems.slice());
  }
}
