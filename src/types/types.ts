export type User = {
    name: string;
    email:string;
    photo:string;
    gender:string;
    role:string;
    dob:string;
    _id:string;
}
export interface Product {
    name: string;
    category:string;
    photo:string;
    price : number;
    stock : number;
    _id:string;
}
export type ShippingInfo = {
    address : string,
    city : string,
    state : string
    country : string
    pinCode : string
}

export type CartItem = {
    productId:string,
    name : string
    price : number
    quantity : number
    stock : number
    photo : string
}
export type OrderItem = Omit<CartItem , "stock"> & {_id : string}

export type Order = {
    orderItems : OrderItem[];
    shippingInfo : ShippingInfo;
    subtotal : number,
    tax : number,
    discount : number,
    shippingCharges : number,
    total : number,
    status : string;
    user : {
        name : string,
        _id : string
    }
    _id : string
}

type CountAndChange = {
    revenue: number;
    product: number;
    user: number;
    order: number
}

type LatestTransaction = {
    _id : string,
    amount : number
    discount : number
    quantity : number
    status : string
}

export type Stats = {
    categoryCountObj : Record<string, number>[],
    percent : CountAndChange,
    count : CountAndChange,
    chart:{
        order: number[],
        revenue: number[]
    },
    genderRatio : {
        male : number
        female : number
    },
    lastestTransactions : LatestTransaction[]
}

type orderRatio = {
    processing : number
    shipped : number
    delivered : number
}
type revenueDist = {
    netMargin: number,
    discount: number,
    productionCost: number,
    burnt: number,
    marketingCost: number
}


export type Pie = {
    orderRatio: orderRatio;
    productCategories : Record<string, number>[],
    stockAvailability : {
        outOfStock: number,
        inStock: number
    },
    revenueDist: revenueDist,
    adminCust: {
        admin: number,
        customers: number
    },
    userAge: {
        teen: number,
        adult: number,
        old: number
    }
}
export type Bar = {
    users: number[],
    products: number[],
    orders: number[],
    
}
export type Line = {
    users: number[],
    products: number[],
    discount: number[],
    revenue: number[],
    
}
