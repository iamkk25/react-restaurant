import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import RestaurantProvider from "./store/restaurant.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RestaurantProvider>
			<App />
		</RestaurantProvider>
	</StrictMode>
);
