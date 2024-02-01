import { useState , useEffect} from "react";
import { VscError } from "react-icons/vsc";
import CartItemC from "./cart-item";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartReducer } from "../types/reducer-types";
import { addToCart, applyDiscount, calculatePrice, removeCartItem } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import axios from "axios";
import { server } from "../redux/store";


// const cartItems = [
//   {
//     productId : "hsbhbs",
//     photo : "https://www.aptronixindia.com/media/catalog/product/cache/31f0162e6f7d821d2237f39577122a8a/m/a/macbook_pro_13_inch_intel_fileminimizer__1.png",
//     name : "Macbook",
//     quantity : 4,
//     price : 3000,
//     stock : 10
//   }
// ]
// const subtotal = 4000;
// const tax = Math.round(subtotal * 0.18)
// const discount = 400;
// const shippingCharges = 200;
// const total = subtotal + tax + shippingCharges;


const Cart = () => {

  const dispatch = useDispatch();

  const {cartItems , subtotal,total,tax,shippingCharges,discount,shippingInfo } = useSelector((state :{cartReducer : CartReducer}) => state.cartReducer);
  

  const [couponCode , setCouponCode] = useState<string>("");

  const [isValidCouponCode , setIsValidCouponCode] = useState<boolean>(false);

  const incrementQuantity = (cartItem : CartItem) => {
    if(cartItem.quantity > cartItem.stock){
      alert("This product cannot be incremented");
      return;
    }
    dispatch(addToCart({...cartItem , quantity : cartItem.quantity + 1}));
  }

  const decrementQuantity = (cartItem : CartItem) => {
    if(cartItem.quantity <= 1){
      removeQuantity(cartItem.productId);
      return;
    }
    dispatch(addToCart({...cartItem , quantity : cartItem.quantity - 1}));
  }

  const removeQuantity = (id : string) => {
    dispatch(removeCartItem(id));
  }
  
  useEffect(()=>{

    const {token,cancel} = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {

      axios.get(`${server}/api/v1/payment/discount?code=${couponCode}`,{cancelToken : token})
      .then((res) => {
        setIsValidCouponCode(true);
        dispatch(applyDiscount(res.data.discount));
        dispatch(calculatePrice())
      })
      .catch(() => {
        setIsValidCouponCode(false)
        dispatch(applyDiscount(0));
        dispatch(calculatePrice())
      })
    } , 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    }
  }, [couponCode]);
  

  useEffect(()=>{
    dispatch(calculatePrice())
  }, [cartItems]);
  
  return (
    <div className="cart">
      <main>
        {
          cartItems.length > 0 ? cartItems.map((i , idx) => 
          ( <CartItemC key = {idx} cartItem={i} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} removeQuantity={removeQuantity}/>)
        ) : <h1>No item in the cart</h1>
        }
      </main>

      <aside>
        <p>
          Subtotal : ₹{subtotal}
        </p>
        <p>
          Shipping Charges : ₹{shippingCharges}
        </p>
        <p>
          Tax : ₹{tax}
        </p>
        <p>
          Discount : <em className="red" > - ₹{discount} </em>
        </p>
        <p>
          <b>
            Total : ₹{total}
          </b>
        </p>

        <input className="input"
          type = "text"
          placeholder="Enter coupon code"
          value = {couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {
          couponCode && (
            isValidCouponCode ? 
          <span className="green">₹{discount} off using the <code>{couponCode}</code></span>
          : <span className="red">
            Invalid Coupon <VscError />
          </span>
          )
        }

        {
          cartItems.length > 0 && <Link to = "/shipping" >Checkout</Link>
        }
      </aside>
    </div>

    
  )
}

export default Cart