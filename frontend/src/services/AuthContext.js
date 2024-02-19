import { createContext, useEffect, useState } from "react";
import * as auth from "./auth";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentUserUrl = process.env.REACT_APP_GET_CURRENT_USER_URL;
  const signInUrl = process.env.REACT_APP_SIGN_IN_URL;

  const getCurrentUser = async () => {
    try {
      const user = await auth.getCurrentUser();
      // const user = await axios.post(currentUserUrl, {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   }
      // }); //replace w api call
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

  const signIn = async (username, password) => {
    const data = { username, password };
    // debugger;
    await auth.signIn(username, password); //replace w api call
    // await axios.post(signInUrl, data, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // });
    await getCurrentUser();
  }

  const signOut = async () => {
    await auth.signOut();
    setUser(null);
  }

  const authValue = {
    user,
    isLoading,
    signIn,
    signOut,
    setUser,
  }

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext };
