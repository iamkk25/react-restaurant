import styles from './UserDetailsForm.module.scss'
function UserDetailsForm({onClose}) {
    return <>
        <div className={styles.userDetailForm}>
            <div>user details form</div>
            <button onClick={onClose}>Cancel</button>
        </div>
    </>
}

export default UserDetailsForm;