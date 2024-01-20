import { useState } from "react"
import { forgotPassword } from "../services/auth"
import { Link, useNavigate } from "react-router-dom"
import styles from './ForgotPassword.module.css';

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await forgotPassword(username);
      setSuccess(true);
      navigate('/reset-password');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className={styles.content}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      <Link to="/sign-in">Sign In</Link>
    </div>
  )
}

export default ForgotPassword;