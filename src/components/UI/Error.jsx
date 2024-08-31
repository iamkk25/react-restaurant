import styles from "./Error.module.scss";

/* eslint-disable react/prop-types */
function Error({ title, message, onConfirm }) {
	return (
		<div className={styles.error}>
			<h2 className={styles.errorTitle}>{title}</h2>
			<p className={styles.errorMessage}>{message}</p>
			{onConfirm && (
				<div className={styles.errorConfirmation}>
					<button type="button" onClick={onConfirm}>
						Okay
					</button>
				</div>
			)}
		</div>
	);
}

export default Error;
