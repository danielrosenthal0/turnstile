import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    console.log('Signing up with', email, password)
  }
  return (
    <div className={styles.authContainer}>
      <h1 className={styles.authTitle}>Sign Up</h1>
      <form className={styles.formContainer} onSubmit={handleSignUp}>
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
      <Link to="/sign-in" className={styles.switchButton}>
        Already have an account? Sign In
      </Link>
    </div>
  );
};

export default SignUp;