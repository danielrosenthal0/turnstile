import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.content}>
      <div className={styles.titleContent}>
        <div className={styles.title}>Turnstile</div>
        <div className={styles.subtitle}>
          Connecting producers, artists, and DJ's
        </div>
      </div>
      <div className={styles.intro}>
        <div>Welcome to the internet's best place to get discovered</div>
      </div>
      <div className={styles.areYou}>
        <h3>Are you...</h3>
        <div className={styles.circles}>
          <Link to="/sign-up?userType=EmergingArtist">
            <div className={styles.circle}>
              <p>Someone who wants to be noticed?</p>
            </div>
          </Link>

          <h3>or...</h3>
          <Link to="/sign-up?userType=VerifiedArtist">
            <div className={styles.circle}>
              <p>Looking for music to be submitted?</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
