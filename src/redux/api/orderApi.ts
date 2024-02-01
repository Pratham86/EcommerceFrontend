import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { MessageResponse, NewOrderRequest, OrdersResponse, SingleOrderResponse, UpdateOrderRequest } from "../../types/api-types";


const server = import.meta.env.VITE_SERVER;

export const orderApi = createApi({
    reducerPath:"orderApi" ,

    baseQuery: fetchBaseQuery({baseUrl : `${server}/api/v1/order`}),

    tagTypes : ["orders"],

    endpoints:(builder) =>({
        
        newOrder : builder.mutation<MessageResponse , NewOrderRequest>({query : (order) => ({
            url : `new`,
            method :"POST",
            body: order
        }),
        invalidatesTags : ["orders"]
        }),

        updateOrder : builder.mutation<MessageResponse , UpdateOrderRequest>({query : ({userId , orderId}) => ({
            url : `${orderId}?id=${userId}`,
            method :"PATCH",
        }),
        invalidatesTags : ["orders"]
        }),

        deleteOrder : builder.mutation<MessageResponse , UpdateOrderRequest>({query : ({userId , orderId}) => ({
            url : `${orderId}?id=${userId}`,
            method :"DELETE",
        }),
        invalidatesTags : ["orders"]
        }),

        myOrders : builder.query<OrdersResponse , string>({
            query : (id) => (`my?id=${id}`),
            providesTags : ["orders"]
        }),
        allOrders : builder.query<OrdersResponse , string>({
            query : (id) => (`all?id=${id}`),
            providesTags : ["orders"]
        }),

        orderDetails : builder.query<SingleOrderResponse , string>({
            query : (id) => (id),
            providesTags : ["orders"]
        })

    
    })
});


export const { useNewOrderMutation , useAllOrdersQuery , useMyOrdersQuery , useOrderDetailsQuery,useUpdateOrderMutation,useDeleteOrderMutation} = orderApi;
