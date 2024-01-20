import { useState } from "react";
import { confirmSignUp, resendConfirmationCode } from "../services/auth";
import styles from './ConfirmSignUp.module.css';

const ConfirmSignUp = () => {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await confirmSignUp(username, code);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  }

  const handleResendCode = async (e) => {
    setError('');

    try {
      await resendConfirmationCode(username);
      setSuccess(false);
      setError('Confirmation code resent. Check your email.');
    } catch (error) {
      setError(error.message);
    }
  }

  if (success) {
    return (
      <div className={styles.content}>
        <h2>Confirmation successful</h2>
        <p>You can now log in</p>
      </div>
    )
  }

  return (
    <div className={styles.content}>
      <h2>Confirm sign up</h2>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <input 
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="text"
          placeholder="Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit">Confirm</button>
      </form>
      <button onClick={handleResendCode}>Resend Confirmation Code</button>
      {error && <p>{error}</p>}
    </div>
  )
}

export default ConfirmSignUp;