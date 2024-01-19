import React, { useContext, useState} from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from './SignIn.module.css';
import { signIn } from '../services/auth';
import { AuthContext } from '../services/AuthContext';

const SignIn = () => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const { user, signIn } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log('Signing in with', password);
    try {
      await signIn(username, password);
   
    } catch (error) {
      setError(error.message);
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
      <Link to="/sign-up" className={styles.switchButton}>
        Don't have an account? Sign Up
      </Link>
    </div>
  );
};

export default SignIn;