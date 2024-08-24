import Modal from "../UI/Modal";
import Error from "../Error";

import styles from "./Meals.module.scss";
import { useMealsContext } from "../../store/mealsStore";
import MealItem from "./MealItem";
function Meals() {
	// const {
	// 	mealsData: meals,
	// 	error,
	// 	isLoading: isFetching,
	// 	updateError,
	// } = useMealsContext();

	const meals = [],
		error = "",
		isFetching = false;

	console.log({ meals, isFetching, error });

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
			{isFetching && <p>Fetching available meals...</p>}
			{(!isFetching || (!error && meals.length === 0)) && (
				<p>No meals available.</p>
			)}
			{!isFetching &&
				!error &&
				meals.map((meal) => {
					return (
						<MealItem
							key={meal.id}
							name={meal.name}
							image={meal.image}
							price={meal.price}
							description={meal.description}
						/>
					);
				})}
		</div>
	);
}

export default Meals;
