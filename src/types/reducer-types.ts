import { CartItem, ShippingInfo, User } from "./types"

export type UserReducer ={
    user : User | null,
    loading: boolean
}
export type CartReducer ={
    loading : boolean,
    cartItems : CartItem[],
    subtotal : number,
    tax : number,
    discount : number,
    shippingCharges : number,
    total : number,
    shippingInfo : ShippingInfo

}