/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const UserProgressContext = createContext({
	progress: "",
	handleCloseProgress: () => {},
	handleOpenCart: () => {},
	handleOpenCheckout: () => {},
	handleOpenSummary: () => {},
});

export function useUserProgress() {
	const context = useContext(UserProgressContext);
	if (!context) {
		throw new Error(
			"useUserProgress must be used within the <UserProgressContextProvider/>!"
		);
	}
	return context;
}

export default function UserProgressContextProvider({ children }) {
	const [progress, setProgress] = useState("");

	function handleCloseProgress() {
		setProgress("");
	}

	function handleOpenCart() {
		setProgress("cart");
		console.log("calling...");
	}

	function handleOpenCheckout() {
		setProgress("checkout");
		console.log("opening checkout...");
	}

	function handleOpenSummary() {
		setProgress("ordered");
	}

	const progressContext = {
		progress,
		handleCloseProgress,
		handleOpenCart,
		handleOpenCheckout,
		handleOpenSummary,
	};

	return (
		<UserProgressContext.Provider value={progressContext}>
			{children}
		</UserProgressContext.Provider>
	);
}
