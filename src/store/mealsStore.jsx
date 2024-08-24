/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect, useContext } from "react";
import { getMeals } from "../http/https";

const defaultMealsData = {
	mealsData: [],
	error: "",
	isLoading: false,
};

const defaultValue = {
	cartData: [],
	updateError: () => {},
	...defaultMealsData,
};

const ACTIONS = Object.freeze({
	getMeals: Symbol("get-meals"),
	loadingData: Symbol("loading-data"),
	updateError: Symbol("update-error"),
	addToCart: Symbol("add-to-cart"),
});

export const MealsStore = createContext(defaultValue);

function mealsReducer(state, action) {
	switch (action.type) {
		case ACTIONS.getMeals:
			return {
				...state,
				mealsData: [...state.mealsData, ...action.payload.meals],
			};
		case ACTIONS.updateError:
			return { ...state, error: action.payload.error };
		case ACTIONS.loadingData:
			return { ...state, isLoading: action.payload.loading };
		default:
			return state;
	}
}

export default function MealsProvider({ children }) {
	const [mealsState, mealsDispatch] = useReducer(
		mealsReducer,
		defaultMealsData
	);

	useEffect(() => {
		const controller = new AbortController();
		async function fetchMeals() {
			mealsDispatch({ type: ACTIONS.loadingData, payload: { loading: true } });
			try {
				const data = await getMeals("Failed to get available meals data!🍽️", {
					signal: controller.signal,
				});
				mealsDispatch({ type: ACTIONS.getMeals, payload: { meals: data } });
				mealsDispatch({ type: ACTIONS.updateError, payload: { error: "" } });
			} catch (err) {
				console.log(err.name);
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

	const providerValue = { ...mealsState, updateError };

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
