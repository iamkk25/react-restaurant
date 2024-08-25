import Modal from "../UI/Modal";

import styles from "./Cart.module.scss";

function Cart() {
	return (
		<Modal open={true}>
			<div className={styles.cart}>
				<p>No cart items</p>
			</div>
		</Modal>
	);
}

export default Cart;
