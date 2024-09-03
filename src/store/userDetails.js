import {createContext, useContext, useReducer} from "react";
import {isEmpty, validateEmail} from "../utils/validation.js";
// import {isEmpty, validateEmail} from "../utils/validation.js";
//
const initialValue = {
    fullname: {value: "", didEdit: false, hasError: false},
    email: {value: "", didEdit: false, hasError: false},
    street: {value: "", didEdit: false, hasError: false},
    city: {value: "", didEdit: false, hasError: false},
    postalCode: {value: "", didEdit: false, hasError: false},
};

const UserDetails = createContext(initialValue);

function userDetailsReducer(state = initialValue, action) {
    switch (action.type) {
        case 'update-fullname':{
            const prevState = {...state};
            const updatedFullname = {
                value: action.payload.value,
                didEdit: action.payload?.didEdit || prevState.fullname.didEdit,
                hasError: this.didEdit && isEmpty(action.payload.value),
            };
            prevState.fullname = updatedFullname;
            return prevState;
        }
        case 'update-email':{
            const prevState = {...state};
            const updatedEmail = {
                value: action.payload.value,
                didEdit: action.payload?.didEdit || prevState.email.didEdit,
                hasError: this.didEdit && !validateEmail(action.payload.value),
            };
            prevState.email = updatedEmail;
            return prevState;
        }
        case 'update-street':{

            const prevState = {...state};
            const updatedStreet = {
                value: action.payload.value,
                didEdit: action.payload?.didEdit || prevState.street.didEdit,
                hasError: this.didEdit && isEmpty(action.payload.value),
            };
            prevState.street = updatedStreet;
            return prevState;
        }
        case 'update-city': {

            const prevState = {...state};
            const updatedCity = {
                value: action.payload.value,
                didEdit: action.payload?.didEdit || prevState.city.didEdit,
                hasError: this.didEdit && isEmpty(action.payload.value),
            };
            prevState.city = updatedCity;
            return prevState;
        }
        case 'update-postal-code': {

            const prevState = {...state};
            const updatedPostalCode = {
                value: action.payload.value,
                didEdit: action.payload?.didEdit || prevState.postalCode.didEdit,
                hasError: this.didEdit && isEmpty(action.payload.value),
            };
            prevState.postalCode = updatedPostalCode;
            return prevState;
        }
        default:
            return state;
    }
}

// eslint-disable-next-line react/prop-types
export default function UserDetailsContextProvider({children}) {
    const [userDetails, dispatchUserDetails] = useReducer(userDetailsReducer, initialValue);

    function handleInputChange(fieldName, value) {
        dispatchUserDetails({type: `update-${fieldName}`, payload: {value}})
    }

    function handleInputBlur(fieldName, didEdit) {
        dispatchUserDetails({type: `update-${fieldName}`, payload: {didEdit}})
    }

    const providerValue = {
        userDetails,
        handleInputChange,
        handleInputBlur,
    }

    return <UserDetails {...providerValue}>{children}</UserDetails>;
}

export function useUserDetails() {
    const context = useContext(UserDetails);
    if (!context) {
        throw new Error("useUserDetails must be used within the <UserDetailsContextProvider/>!");
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