import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { cartModel } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems:cartModel[]=null;
  apiUrl:any;
  totalAmount:number=0;
  cartForm:FormGroup;

  constructor(private cartService:CartService,private formBulider:FormBuilder) { }

  ngOnInit(): void {
    this.cartItems=this.cartService.getCartItems();
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

  deleteItem(item:cartModel){
    this.cartService.deleteCartItems(item.id);
    let index:number=null;
    for (let key=0 ;key<this.cartItems.length;key++) {
      if(this.cartItems[key].id==item.id){
        index=key;
      }
    }
    this.cartItems.splice(index,1);
    if(this.cartItems.length==0)
    this.cartItems=null;
    this.totalAmount=this.calcTotal(this.cartItems);
  }



}
