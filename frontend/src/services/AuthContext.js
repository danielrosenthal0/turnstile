import { createContext, useEffect, useState } from "react";
import * as auth from "./auth";
// import axios from "axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
    setIsLoading(false);
  }, []);

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
    localStorage.removeItem('user');
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
