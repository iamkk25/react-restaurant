import styles from "./CartItem.module.scss";
import {useRestaurantContext} from "../../store/restaurant.jsx";

function CartItem({id,image,name,price,count}) {
    const {updateCartData} = useRestaurantContext();
    
    return <li  className={styles.cartItem}>
        <div className={styles.cartImg}>
            <img
                src={`http://localhost:3000/${image}`}
                alt={name}
            />
        </div>
        <div className={styles.cartDescription}>
            <h2>{name}</h2>
            <p>
                Price: <strong>${price}</strong>
            </p>
        </div>
        <div className={styles.cartCounterWrapper}>
            <div className={styles.cartCounter}>
                <button onClick={() => updateCartData(id, -1)}>
                    -
                </button>
                <h3>{count}</h3>
                <button onClick={() => updateCartData(id, 1)}>
                    +
                </button>
            </div>
        </div>
    </li>
}

export default CartItem;