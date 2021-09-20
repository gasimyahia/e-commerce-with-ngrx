import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Cart } from "src/app/models/carts.module";

export const ADD_CART_ITEM_ACTION='[cart page] add item to cart';
export const UPDATE_CART_ITEM_ACTION='[cart page] update item to cart';
export const DELETE_CART_ITEM_ACTION='[cart page] delete item from cart';
export const GET_CART_ITEM='[cart page] get cart item';

export const addItemToCart=createAction(ADD_CART_ITEM_ACTION,props<{cartItem:Cart}>());

export const updateCartItem=createAction(UPDATE_CART_ITEM_ACTION,props<{cartItem:Update<Cart>}>());

export const deleteItemFromCart=createAction(DELETE_CART_ITEM_ACTION,props<{id:number}>());

export const getCartItem=createAction(GET_CART_ITEM,props<{cartItems:Cart[]}>());
