import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={styles.content}>
      <Link to="/">
        <p className={styles.logo}>T</p>
      </Link>
      <div className={styles.pages}>
        <Link to="/sign-up">
          <div>Sign Up</div>
        </Link>
        <Link to="/sign-in">
          <div>Sign In</div>
        </Link>
        <Link to="/profile">
          <div>Profile</div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
