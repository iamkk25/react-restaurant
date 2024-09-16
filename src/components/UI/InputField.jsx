import styles from "./InputField.module.scss";
import { useUserDetails } from "../../store/userDetails.jsx";

export default function InputField({
	id,
	label,
	value,
	hasError,
	errMsg,
	...props
}) {
	const { handleInputChange, handleInputBlur } = useUserDetails();

	return (
		<div className={styles.inputField}>
            <label htmlFor={id}>{label}</label>

            <input
                {...props}
				id={id}
				name={props.name || id}
				value={value}
				onChange={(e) => props.onChange(e.target.name, e.target.value)}
				onBlur={(e) => props.onBlur(e.target.name, true)}
			/>
            {hasError && <p className={styles.error}>{errMsg}</p>}
		</div>
	);
}
