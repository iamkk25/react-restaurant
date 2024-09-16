import { useRestaurantContext } from "../store/restaurant";
import { useUserProgress } from "../store/UserProgressStore";
import styles from "./Header.module.scss";

import appLogo from "/logo.jpg";

function Header() {
	const { cartData } = useRestaurantContext();
	const { handleOpenCart } = useUserProgress();

	const cartLength = cartData.reduce(
		(totalCartLength, cart) => totalCartLength + cart.count,
		0
	);
	return (
		<header>
			<div className={styles.title}>
				<img src={appLogo} alt="react restaurant" />
				<h1>Lost Fox Inn</h1>
			</div>
			<nav>
				<button className={styles.cartBtn} onClick={handleOpenCart}>
					Cart ({cartLength})
				</button>
			</nav>
		</header>
	);
}

export default Header;
