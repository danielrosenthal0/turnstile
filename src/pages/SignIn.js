import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SignIn.module.css';

const SignIn = () => {
  return (
    <div className={styles.authContainer}>
      <h1 className={styles.authTitle}>Sign In</h1>

      <Link to="/sign-up" className={styles.switchButton}>
        Don't have an account? Sign Up
      </Link>
    </div>
  );
};

export default SignIn;