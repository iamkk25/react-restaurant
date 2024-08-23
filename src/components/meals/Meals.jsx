import Modal from "../UI/Modal";
import Error from "../Error";

import useFetch from "../../hooks/useFetch";

import styles from "./Meals.module.scss";
import { useState } from "react";

function Meals() {
	const [toggle, setToggle] = useState(false);
	const {
		data: meals,
		isFetching,
		error,
		setError,
	} = useFetch("Failed to get meals data!🍽️");

	console.log({ meals, isFetching, error });

	function handleClose() {
		setError(null);
	}

	if (error) {
		return (
			<Modal open={error} onClose={handleClose}>
				{error && (
					<Error
						title={"An error occurred"}
						message={error}
						onConfirm={handleClose}
					/>
				)}
			</Modal>
		);
	}

	return (
		<div className={styles.meals}>
			{meals.map((meal) => {
				return (
					<div className={styles.mealCard} key={meal.id}>
						<div className={styles.mealImg}>
							<img
								src={`http://localhost:3000/${meal.image}`}
								alt={meal.name}
							/>
						</div>
						<div className={styles.mealDetails}>
							<h2 className={styles.mealTitle}>{meal.name}</h2>
							<p
								className={`${styles.mealDescription} ${
									toggle ? styles.toggleText : null
								}`.trim()}
								onClick={() => setToggle(!toggle)}
							>
								{meal.description}
							</p>
							<div className={styles.mealPayment}>
								<h3 className={styles.mealPrice}>${meal.price}</h3>
								<button>Add to cart</button>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Meals;
