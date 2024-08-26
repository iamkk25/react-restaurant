import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.scss";

function Modal({ open, children, onClose }) {
	const dialogRef = useRef(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (open) {
			dialog.showModal();
			document.body.classList.add(styles.noScroll);
		} else {
			dialog.close();
			document.body.classList.remove(styles.noScroll);
		}

		return () => {
			dialog.close();
			console.log("modal closing");
			document.body.classList.remove(styles.noScroll);
		};
	}, [open]);

	const modal = (
		<dialog
			className={styles.modal}
			ref={dialogRef}
			onClose={() => {
				onClose();
			}}
		>
			{open ? children : null}
		</dialog>
	);

	return createPortal(modal, document.getElementById("modal"));
}

export default Modal;
