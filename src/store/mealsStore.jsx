/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
	createContext,
	useReducer,
	useEffect,
	useContext,
	useState,
} from "react";
import { getMeals } from "../http/https";

const defaultMealsData = {
	mealsData: [],
	error: "",
	isLoading: false,
};

const defaultCartData = {
	cartData: [],
	totalPrice: 0,
	cartLength: 0,
	isCartOpened: false,
};

const defaultValue = {
	...defaultMealsData,
	updateError: (errMsg) => {},
	...defaultCartData,
	addMealToCart: (mealData) => {},
	updateCartData: (id, counter) => {},
	handleOpenCart: () => {},
	handleCloseCart: () => {},
};

const ACTIONS = Object.freeze({
	getMeals: Symbol("get-meals"),
	loadingData: Symbol("loading-data"),
	updateError: Symbol("update-error"),
	addToCart: Symbol("add-to-cart"),
	updateCartData: Symbol("update-cart-data"),
});

export const MealsStore = createContext(defaultValue);

function mealsReducer(state, action) {
	const { type, payload } = action;
	switch (type) {
		case ACTIONS.getMeals:
			return {
				...state,
				mealsData: [...state.mealsData, ...payload.meals],
			};
		case ACTIONS.updateError:
			return { ...state, error: payload.error };
		case ACTIONS.loadingData:
			return { ...state, isLoading: payload.loading };
		default:
			return state;
	}
}

function cartReducer(state, action) {
	const { type, payload } = action;
	switch (type) {
		case ACTIONS.addToCart: {
			const existingCartItemIndex = state.cartData.findIndex(
				(cart) => cart.id === payload.mealItem.id
			);
			const prevCartState = {
				...state,
				cartData: [...state.cartData],
			};

			if (existingCartItemIndex === -1) {
				prevCartState.cartData.push({ ...payload.mealItem, count: 1 });
				console.log(prevCartState);
			} else {
				prevCartState.cartData = prevCartState.cartData.map((cart) =>
					cart.id === payload.mealItem.id
						? { ...cart, count: cart.count + 1 }
						: cart
				);
				console.log(prevCartState);
			}
			prevCartState.totalPrice = prevCartState.cartData.reduce(
				(prevValue, currItem) => {
					return +(prevValue + currItem.price * currItem.count);
				},
				0
			);

			prevCartState.cartLength = prevCartState.cartData.reduce(
				(prevValue, currItem) => {
					return +(prevValue + currItem.count);
				},
				0
			);
			return prevCartState;
		}
		case ACTIONS.updateCartData: {
			// const existingCartItemIndex = state.cartData.findIndex(
			// 	(cart) => cart.id === payload.id
			// );
			// if (existingCartItemIndex === -1) {
			// 	return {
			// 		...state,
			// 		cartData: [
			// 			...state.cartData,
			// 			{ ...payload.mealItem, count: 1 },
			// 		],
			// 	};
			// } else {
			// 	return {
			// 		...state,
			// 		cartData: state.cartData.map((cart, _, cartArr) =>
			// 			cart.id === cartArr[existingCartItemIndex].id
			// 				? { ...cart, count: cart.count + 1 }
			// 				: cart
			// 		),
			// 	};
			// }

			return {
				...state,
				cartData: state.cartData
					.map((cart) => {
						if (cart.id === payload.id)
							return { ...cart, count: cart.count + payload.count };
						return cart;
					})
					.filter((cart) => cart.count !== 0),
			};
		}
		default:
			return state;
	}
}

export default function MealsProvider({ children }) {
	const [mealsState, mealsDispatch] = useReducer(
		mealsReducer,
		defaultMealsData
	);

	const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartData);

	const [isCartOpened, setIsCartOpened] = useState(false);

	useEffect(() => {
		const controller = new AbortController();
		async function fetchMeals() {
			mealsDispatch({ type: ACTIONS.loadingData, payload: { loading: true } });
			try {
				const data = await getMeals("Failed to get available meals data!🍽️", {
					signal: controller.signal,
				});
				mealsDispatch({ type: ACTIONS.getMeals, payload: { meals: data } });
				mealsDispatch({ type: ACTIONS.updateError, payload: { error: null } });
			} catch (err) {
				if (err.name !== "AbortError") {
					mealsDispatch({
						type: ACTIONS.updateError,
						payload: { error: err.message },
					});
				}
			} finally {
				mealsDispatch({
					type: ACTIONS.loadingData,
					payload: { loading: false },
				});
			}
		}

		if (mealsState.mealsData.length === 0) {
			fetchMeals();
		}

		return () => {
			controller.abort();
		};
	}, [mealsState.mealsData.length]);

	function updateError(errMsg = null) {
		mealsDispatch({ type: ACTIONS.updateError, payload: { error: errMsg } });
	}

	function addMealToCart(mealData) {
		cartDispatch({
			type: ACTIONS.addToCart,
			payload: { mealItem: { ...mealData } },
		});
	}

	function updateCartData(id, counter) {
		console.log("clicking");
		cartDispatch({
			type: ACTIONS.updateCartData,
			payload: { id, count: counter },
		});
	}

	function handleOpenCart() {
		setIsCartOpened(true);
	}

	function handleCloseCart() {
		setIsCartOpened(false);
	}

	const providerValue = {
		...mealsState,
		updateError,
		...cartState,
		addMealToCart,
		updateCartData,
		isCartOpened,
		handleOpenCart,
		handleCloseCart,
	};

	return (
		<MealsStore.Provider value={providerValue}>{children}</MealsStore.Provider>
	);
}

export function useMealsContext() {
	const mealsContext = useContext(MealsStore);
	if (mealsContext === undefined) {
		throw new Error("useMealsContext must be used within a <MealsProvider/> ");
	}

	return mealsContext;
}
