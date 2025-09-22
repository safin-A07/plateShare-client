import { useContext, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
  baseURL: "https://plate-share-server-omega.vercel.app",
  headers: { "Content-Type": "application/json" },
});

const useAxiosSecure = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const auth = getAuth();
        const currentUser = auth.currentUser;

        if (currentUser) {
          
          const token = await currentUser.getIdToken();
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
