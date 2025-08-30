// useAxiosSecure.jsx
import { useContext, useEffect } from "react";

import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext); 
  const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
    headers: { "Content-Type": "application/json" },
  });

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token"); // always latest token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosSecure.interceptors.request.eject(interceptor);
    };
  }, [user]);

  return axiosSecure;
};

export default useAxiosSecure;
