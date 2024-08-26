import { useMealsContext } from "../../store/mealsStore";
import Modal from "../UI/Modal";

import styles from "./Cart.module.scss";

function Cart() {
	const {
		isCartOpened,
		cartData,
		totalPrice,
		cartLength,
		handleCloseCart,
		updateCartData,
	} = useMealsContext();

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
							<li key={cart.id} className={styles.cartItem}>
								<div className={styles.cartImg}>
									<img
										src={`http://localhost:3000/${cart.image}`}
										alt={cart.name}
									/>
								</div>
								<div className={styles.cartDescription}>
									<h2>{cart.name}</h2>
									<p>
										Price: <strong>${cart.price}</strong>
									</p>
								</div>
								<div className={styles.cartCounterWrapper}>
									<div className={styles.cartCounter}>
										<button onClick={() => updateCartData(cart.id, -1)}>
											-
										</button>
										<h3>{cart.count}</h3>
										<button onClick={() => updateCartData(cart.id, 1)}>
											+
										</button>
									</div>
								</div>
							</li>
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
