import React, { useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SignIn.module.css';
import { AuthContext } from '../services/AuthContext';
import axios from 'axios';

const SignIn = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const signInUrl = process.env.REACT_APP_SIGN_IN_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = { username, password };
    try {
      const response = await axios.post(signInUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const { user } = response.data;

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/profile');
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.error.code === 'UserNotConfirmedException') {
        navigate('/confirm-sign-up');
      } else {
        setError(error.message);
      }
    }
  }

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.authTitle}>Sign In</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <button type="submit">Sign in</button>
      </form>
      {error && <p>{error}</p>}
      <div className={styles.switchButton}> 
      <button onClick={() => navigate('/forgot-password')}>Forgot your password?</button></div>
      {/* <Link to='/forgot-password' className={styles.switchButton}>Forgot your password?</Link> */}
      <div className={styles.switchButton}>
        Don't have an account?
        <button onClick={() => navigate('/sign-up')}>Sign Up</button>
      </div>
    </div>
  );
};

export default SignIn;