import Modal from "./UI/Modal";
import Error from "./UI/Error";

import styles from "./OrderSummary.module.scss";

import { useUserProgress } from "../store/UserProgressStore";
import { useRestaurantContext } from "../store/restaurant";
import { useUserDetails } from "../store/userDetails";

function OrderSummary() {
	const { order, resetCart } = useRestaurantContext();
	const { handleReset } = useUserDetails();
	const { progress, handleCloseProgress } = useUserProgress();

	function handleClose() {
		order.resetOrder();
		resetCart();
		handleReset();
		handleCloseProgress();
	}

	return (
		<Modal open={progress === "ordered"} onClose={handleClose}>
			<section className={styles.orderSummary}>
				{order.isSending && <p>Placing your order...</p>}
				{order.error && (
					<Error
						title="An error occured!"
						message={order.error.message}
						onConfirm={handleClose}
					/>
				)}
				{(!order.isSending || order.data) && (
					<>
						<h2>{order.data.message || "Success!"}</h2>
						<p>Your order was submitted successfully.</p>
						<p>
							We will get back to you with more details via email within the
							next few minutes.
						</p>
						<p>
							Track your order with this id,{" "}
							<strong>{order.data.orderId}</strong>
						</p>
						<button onClick={handleClose}>Okay</button>
					</>
				)}
			</section>
		</Modal>
	);
}

export default OrderSummary;
