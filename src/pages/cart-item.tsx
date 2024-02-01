import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { server } from '../redux/store';
import { CartItem } from '../types/types';

type CartItemProps = {
    cartItem : CartItem;
    incrementQuantity : (cartItem : CartItem) => void;
    decrementQuantity : (cartItem : CartItem) => void;
    removeQuantity : (id : string) => void;
}

const CartItem = ({cartItem , incrementQuantity , decrementQuantity , removeQuantity } : CartItemProps) => {
    const {productId , photo , name , price, quantity} = cartItem;
  return (
    <div className="cart-item">
        <img src = {`${server}/${photo}`} alt = {name}/>
        <article>
            <Link to = {`/product/${productId}`}>{name}</Link>
            <span>₹{price}</span>
        </article>

        <div>
            <button onClick={() => decrementQuantity(cartItem)}>-</button>
            <p>{quantity}</p>
            <button onClick={() => incrementQuantity(cartItem)}>+</button>
        </div>
        
        <button onClick={() => removeQuantity(productId)}>
            <FaTrash/>
        </button>
    </div>
  )
}

export default CartItem