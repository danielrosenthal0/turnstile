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
          <div className={styles.circle}>
            <p>Someone who wants to be noticed?</p>
          </div>
          <h3>or...</h3>
          <div className={styles.circle}>
            <p>Looking for music to be submitted?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
