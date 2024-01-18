import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.content}>
      <p className={styles.title}>Turnstile</p>
      <p className={styles.subtitle}>Connecting producers, artists, and DJ's</p>
    </div>
  );
};

export default Home;
