import {createContext, useEffect, useState} from "react";
import {AppConstants as APPConstants} from "../util/constants.js";
import axios from "axios";
import {toast} from "react-toastify";

const backendURL = APPConstants.BACKEND_URL;
axios.defaults.withCredentials = true;

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const response = await axios.get(`${backendURL}/profile`);
      if (response.status === 200 || response.data?.success) {
        const user = response.data?.userData || response.data?.user || response.data;
        setUserData(user);
        return user;
      }
    } catch (error) {
      // Avoid showing error toast if it's a simple 401 unauthenticated response
      if (error.response?.status !== 401) {
        toast.error(error.response?.data?.message || "Failed to fetch user profile.");
      }
    }
  };

  const getAuthState = async () => {
    try {
      const response = await axios.get(`${backendURL}/is-authenticated`);
      if (response.status === 200 || response.data === true) {
        setIsLoggedIn(true);
        await getUserData();
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    } catch {
      setIsLoggedIn(false);
      setUserData(null);
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const contextValue = {
    backendURL,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    getAuthState,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};