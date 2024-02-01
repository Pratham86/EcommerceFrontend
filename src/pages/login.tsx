import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import {toast} from "react-hot-toast";
import {auth} from "../firebase";
import {FcGoogle} from "react-icons/fc";
import {useLoginMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-types";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [gender , setGender] = useState("");
    const [date , setDate] = useState("");

    const [login ] = useLoginMutation();
    const navaigate = useNavigate();

    const loginHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();

            const {user} = await signInWithPopup(auth,provider);

            const res = await login({
                name : user.displayName!,
                email : user.email!,
                photo : user.photoURL!,
                gender,
                role : "user",
                dob : date,
                _id : user.uid,
            });

            if("data" in res){
                toast.success(res.data.message);
            }
            else{
                const err = res.error as FetchBaseQueryError;

                const message = (err.data as MessageResponse).message;
                console.log(message);
                

                toast.error("Sign in failed");
            }            
            
            
            toast.success(`Welcome ${user.displayName}`);
            navaigate("/")
            
            

        } catch (error) {
            toast.error("Sign in failed")
            console.log(error);          
        }
    }

  return (
    <div className="login">
        <main>
            <h1 className="heading">Login</h1>

            <div>
                <label>Gender</label>
                <select value = {gender} onChange={(e) => setGender(e.target.value)}>

                    <option value = "">Select</option>
                    <option value = "male">Male</option>
                    <option value = "female">Female</option>
                </select>
            </div>

            <div>
                <label>Date of Birth</label>
                <input 
                    type = "date"
                    value = {date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>

            <div>
                <p>Already Signed In Once</p>
                <button onClick = {loginHandler}>
                    <FcGoogle /> <span>Sign in with Google</span>
                </button>
            </div>
        </main>
    </div>
  )
}

export default Login