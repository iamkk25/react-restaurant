import { useReducer } from "react";
import { ACTIONS } from "../utils/actions.js";

export const defaultCartData = {
	cartData: [],
};

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
			} else {
				prevCartState.cartData = prevCartState.cartData.map((cart) =>
					cart.id === payload.mealItem.id
						? { ...cart, count: cart.count + 1 }
						: cart
				);
				console.log(prevCartState);
			}
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

			return prevCartState;
		}
		case ACTIONS.resetCart:
			return defaultCartData;
		default:
			return state;
	}
}

export function useCartStore() {
	const [cartState, cartDispatch] = useReducer(cartReducer, defaultCartData);

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

	function resetCart() {
		cartDispatch({ type: ACTIONS.resetCart })
	}



	return {
		...cartState,
		addMealToCart,
		updateCartData,
		resetCart
	};
}
