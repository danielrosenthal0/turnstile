import { useRef, useContext } from 'react';
import { AuthContext } from '../services/AuthContext';
import axios from 'axios';
import styles from './Music.module.css';

const Music = () => {
  const fileInputRef = useRef();
  const { user } = useContext(AuthContext);

  const handleFileUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (!file) {
      console.error('No file selected');
      return;
    }
    if (!user || !user.username) {
      console.error('User not defined');
      return;
    }
    const data = new FormData();
    data.append('file', file);
    data.append('username', user.username);
    console.log(data);
  
    try {
      await axios.post(process.env.REACT_APP_UPLOAD_FILE_URL, data);
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  return (
    <div className={styles.content}>
      <h1>Music</h1>
      <h3>Upload your music here</h3>
      <input type="file" ref={fileInputRef} accept="audio/mpeg, audio/wav" />
      <button onClick={handleFileUpload}>Upload</button>
      <h2>Browse some of the most popular uploads</h2>
    </div>
  );
}

export default Music;