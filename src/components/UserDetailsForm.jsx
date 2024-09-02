import styles from './UserDetailsForm.module.scss'
function UserDetailsForm({onClose}) {

    return <>
        <form className={styles.userDetailForm}>
            <div className={styles.inputField}>
                <label htmlFor="fullname">Full Name:</label>
                <input type="text" id="fullname" name="fullname" placeholder="Full Name" required/>
            </div>
            <div className={styles.inputField}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="test@test.com" required/>
            </div>
            <div className={styles.inputField}>
                <label htmlFor="street">Street:</label>
                <input type="text" id="street" name="street" placeholder="enter your street" required/>
            </div>
            <div className={styles.inputField}>
                <label htmlFor="city">City:</label>
                <input type="text" id="city" name="city" placeholder="city" required/>
            </div>
            <div className={styles.inputField}>
                <label htmlFor="postal-code">Postal Code:</label>
                <input type="text" id="postal-code" name="postal-code" placeholder="600001" required/>
            </div>
            <div>
                <button onClick={onClose} type={"button"}>Close</button>
            </div>
        </form>
    </>;
}

export default UserDetailsForm;