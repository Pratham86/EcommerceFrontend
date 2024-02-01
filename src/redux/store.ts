import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import { userReducer } from "./reducer/userReducer";
import { productApi } from "./api/productApi";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderApi";
import { dashboardApi } from "./api/dashboardApi";

export const server = import.meta.env.VITE_SERVER;

export const store = configureStore({

    reducer : {
        [userApi.reducerPath]: userApi.reducer,
        "userReducer": userReducer.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [cartReducer.name]: cartReducer.reducer,
        [orderApi.reducerPath] : orderApi.reducer,
        [dashboardApi.reducerPath] : dashboardApi.reducer,

    },

    middleware : (middlewares) => middlewares().concat([userApi.middleware , productApi.middleware,orderApi.middleware ,dashboardApi.middleware]),
});
