import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Cart } from "src/app/models/carts.module";

export interface CartState extends EntityState<Cart>{

}

export const cartAdaptor=createEntityAdapter<Cart>({});

export const CartIntitialState:CartState=cartAdaptor.getInitialState({});