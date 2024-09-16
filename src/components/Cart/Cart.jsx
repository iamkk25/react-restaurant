import { useRestaurantContext } from "../../store/restaurant";
import Modal from "../UI/Modal";

import styles from "./Cart.module.scss";
import CartItem from "./CartItem.jsx";
import { useUserProgress } from "../../store/UserProgressStore.jsx";

function Cart() {
	const { cartData, totalPrice, cartLength } =
		useRestaurantContext();

	const { progress, handleCloseProgress, handleOpenCheckout } =
		useUserProgress();

	console.log(cartData);
	console.log(progress);

	return (
		<Modal open={progress === "cart"} onClose={handleCloseProgress}>
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
							<CartItem key={cart.id} {...cart} />
						))}
					</ul>
				)}
				<div className={styles.cartPayment}>
					<h2 className={styles.cartPrice}>{`Total Price: $${totalPrice}`}</h2>
					<div className={styles.cartCta}>
						<button
							onClick={() => handleCloseProgress()}
							className={styles.flat}
						>
							Close
						</button>
						{cartData.length !== 0 && (
							<button onClick={() => handleOpenCheckout()}>
								Go to Checkout
							</button>
						)}
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default Cart;
