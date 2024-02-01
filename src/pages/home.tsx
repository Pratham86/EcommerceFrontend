import { Link } from "react-router-dom";
import { useLatestProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import  { Skeleton } from "../components/loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
import ProductCard from "../components/product-card";

const Home = () => {

  const dispatch = useDispatch();

  const {data , isLoading , isError} = useLatestProductsQuery("");

  const addCartHandler = (cartItem : CartItem) => {
    if(cartItem.stock < 1){
      return toast.error("Out of Stock");
    }

    dispatch(addToCart(cartItem));
    toast.success("Product added to cart");

  }

  if(isError){
    toast.error("Cannot fetch the products");
  }

  return (
    <div className="home">
      <p className="imageText">
        Get Exclusive deals on
      </p>
      <section></section>

      <h1>Latest Products
        <Link to = "/search" className = "findmore"> More </Link>

      </h1>

      <main >
        { isLoading ? <Skeleton width = "80vw"/> : (
          data?.message?.map((i) => (
            <ProductCard key = {i._id} productId = {i._id} name = {i.name} price = {i.price} stock = {i.stock} photo = {i.photo} handler = {addCartHandler} />
          )))
        }
      </main>
    </div>
  )
}

export default Home