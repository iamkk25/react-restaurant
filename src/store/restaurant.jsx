/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react";

import { defaultMealsData, useMeals } from "./mealsStore.js";
import { defaultCartData, useCart } from "./cartStore.js";

const defaultValue = {
	...defaultMealsData,
	updateError: (errMsg) => {},
	...defaultCartData,
	addMealToCart: (mealData) => {},
	updateCartData: (id, counter) => {},
	handleOpenCart: () => {},
	handleCloseCart: () => {},
};

export const RestaurantContext = createContext(defaultValue);

export default function RestaurantProvider({ children }) {
	const mealsData = useMeals();
	const cartData = useCart();

	const providerValue = { ...mealsData, ...cartData };
	return (
		<RestaurantContext.Provider value={providerValue}>
			{children}
		</RestaurantContext.Provider>
	);
}

export function useRestaurantContext() {
	const mealsContext = useContext(RestaurantContext);
	if (mealsContext === undefined) {
		throw new Error(
			"useRestaurantContext must be used within a <RestaurantProvider /> "
		);
	}

	return mealsContext;
}
