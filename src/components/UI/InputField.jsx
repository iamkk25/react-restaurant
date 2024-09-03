import {useState} from "react";
import styles from "./InputField.module.scss";
import {isEmpty, validateEmail} from "../../utils/validation.js";

export default function InputField({id,label,errMsg,...props}) {
    const [value,setValue] = useState("");
    const [hasToched, setHasToched] = useState(false);
    let hasError = hasToched && isEmpty(value);

    if(props.type === 'email'){
        hasError = hasToched && !validateEmail(value);
    }

    console.log(value)
    console.log(hasError)

    function handleChange(e) {
        setValue(e.target.value);
    }

    function handleBlur(){
        setHasToched(true);
    }

    return <div className={styles.inputField}>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={props.name || id} {...props} value={value} onChange={handleChange} onBlur={handleBlur} />
        {hasError && (<p className={styles.error}>{errMsg}</p>)}
    </div>
}