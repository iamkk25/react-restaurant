import Modal from "../UI/Modal";
import Error from "../Error";

import styles from "./Meals.module.scss";
import { useRestaurantContext } from "../../store/restaurant";
import MealItem from "./MealItem";
function Meals() {
	const {
		mealsData: meals,
		error,
		isLoading: isFetching,
		updateError,
	} = useRestaurantContext();

	function handleClose() {
		updateError();
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
			{isFetching && (
				<p className={styles.feedback}>Fetching available meals...</p>
			)}
			{!isFetching && meals.length === 0 && (
				<p className={styles.feedback}>No meals available.</p>
			)}
			{!isFetching &&
				!error &&
				meals.map((meal) => {
					return <MealItem key={meal.id} {...meal} />;
				})}
		</div>
	);
}

export default Meals;
