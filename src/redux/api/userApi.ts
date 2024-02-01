import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllUsersResponse, DeleteUserRequest, MessageResponse } from "../../types/api-types";
import { User } from "../../types/types";
import axios from "axios";
import { UserReducer } from "../../types/reducer-types";

const server = import.meta.env.VITE_SERVER;

export const userApi = createApi({
    reducerPath:"userApi" ,

    baseQuery: fetchBaseQuery({baseUrl : `${server}/api/v1/user`}),

    tagTypes : ["users"],

    endpoints:(builder) =>
    ({  
        login : builder.mutation< MessageResponse , User>({
            query : (user) => ({
                url : "new",
                method : "POST",
                body : user,
            }),
            invalidatesTags : ["users"]
        }),
        deleteUser : builder.mutation< MessageResponse , DeleteUserRequest>({
            query : ({userId, adminUserId}) => ({
                url : `${userId}?id=${adminUserId}`,
                method : "DELETE"
            }),
            invalidatesTags : ["users"]
        }),

        allUsers : builder.query< AllUsersResponse , string>({
            query : (id) => `all?id=${id}`,
            providesTags : ["users"]
        })
    })
});

export const getUser = async (id:string) =>{
    try{
        const res = await axios.get(`${server}/api/v1/user/${id}`);
        console.log(res);
        
        const data:UserReducer = res.data
        return data;
    }
    catch(err){
        throw err
    }
}

export const { useLoginMutation , useDeleteUserMutation, useAllUsersQuery} = userApi;
