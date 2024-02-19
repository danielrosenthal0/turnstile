import { createContext, useEffect, useState } from "react";
import * as auth from "./auth";
// import axios from "axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentUserUrl = process.env.REACT_APP_GET_CURRENT_USER_URL;
  

  const getCurrentUser = async () => {
    try {
      const user = await auth.getCurrentUser();
      setUser(user);
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  useEffect(() => {
    getCurrentUser()
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, []);

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
  }

  const authValue = {
    user,
    isLoading,
    signOut,
    setUser,
  }

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext };
