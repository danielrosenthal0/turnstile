import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.content}>
      <h2>Loading...</h2>
      {/* Add any loading animation or spinner here */}
    </div>
  );
};

export default Loading;
