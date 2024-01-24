import { useRef } from 'react';
import { S3 } from 'aws-sdk';
import AWS from 'aws-sdk';
import { awsConfig } from '../services/awsConfig';
import styles from './Music.module.css';

AWS.config.update(awsConfig);

const Music = () => {
  const fileInputRef = useRef();
  const s3 = new S3();

  const handleFileUpload = async () => {
    const file = fileInputRef.current.files[0];

    try {
      const params = {
        Bucket: 'turnstile-music',
        Key: `${Date.now()}_${file.name}`,
        Body: file,
        ACL: 'public-read',
      };

      await s3.upload(params).promise();
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