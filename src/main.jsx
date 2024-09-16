import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import RestaurantProvider from "./store/restaurant.jsx";
import UserDetailsContextProvider from "./store/userDetails.jsx";
import UserProgressContextProvider from "./store/UserProgressStore.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<UserProgressContextProvider>
			<RestaurantProvider>
				<UserDetailsContextProvider>
					<App />
				</UserDetailsContextProvider>
			</RestaurantProvider>
		</UserProgressContextProvider>
	</StrictMode>
);
