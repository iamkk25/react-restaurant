import styles from './UserDetailsForm.module.scss'
import InputField from "./UI/InputField.jsx";
function UserDetailsForm({onClose}) {

    return <>
        <form className={styles.userDetailForm}>
            <InputField id={'fullname'}  label={'Full Name:'} type={'text'} required={true} placeholder={'Enter Your Name'} errMsg={'Enter a valid full name.'}/>
            <InputField id={'email'} label={'Email:'} type={'email'} required={true} placeholder={'test@test.com'} errMsg={'Enter a valid email.'}/>
            <InputField id={'street'} label={'Street:'} type={'text'} required={true} placeholder={'enter your street'} errMsg={'Enter a valid street.'}/>
            <InputField id={'city'} label={'City:'} type={'text'} required={true} placeholder={'city'} errMsg={'Enter a valid city.'}/>
            <InputField id={'postal-code'} label={'Postal Code:'} type={'text'} required={true} placeholder={'600001'} errMsg={'Enter a valid postal code.'}/>
            <div>
                <button onClick={onClose} type={"button"}>Close</button>
            </div>
        </form>
    </>;
}

export default UserDetailsForm;