import React, { useContext, useState} from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import styles from './SignIn.module.css';
import { AuthContext } from '../services/AuthContext';
import axios from 'axios';

const SignIn = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);

  const signInUrl = process.env.REACT_APP_SIGN_IN_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const data = { username, password };
    // console.log(data);
    try {
      const response = await axios.post(signInUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const { user } = response.data;
      // console.log(user);
      setUser(user);
    } catch (error) {
      if (error.code === "UserNotConfirmedException") {
        navigate('/confirm-sign-up');
      } else {
        setError(error.message);
      }
    }
  }

  if (user) {
    return <Navigate to='/profile'/>
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
      <Link to='/forgot-password' className={styles.switchButton}>Forgot your password?</Link>
      <Link to="/sign-up" className={styles.switchButton}>
        Don't have an account? Sign Up
      </Link>
    </div>
  );
};

export default SignIn;