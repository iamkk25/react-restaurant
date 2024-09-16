import { createContext, useContext, useReducer } from "react";
import { isEmpty, validateEmail } from "../utils/validation.js";
// import {isEmpty, validateEmail} from "../utils/validation.js";
//
const initialValue = {
	fullname: { value: "", didEdit: false, validValue: false, hasError: false },
	email: { value: "", didEdit: false, validValue: false, hasError: false },
	street: { value: "", didEdit: false, validValue: false, hasError: false },
	city: { value: "", didEdit: false, validValue: false, hasError: false },
	postalCode: { value: "", didEdit: false, validValue: false, hasError: false },
};

const initialContextValue = {
	...initialValue,
	handleInputBlur: () => {},
	handleInputChange: () => {},
	handleReset: () => {},
};

const UserDetails = createContext(initialContextValue);

function userDetailsReducer(state = initialValue, action) {
	switch (action.type) {
		case "update-fullname": {
			console.log("updating fullname");
			const prevState = { ...state };
			const value = action.payload?.value ?? prevState.fullname.value;
			const didEdit = action.payload?.didEdit || prevState.fullname.didEdit;
			const validValue = !isEmpty(value);
			prevState.fullname = {
				value,
				didEdit,
				validValue,
				hasError: didEdit && isEmpty(value),
			};
			return prevState;
		}
		case "update-email": {
			console.log("updating email");
			const prevState = { ...state };
			const value = action.payload?.value ?? prevState.email.value;
			const didEdit = action.payload?.didEdit || prevState.email.didEdit;
			const validValue = validateEmail(value);
			prevState.email = {
				value,
				didEdit,
				validValue,
				hasError: didEdit && !validateEmail(value),
			};
			return prevState;
		}
		case "update-street": {
			console.log("updating street");
			const prevState = { ...state };
			const value = action.payload?.value ?? prevState.street.value;
			const didEdit = action.payload?.didEdit || prevState.street.didEdit;
			const validValue = !isEmpty(value);
			prevState.street = {
				value,
				didEdit,
				validValue,
				hasError: didEdit && isEmpty(value),
			};
			return prevState;
		}
		case "update-city": {
			console.log("updating city");
			const prevState = { ...state };
			const value = action.payload?.value ?? prevState.city.value;
			const didEdit = action.payload?.didEdit ?? prevState.city.didEdit;
			const validValue = !isEmpty(value);
			prevState.city = {
				value,
				didEdit,
				validValue,
				hasError: didEdit && isEmpty(value),
			};
			return prevState;
		}
		case "update-postal-code": {
			console.log("updating postal-code");
			const prevState = { ...state };
			const value = action.payload?.value ?? prevState.postalCode.value;
			const didEdit = action.payload?.didEdit || prevState.postalCode.didEdit;
			const validValue = !isEmpty(value);
			prevState.postalCode = {
				value,
				didEdit,
				validValue,
				hasError: didEdit && isEmpty(value),
			};
			return prevState;
		}
		case "reset-form":
			return initialValue;
		default:
			return state;
	}
}

// eslint-disable-next-line react/prop-types
export default function UserDetailsContextProvider({ children }) {
	const [userDetails, dispatchUserDetails] = useReducer(
		userDetailsReducer,
		initialValue
	);

	function handleInputChange(fieldName, value) {
		dispatchUserDetails({ type: `update-${fieldName}`, payload: { value } });
		dispatchUserDetails({
			type: `update-${fieldName}`,
			payload: { didEdit: true },
		});
	}

	function handleInputBlur(fieldName, didEdit) {
		dispatchUserDetails({ type: `update-${fieldName}`, payload: { didEdit } });
	}

	function handleReset() {
		console.log("resetting form");
		dispatchUserDetails({ type: "reset-form" });
	}

	const providerValue = {
		...userDetails,
		handleInputChange,
		handleInputBlur,
		handleReset,
	};

	return (
		<UserDetails.Provider value={providerValue}>
			{children}
		</UserDetails.Provider>
	);
}

export function useUserDetails() {
	const context = useContext(UserDetails);
	if (!context) {
		throw new Error(
			"useUserDetails must be used within the <UserDetailsContextProvider/>!"
		);
	}
	return context;
}

// export function useUserDetails(validationFn, inputType) {
//     const [value, setValue] = useState("");
//     const [didEdit, setDidEdit] = useState(false);
//     let hasError = didEdit && validationFn(value);
//
//     if (inputType === 'email') {
//         hasError = didEdit && !validationFn(value);
//     }
//
//     function handleInputValue(value) {
//         setValue(value);
//     }
//
//     function handleBlur() {
//         setDidEdit(true);
//     }
//
//     return {value, didEdit, hasError, handleInputValue, handleBlur}
// }
