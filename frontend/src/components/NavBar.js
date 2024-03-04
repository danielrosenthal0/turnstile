import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { AuthContext } from "../services/AuthContext";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.content}>
      <Link to="/">
        <p className={styles.logo}>T</p>
      </Link>

      {user ? (
        <div className={styles.pages}>
          <Link to="/music">
            <div className={styles.link}>
              <span className={styles.linkText}>Upload Music</span>
            </div>
          </Link>
          <Link to="/profile">
            <div className={styles.link}>
              <span className={styles.linkText}>Profile</span>
            </div>
          </Link>
        </div>
      ) : (
        <div className={styles.pages}>
          <Link to="/sign-up">
            <div className={styles.link}>
              <span className={styles.linkText}>Sign Up</span>
            </div>
          </Link>
          <Link to="/sign-in">
            <div className={styles.link}>
              <span className={styles.linkText}>Sign In</span>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
