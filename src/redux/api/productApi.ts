import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CategoriesResponse, DeleteProductRequest, MessageResponse, NewProductRequest, ProductsResponse, SearchProductsRequest, SearchProductsResponse, SingleProductsResponse, UpdateProductRequest } from "../../types/api-types";


const server = import.meta.env.VITE_SERVER;

export const productApi = createApi({
    reducerPath:"productApi" ,

    baseQuery: fetchBaseQuery({baseUrl : `${server}/api/v1/product`}),

    tagTypes : ["product"],

    endpoints:(builder) =>({
        latestProducts : builder.query<ProductsResponse , string>({
            query : () => "latest",
            providesTags : ["product"]
        }),
        
        allProducts : builder.query<ProductsResponse , string>({
            query : (id) => `admin-products?id=${id}`,
            providesTags : ["product"]
        }),

        categories : builder.query<CategoriesResponse , string>({
            query : () => `category`,
            providesTags : ["product"]
        }),

        searchProducts : builder.query<SearchProductsResponse , SearchProductsRequest>({query : ({price,search,sort,category,page}) => {
            let base = `all?search=${search}&page=${page}`;

            if(price) base += `&price=${price}`
            if(sort) base += `&sort=${sort}`
            if(category) base += `&category=${category}`

            return base
        },
            providesTags : ["product"]
        }),

        productDetails : builder.query<SingleProductsResponse , string>({
            query : (id) => id,
            providesTags : ["product"]
        }),

        newProduct : builder.mutation<MessageResponse , NewProductRequest>({query : ({formData , id}) => ({
            url : `new?id=${id}`,
            method :"POST",
            body: formData
        }),
            invalidatesTags : ["product"]
    
        }),

        updateProduct : builder.mutation<MessageResponse , UpdateProductRequest>({query : ({formData , productId , userId}) => ({
            url : `${productId}?id=${userId}`,
            method :"PATCH",
            body: formData
        }),
            invalidatesTags : ["product"]
    
        }),

        deleteProduct : builder.mutation<MessageResponse , DeleteProductRequest>({query : ({ productId , userId}) => ({
            url : `${productId}?id=${userId}`,
            method :"DELETE",
        }),
            invalidatesTags : ["product"]
    
        }),

    
    })
});


export const { useLatestProductsQuery , useAllProductsQuery ,
useCategoriesQuery , useSearchProductsQuery,
useNewProductMutation,
useProductDetailsQuery,
useUpdateProductMutation,
useDeleteProductMutation
} = productApi;
