import Cart from "./components/Cart/Cart";
import CheckoutForm from "./components/CheckoutForm";
import Header from "./components/Header";
import Meals from "./components/meals/Meals";
import OrderSummary from "./components/OrderSummary";

import { useUserProgress } from "./store/UserProgressStore";

function App() {
	const { progress } = useUserProgress();

	console.log(progress);

	return (
		<>
			<Header />
			<Meals />
			{progress === "cart" && <Cart />}
			{progress === "checkout" && <CheckoutForm />}
			{progress === "ordered" && <OrderSummary />}
		</>
	);
}

export default App;
