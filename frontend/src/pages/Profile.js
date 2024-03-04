import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../services/AuthContext";
// import { S3 } from "aws-sdk";
import axios from "axios";
import styles from './Profile.module.css';
import AudioWaveForm from "../components/AudioWaveForm";
import { useNavigate } from "react-router-dom";

const getAccountLabel = (accountType) => {
  const typeLabels = {
    EmergingArtist: "Emerging Artist",
    VerifiedArtist: "Verified Artist"
  };

  return typeLabels[accountType] || accountType;
}

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userFiles, setUserFiles] = useState([]);
  const navigate = useNavigate();

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

  const signOut = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_SIGN_OUT_URL}`);
      localStorage.removeItem('user');
      navigate('/sign-in');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <div className={styles.content}>
      {user && (
        <div>
          <h2>Profile</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Account type: {getAccountLabel(user.userType)}</p>
          <h3>Uploaded music</h3>
          {userFiles && userFiles.length > 0 ? (
            <ul>
              {userFiles.map((file, index) => (
                <li key={index}>
                  {file.split("/").pop()}
                  <AudioWaveForm
                    audioUrl={`https://s3.amazonaws.com/turnstile-music/${file}`}
                  />
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