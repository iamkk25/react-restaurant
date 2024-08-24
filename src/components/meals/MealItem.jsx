/* eslint-disable react/prop-types */
import styles from "./MealItem.module.scss";

function MealItem({ name, image, description, price, onClick }) {
	return (
		<div className={styles.mealCard}>
			<div className={styles.mealImg}>
				<img src={`http://localhost:3000/${image}`} alt={name} />
			</div>
			<div className={styles.mealDetails}>
				<h2 className={styles.mealTitle}>{name}</h2>
				<p className={styles.mealDescription}>{description}</p>
				<div className={styles.mealPayment}>
					<h3 className={styles.mealPrice}>${price}</h3>
					<button onClick={onClick}>Add to cart</button>
				</div>
			</div>
		</div>
	);
}

export default MealItem;
