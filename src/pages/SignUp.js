import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.css';
import { signUp } from '../services/auth';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log('Signing up with', email, password);
    try {
      await signUp(username, email, password);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }

    if (success) {
      return (
        <div>
          <h2>Sign up successful</h2>
          <p>Check your email for the confirmation code</p>
        </div>
      )
    }
  }
  return (
    <div className={styles.authContainer}>
      <h1 className={styles.authTitle}>Sign Up</h1>
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Sign up</button>
      </form>
      {error && <p>{error}</p>}
      <Link to="/sign-in" className={styles.switchButton}>
        Already have an account? Sign In
      </Link>
    </div>
  );
};

export default SignUp;