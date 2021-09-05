import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { cartModel } from 'src/app/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  changedCartItems=new BehaviorSubject<cartModel[]>(null);
  private cartItems:cartModel[]=null;

  constructor() { }


  setCartItems(cartItems:cartModel[]){
    this.cartItems=cartItems;
    this.changedCartItems.next(this.cartItems.slice());
  }

  // getCartItems(){
  //   if(this.cartItems !=null){
  //     return this.cartItems.slice();
  //   }else{
  //     return this.cartItems;
  //   }
  // }

  getCartItems(){
    if(this.cartItems !=null){
      return this.cartItems.slice();
    }else{
      return this.cartItems;
    }
  }

  getCartItem(index:number){
    return this.cartItems[index];
  }

  addCartItems(cartItem:cartModel){
    let itemsExists:boolean=false;
    if(this.cartItems===null){
      this.cartItems=[cartItem];
    }else{
      this.cartItems.forEach(pro=>{
        if(pro.id==cartItem.id){
          itemsExists=true
        }
      });

      if(itemsExists){
        for (let key=0 ;key<this.cartItems.length;key++) {
          if(this.cartItems[key].id==cartItem.id){
            this.cartItems[key].quantity=this.cartItems[key].quantity + cartItem.quantity;
          }
        }
      }else{
        this.cartItems.push(cartItem);
      }

    }

    this.changedCartItems.next(this.cartItems.slice());
    console.log(this.cartItems);
  }

  updateCartItem(newCartItem:cartModel){
    let index:number=null;
    for (let key=0 ;key<this.cartItems.length;key++) {
      if(this.cartItems[key].id==newCartItem.id){
        index=key;
      }
    }
    this.cartItems[index]=newCartItem;
    this.changedCartItems.next(this.cartItems.slice());
  }

  deleteCartItems(id:number){
    let index:number=null;
    for (let key=0 ;key<this.cartItems.length;key++) {
      if(this.cartItems[key].id==id){
        index=key;
      }
    }
    this.cartItems.splice(index,1);
    this.changedCartItems.next(this.cartItems.slice());
  }
}
