import { useMealsContext } from "../store/mealsStore";
import styles from "./Header.module.scss";

import appLogo from "/logo.jpg";

function Header() {
	const { handleOpenCart } = useMealsContext();
	return (
		<header>
			<div className={styles.title}>
				<img src={appLogo} alt="react restaurant" />
				<h1>Lost Fox Inn</h1>
			</div>
			<nav>
				<button className={styles.cartBtn} onClick={handleOpenCart}>
					Cart (0)
				</button>
			</nav>
		</header>
	);
}

export default Header;
