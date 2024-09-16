import InputField from "./UI/InputField.jsx";
import Modal from "./UI/Modal.jsx";

import { useRestaurantContext } from "../store/restaurant.jsx";
import { useUserDetails } from "../store/userDetails.jsx";
import { useUserProgress } from "../store/UserProgressStore.jsx";

import styles from "./CheckoutForm.module.scss";

function CheckoutForm() {
	const {
		fullname,
		email,
		street,
		city,
		postalCode,
		handleInputChange,
		handleInputBlur,
		handleReset,
	} = useUserDetails();

	const { cartData, order } = useRestaurantContext();
	const { progress, handleOpenSummary, handleCloseProgress, handleOpenCart } =
		useUserProgress();

	const validForm =
		fullname.validValue &&
		email.validValue &&
		street.validValue &&
		city.validValue &&
		postalCode.validValue;

	function handleCloseAndReset(e) {
		e.preventDefault();
		handleReset();
		handleCloseProgress();
	}

	function handleSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const customer = Object.fromEntries(formData.entries());
		const orderData = {
			customer: { ...customer, postalCode: customer["postal-code"] },
			items: cartData.map((item) => ({
				id: item.id,
				count: item.count,
				name: item.name,
				price: item.price,
			})),
		};
		console.log(orderData);
		handleOpenSummary();
		order.postOrder(
			"http://localhost:3000/orders",
			"Failed to submit your order!",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ order: orderData }),
			}
		);
	}

	return (
		<Modal open={progress === "checkout"} onClose={handleCloseAndReset}>
			<form
				className={styles.userDetailForm}
				onSubmit={handleSubmit}
				onReset={handleReset}
			>
				<div>
					<button
						className={styles.flatBtn}
						onClick={handleOpenCart}
						type={"button"}
					>
						&larr; Edit cart
					</button>
				</div>
				<InputField
					id={"fullname"}
					label={"Full Name:"}
					type={"text"}
					value={fullname.value}
					hasError={fullname.hasError}
					required
					placeholder={"Enter Your Name"}
					errMsg={"Enter a valid full name."}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
				/>
				<InputField
					id={"email"}
					label={"Email:"}
					type={"email"}
					value={email.value}
					hasError={email.hasError}
					required
					placeholder={"test@test.com"}
					errMsg={"Enter a valid email."}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
				/>
				<InputField
					id={"street"}
					label={"Street:"}
					type={"text"}
					value={street.value}
					hasError={street.hasError}
					required
					placeholder={"enter your street"}
					errMsg={"Enter a valid street."}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
				/>
				<InputField
					id={"city"}
					label={"City:"}
					type={"text"}
					value={city.value}
					hasError={city.hasError}
					required
					placeholder={"city"}
					errMsg={"Enter a valid city."}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
				/>
				<InputField
					id={"postal-code"}
					label={"Postal Code:"}
					type={"text"}
					value={postalCode.value}
					hasError={postalCode.hasError}
					required
					placeholder={"600001"}
					errMsg={"Enter a valid postal code."}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
				/>
				<div className={styles.cta}>
					<button onClick={handleCloseAndReset} type={"button"}>
						Close
					</button>
					<button type={"reset"}>Reset</button>
					<button
						className={styles.primary}
						type={"submit"}
						disabled={!validForm}
					>
						Place Order
					</button>
				</div>
			</form>
		</Modal>
	);
}

export default CheckoutForm;
