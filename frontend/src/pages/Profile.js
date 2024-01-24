import { useContext } from "react";
import { AuthContext } from "../services/AuthContext";
import styles from './Profile.module.css';

const getAccountLabel = (accountType) => {
  const typeLabels = {
    EmergingArtist: "Emerging Artist",
    VerifiedArtist: "Verified Artist"
  };

  return typeLabels[accountType] || accountType;
}

const Profile = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <div className={styles.content}>
      {user && (
        <div>
        <h2>Profile</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Account type: {getAccountLabel(user["custom:UserType"])}</p>
        </div>
      )}
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

export default Profile;