import { createReducer, on } from "@ngrx/store";
import { addItemToCart, deleteItemFromCart, updateCartItem } from "./cart.actions";
import { cartAdaptor, CartIntitialState } from "./cart.state";

const _cartReducer=createReducer(
  CartIntitialState,
  on(addItemToCart,(state,action)=>{
    //console.log(action.cartItem);//0912960072 د.اشرف
    return cartAdaptor.addOne(action.cartItem,state);
  }),
  on(updateCartItem,(state,action)=>{
    return cartAdaptor.updateOne(action.cartItem,state);
  }),
  on(deleteItemFromCart,(state,{id})=>{
    return cartAdaptor.removeOne(id,state);
  })
);

export function cartReducer(state,action){
  return _cartReducer(state,action);
}
