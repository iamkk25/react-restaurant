import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import styles from "./Modal.module.scss";

function Modal({ open, children, onClose }) {
	const dialogRef = useRef(null);

	useEffect(() => {
		if (open) {
			dialogRef.current.showModal();
		} else {
			dialogRef.current.close();
		}
	}, [open]);

	const modal = (
		<dialog className={styles.modal} ref={dialogRef} onClose={onClose}>
			{open ? children : null}
		</dialog>
	);

	return createPortal(modal, document.getElementById("modal"));
}

export default Modal;
