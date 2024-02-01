import { Bar, CartItem, Line, Order, Pie, Product, ShippingInfo, Stats, User } from "./types";

export type CustomError = {
    status : number;
    data:{
        message : string;
    }
}

export type MessageResponse ={
    message : string
}
export type AllUsersResponse ={
    users : User[]
}
export type ProductsResponse ={
    message : Product[]
}
export type SingleProductsResponse ={
    message : Product
}
export type CategoriesResponse ={
    message : string[]
}
export type SearchProductsResponse ={
    products : Product[],
    totalPage : number
}
export type SearchProductsRequest ={
    search : string,
    price? : number,
    page : number,
    category?:string
    sort?:string
}
export type NewProductRequest ={
    id : string,
    formData : FormData;
}
export type UpdateProductRequest ={
    userId : string,
    productId : string,
    formData : FormData,
}
export type DeleteProductRequest ={
    userId : string,
    productId : string,
}
export type NewOrderRequest ={
    orderItems : CartItem[],
    subtotal : number,
    tax : number,
    discount : number,
    shippingCharges : number,
    total : number,
    shippingInfo : ShippingInfo,
    user : string

}
export type UpdateOrderRequest ={
    userId : string
    orderId : string

}
export type DeleteUserRequest ={
    userId : string
    adminUserId : string

}

export type OrdersResponse ={
    orders : Order[]
}
export type SingleOrderResponse ={
    order : Order
}

export type StatsResponse ={
    stats : Stats
}
export type PieResponse ={
    charts : Pie
}
export type BarResponse ={
    charts : Bar
}
export type LineResponse ={
    charts : Line
}
