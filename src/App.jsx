import Cart from "./components/Cart/Cart";
import Header from "./components/Header";
import Meals from "./components/meals/Meals";
import { useRestaurantContext } from "./store/restaurant";

function App() {
	const { isCartOpened } = useRestaurantContext();

	return (
		<>
			<Header />
			{isCartOpened && <Cart />}
			<Meals />
		</>
	);
}

export default App;
