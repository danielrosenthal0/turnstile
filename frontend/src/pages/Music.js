import { useContext, useRef } from 'react';
import AWS from 'aws-sdk';
import { awsConfig } from '../services/awsConfig';
import styles from './Music.module.css';
import { AuthContext } from '../services/AuthContext';
import axios from 'axios';

AWS.config.update(awsConfig);

const Music = () => {
  const fileInputRef = useRef();
  const { user } = useContext(AuthContext);
  const handleFileUpload = async () => {
    const file = fileInputRef.current.files[0];

    

    try {
      const formData = new FormData();
      formData.append('username', user.username);
      formData.append('filename', file.name);
      formData.append('file', file);

      await fetch('https://wr18tiktg6.execute-api.us-east-1.amazonaws.com/dev/upload', {
        method: 'POST',
        body: formData,
      });

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