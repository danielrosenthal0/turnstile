import { useState } from "react";
import styles from './ConfirmSignUp.module.css';
import { Link } from "react-router-dom";
import axios from "axios";

const ConfirmSignUp = () => {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const confirmUrl = process.env.REACT_APP_CONFIRM_SIGN_UP_URL;
  const resendUrl = process.env.REACT_APP_RESEND_CONFIRMATION_CODE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = { username, code };
    try {
      await axios.post(confirmUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  }

  const handleResendCode = async (e) => {
    e.preventDefault();
    setError('');
    const data = { username };
    try {
      await axios.post(resendUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
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
        <p>You can now sign in</p>
        <Link to="/sign-in">Sign in</Link>
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