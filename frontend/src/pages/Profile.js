import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../services/AuthContext";
// import { S3 } from "aws-sdk";
import axios from "axios";
import styles from "./Profile.module.css";
import AudioWaveForm from "../components/AudioWaveForm";

const getAccountLabel = (accountType) => {
  const typeLabels = {
    EmergingArtist: "Emerging Artist",
    VerifiedArtist: "Verified Artist",
  };

  return typeLabels[accountType] || accountType;
};

const Profile = () => {
  const { user, signOut } = useContext(AuthContext);
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchUserFiles = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_FETCH_FILES_URL}?username=${user.username}`
          );
          setUserFiles(response.data.files);
        } catch (error) {
          console.error("Error fetching user files:", error);
        }
      };

      fetchUserFiles();
    }
  }, [user]);

  return (
    <div className={styles.content}>
      {user && (
        <div className={styles.profileHeader}>
          <div className={styles.title}>
            <span className={styles.titleText}>{user.username}</span>
          </div>
          <p className={styles.accountType}>{getAccountLabel(user.userType)}</p>
        </div>
      )}
      <h3 className={styles.musicTitle}>Uploaded music</h3>
      <div className={styles.musicList}>
        {userFiles && userFiles.length > 0 ? (
          userFiles.map((file, index) => (
            <div key={index} className={styles.musicItem}>
              <p className={styles.musicName}>{file.split("/").pop()}</p>
              <AudioWaveForm
                audioUrl={`https://s3.amazonaws.com/turnstile-music/${file}`}
              />
            </div>
          ))
        ) : (
          <p className={styles.noMusic}>No uploaded music</p>
        )}
      </div>
      <button className={styles.signOutButton} onClick={signOut}>Sign out</button>
    </div>
  );
};

export default Profile;
