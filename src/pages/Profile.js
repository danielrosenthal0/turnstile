import { useContext } from "react";
import { AuthContext } from "../services/AuthContext";
import styles from './Profile.module.css';

const Profile = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <div className={styles.content}>
      {user && (
        <div>
        <h2>Profile</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        </div>
      )}
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

export default Profile;