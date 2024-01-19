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
          <Link to="/profile">
            <div>Profile</div>
          </Link>
        </div>
      ) : (
        <div className={styles.pages}>
          <Link to="/sign-up">
            <div>Sign Up</div>
          </Link>
          <Link to="/sign-in">
            <div>Sign In</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
