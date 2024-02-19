import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../services/AuthContext";
import { S3 } from "aws-sdk";
import styles from './Profile.module.css';
import AudioWaveForm from "../components/AudioWaveForm";

const getAccountLabel = (accountType) => {
  const typeLabels = {
    EmergingArtist: "Emerging Artist",
    VerifiedArtist: "Verified Artist"
  };

  return typeLabels[accountType] || accountType;
}

const Profile = () => {
  const { user, signOut } = useContext(AuthContext);
  const [userFiles, setUserFiles] = useState([]);

  useEffect(() => {
    if (user) {
      const s3 = new S3();

      const params = {
        Bucket: 'turnstile-music',
        Prefix: `${user.username}_`,
      };

      s3.listObjectsV2(params, (error, data) => {
        if (error) {
          console.error('Error listing user files:', error);
        } else {
          const files = data.Contents.map(item => item.Key);
          setUserFiles(files);
        }
      })
    }
  }, [user]);

  return (
    <div className={styles.content}>
      {user && (
        <div>
          <h2>Profile</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Account type: {getAccountLabel(user.userType)}</p>
          <h3>Uploaded music</h3>
          {userFiles.length > 0 ? (
            <ul>
              {userFiles.map((file, index) => (
                <li key={index}>
                  {file.split("/").pop()}
                  {/* <AudioWaveForm
                    audioUrl={`https://s3.amazonaws.com/turnstile-music/${file}`}
                  /> */}
                </li>
              ))}
            </ul>
          ) : (
            <p>No uploaded music</p>
          )}
        </div>
      )}
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default Profile;