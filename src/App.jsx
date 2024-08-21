import Error from "./components/Error";
import Header from "./components/Header";
import Meals from "./components/meals/Meals";
import Modal from "./components/UI/Modal";

function App() {
	return (
		<>
			<Modal open={true}>
				<Error
					title="An error occured!"
					message="Failed to fetch data"
					onConfirm={true}
				/>
			</Modal>
			<Header />
			<Meals />
		</>
	);
}

export default App;
