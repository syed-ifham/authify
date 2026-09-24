import {createContext, useEffect, useState} from "react";
import {AppConstants as APPConstants} from "../util/constants.js";
import axios from "axios";
import {toast} from "react-toastify";

const backendURL = APPConstants.BACKEND_URL;
axios.defaults.withCredentials = true;

export const AppContext = createContext();

export const AppContextProvider = (props) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  const getUserData = async () => {
    try {
      const response = await axios.get(`${backendURL}/profile`);
      if (response.status === 200 || response.status === 201 || response.data?.success) {
        setUserData(response.data?.userData || response.data?.user || response.data);
      } else {
        toast.error(response.data?.message || "Unable to get profile data.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Something went wrong.");
    }
  };

  const getAuthState = async () => {
    try {
      const response = await axios.get(`${backendURL}/is-authenticated`);
      if (response.status === 200 || response.data?.success) {
        setIsLoggedIn(true);
        getUserData();
      }
    } catch {
      // not logged in / session expired
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const contextValue = {
    backendURL,
    isLoggedIn, setIsLoggedIn,
    userData, setUserData,
    getUserData
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );

};
