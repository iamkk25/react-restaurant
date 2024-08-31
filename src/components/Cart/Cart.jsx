import { useRestaurantContext } from "../../store/restaurant";
import Modal from "../UI/Modal";

import styles from "./Cart.module.scss";
import CartItem from "./CartItem.jsx";

function Cart() {
	const {
		isCartOpened,
		cartData,
		totalPrice,
		cartLength,
		handleCloseCart,
	} = useRestaurantContext();

	return (
		<Modal open={isCartOpened} onClose={handleCloseCart}>
			<div className={styles.cart}>
				<h2>
					Cart<sup>({cartLength})</sup>
				</h2>
				{cartData.length === 0 && (
					<p className={styles.feedback}>No cart items</p>
				)}
				{cartData.length > 0 && (
					<ul className={styles.cartList}>
						{cartData.map((cart) => (
							<CartItem key={cart.id} {...cart}/>
						))}
					</ul>
				)}
				<div className={styles.cartPayment}>
					<h2 className={styles.cartPrice}>{`Total Price: $${totalPrice}`}</h2>
					<div className={styles.cartCta}>
						<button onClick={() => handleCloseCart()} className={styles.flat}>
							Close
						</button>
						{cartData.length !== 0 && <button>Order now</button>}
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default Cart;
