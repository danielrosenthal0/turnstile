import styles from './Music.module.css';

const Music = () => {
  return (
    <div className={styles.content}>
      <h1>Music</h1>
      <h3>Upload your music here</h3>
      <button>Select an audio file</button>
      <h2>Browse some of the most popular uploads</h2>

    </div>
  )
}

export default Music;