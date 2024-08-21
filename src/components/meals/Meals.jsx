import useFetch from "../../hooks/useFetch";

function Meals() {
	const {
		data: meals,
		isFetching,
		error,
	} = useFetch("Failed to get meals data!🍽️");

	console.log({ meals, isFetching, error });

	return <div className="meals"></div>;
}

export default Meals;
