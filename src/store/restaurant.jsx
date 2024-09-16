/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react";

import { defaultMealsData, useMealsStore } from "./mealsStore.js";
import { defaultCartData, useCartStore } from "./cartStore.js";
import usePostOrder from "../hooks/usePostOrder.js";

const defaultValue = {
	...defaultMealsData,
	updateError: (errMsg) => {},
	...defaultCartData,
	addMealToCart: (mealData) => {},
	updateCartData: (id, counter) => {},
	handleOpenCart: () => {},
	handleCloseCart: () => {},
	resetCart: () => {},
	order: {
		data: null,
		isSending: false,
		error: null,
		postOrder: () => {},
		resetOrder: () => {},
	},
};

export const RestaurantContext = createContext(defaultValue);

export default function RestaurantProvider({ children }) {
	const mealsData = useMealsStore();
	const cartData = useCartStore();
	const orderData = usePostOrder();

	const providerValue = { ...mealsData, ...cartData, order: orderData };
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
