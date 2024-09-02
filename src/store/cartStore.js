import { useState, useReducer } from "react";

import { createContext } from "react";
import { ACTIONS } from "../utils/actions.js";

export const defaultCartData = {
	cartData: [],
	totalPrice: 0,
	cartLength: 0,
	isCartOpened: false,
};

export const CartContext = createContext(defaultCartData);

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
			const prevCartState = { ...state, cartData: [...state.cartData] };
			const existingCartItemIndex = prevCartState.cartData.findIndex(
				(cart) => cart.id === payload.id
			);

			if (existingCartItemIndex === -1) {
				return prevCartState;
			}

			prevCartState.cartData = prevCartState.cartData
				.map((cart) => {
					if (cart.id === payload.id)
						return { ...cart, count: cart.count + payload.count };
					return cart;
				})
				.filter((cart) => cart.count !== 0);

			prevCartState.cartLength = prevCartState.cartData.reduce(
				(prevLength, currItem) => +(prevLength + currItem.count),
				0
			);
			prevCartState.totalPrice = prevCartState.cartData.reduce(
				(prevPrice, currItem) => {
					return +(prevPrice + currItem.price * currItem.count);
				},
				0
			);

			return prevCartState;
		}
		default:
			return state;
	}
}

export function useCart() {
	const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartData);

	const [isCartOpened, setIsCartOpened] = useState(false);

	function addMealToCart(mealData) {
		cartDispatch({
			type: ACTIONS.addToCart,
			payload: { mealItem: { ...mealData } },
		});
	}

	function updateCartData(id, counter) {
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

	return {
		...cartState,
		totalPrice: parseFloat(cartState.totalPrice).toFixed(2),
		isCartOpened,
		addMealToCart,
		updateCartData,
		handleOpenCart,
		handleCloseCart,
	};
}
