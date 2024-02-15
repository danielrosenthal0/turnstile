import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './SignUp.module.css';
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [userType, setUserType] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const userTypeParam = new URLSearchParams(location.search).get('userType');
    if (userTypeParam) {
      setUserType(userTypeParam);
    }
  }, [location.search]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const data = { username, email, password, userType };
    try {
      await axios.post(apiUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      navigate('/confirm-sign-up');
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className={styles.authContainer}>
      <h1 className={styles.authTitle}>Sign Up</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <label htmlFor="userType">User Type</label>
        <select
          id="userType"
          name="userType"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
          required
        >
          <option value="">Select User Type</option>
          <option value="EmergingArtist">Emerging Artist</option>
          <option value="VerifiedArtist">Verified Artist</option>
        </select>
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