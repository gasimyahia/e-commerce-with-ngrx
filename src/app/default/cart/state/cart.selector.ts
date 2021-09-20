import { createFeatureSelector, createSelector } from "@ngrx/store";
import { cartAdaptor, CartState } from "./cart.state";

export const CART_STATE_NAME='cartItems';

const getCartState=createFeatureSelector<CartState>(CART_STATE_NAME);

export const cartItemsSelector=cartAdaptor.getSelectors();

export const getCartItems=createSelector(getCartState,cartItemsSelector.selectAll);
