import { useContext, useEffect, useState } from "react";
import { getCurrentUser, signOut } from "../services/auth";
import { AuthContext } from "../services/AuthContext";

const Profile = () => {
  const { user, signOut } = useContext(AuthContext);

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