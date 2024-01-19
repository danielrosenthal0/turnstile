import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.content}>
      <div className={styles.title}>Turnstile</div>
      <div className={styles.subtitle}>Connecting producers, artists, and DJ's</div>
    </div>
  );
};

export default Home;
