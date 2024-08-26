import Cart from "./components/Cart/Cart";
import Header from "./components/Header";
import Meals from "./components/meals/Meals";
import { useMealsContext } from "./store/mealsStore";

function App() {
	const { isCartOpened } = useMealsContext();

	return (
		<>
			<Header />
			{isCartOpened && <Cart />}
			<Meals />
		</>
	);
}

export default App;
