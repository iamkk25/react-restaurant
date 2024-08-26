import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.scss";

function Modal({ open, children, onClose }) {
	const [modalIsActive, setModalIsActive] = useState(false);
	const dialogRef = useRef(null);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (open) {
			dialog.showModal();
			setModalIsActive(true);
		} else {
			dialog.close();
			setModalIsActive(false);
		}
	}, [open]);

	useEffect(() => {
		if (modalIsActive) {
			document.body.classList.add(styles.noScroll);
		} else {
			document.body.classList.remove(styles.noScroll);
		}
		return () => {
			document.body.classList.remove(styles.noScroll);
		};
	}, [modalIsActive]);

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
