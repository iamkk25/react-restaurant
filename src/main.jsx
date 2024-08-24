import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import MealsProvider from "./store/mealsStore";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<MealsProvider>
			<App />
		</MealsProvider>
	</StrictMode>
);
