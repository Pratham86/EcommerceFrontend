import { Elements , PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { NewOrderRequest } from "../types/api-types";
import { useDispatch, useSelector } from "react-redux";
import { CartReducer, UserReducer } from "../types/reducer-types";
import { useNewOrderMutation } from "../redux/api/orderApi";
import { resetCart } from "../redux/reducer/cartReducer";
import { responseToast } from "../utils/features";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY!);

const CheckOutForm = () =>{
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const {user} = useSelector((state : {userReducer : UserReducer}) => state.userReducer);

    const {shippingInfo , cartItems,subtotal,total,tax,shippingCharges,discount} = useSelector((state : {cartReducer : CartReducer}) => state.cartReducer);

    const [isProcessing , setIsProcessing] = useState(false);

    const [newOrder] = useNewOrderMutation();

    const submitHandler = async(e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        if(!stripe || !elements){
            return;
        }

        setIsProcessing(true);

        const orderData : NewOrderRequest = {
            shippingInfo ,
            orderItems : cartItems,
            tax,
            subtotal,
            total,
            discount,shippingCharges,
            user : user?._id!

        }

        const {paymentIntent , error} = await stripe.confirmPayment({elements , confirmParams:{return_url : window.location.origin},
        redirect: "if_required",});

        if(error){
            setIsProcessing(false);
            console.log(error);
            
            return toast.error(error.message || "Something went wrong...");
        }

        if(paymentIntent.status === "succeeded"){
            const res = await newOrder(orderData);
            dispatch(resetCart());
            console.log("Placing Order");
            responseToast(res , navigate,"/orders");
        }

        setIsProcessing(false);
    }

    return(
        <div className="checkout-container">
            <form onSubmit={submitHandler}>
                <PaymentElement />
                <button type = "submit" disabled = {isProcessing} >{isProcessing ? "Processing..." : "Pay"}</button>
            </form>
        </div>
    )
}

const Checkout = () => {

    const location = useLocation();

    const clientSecret: string | undefined = location.state;

    console.log(clientSecret);
    

    if(!clientSecret){
        return <Navigate to = {"/shipping"}/>
    }

  return (
    <Elements options={{
        clientSecret 
    }} stripe={stripePromise}>
        <CheckOutForm />
    </Elements>
  )
}

export default Checkout