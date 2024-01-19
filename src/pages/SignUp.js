import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SignUp.module.css';

const SignUp = () => {
  return (
    <div className={styles.authContainer}>
      <h1 className={styles.authTitle}>Sign Up</h1>

      <Link to="/sign-in" className={styles.switchButton}>
        Already have an account? Sign In
      </Link>
    </div>
  );
};

export default SignUp;