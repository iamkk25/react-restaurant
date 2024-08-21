import styles from "./Header.module.scss";

import appLogo from "/logo.jpg";

function Header() {
	return (
		<header>
			<div className={styles.title}>
				<img src={appLogo} alt="react restaurant" />
				<h1>Lost Fox Inn</h1>
			</div>
			<nav>
				<button className={styles.cartBtn}>Cart (0)</button>
			</nav>
		</header>
	);
}

export default Header;
