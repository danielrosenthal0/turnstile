import { useRef } from 'react';
import styles from './Music.module.css';

const Music = () => {
  const fileInputRef = useRef();

  const handleFileUpload = async () => {
    const file = fileInputRef.current.files[0];

    try {
      const key = `${Date.now()}_${file.name}`;
      await Storage.put(key, file, { level: 'public'});
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  return (
    <div className={styles.content}>
      <h1>Music</h1>
      <h3>Upload your music here</h3>
      <input type="file" ref={fileInputRef}/>
      <button onClick={handleFileUpload}>Upload</button>
      <h2>Browse some of the most popular uploads</h2>

    </div>
  )
}

export default Music;