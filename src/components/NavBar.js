import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={styles.content}>
      <Link to="/">
        <p className={styles.logo}>T</p>
      </Link>
      <Link to="/sign-up"><div>Sign Up</div></Link>
      <Link to="/sign-in"><div>Sign In</div></Link>
    </div>
  );
};

export default NavBar;
