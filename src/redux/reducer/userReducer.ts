import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserReducer } from "../../types/reducer-types";
import { User } from "../../types/types";

const initialState : UserReducer = {
    user: null,
    loading : true
}

export const userReducer = createSlice({
    name : "userReducer",
    initialState,
    reducers: {
        userExist: (state , action : PayloadAction<User>) =>{
            state.loading = false;
            state.user = action.payload;
        },
        userNotExists: (state) =>{
            state.loading = false;
            state.user = null;
        },
    }
});

export const {userExist , userNotExists} = userReducer.actions;