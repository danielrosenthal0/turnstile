import { useEffect, useState } from "react";
import { getCurrentUser, signOut } from "../services/auth";

const Profile = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, []);

  return (
    <div>
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