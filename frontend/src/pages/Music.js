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
  
    try {
      // Request a pre-signed URL
      const response = await axios.get(process.env.REACT_APP_GET_PRESIGNED_URL, {
        params: {
          name: `${user.username}_${file.name}`,
          type: file.type,
        },
      });
  
      const { url } = response.data;
  
      // Upload the file to S3 using the pre-signed URL
      await axios.put(url, file, {
        headers: {
          'Content-Type': file.type,
          'x-amz-acl': 'public-read',
        },
      });
  
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

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