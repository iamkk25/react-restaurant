import {
	useReducer,
	useEffect,
} from "react";

import { getMeals } from "../http/https";
import { ACTIONS } from "../utils/actions.js";

export const defaultMealsData = {
	mealsData: [],
	error: "",
	isLoading: false,
};

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

export function useMeals() {
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

	return { ...mealsState, updateError }
}
