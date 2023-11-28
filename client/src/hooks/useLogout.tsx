import axios from "@/api/axios";
import useAuth from "./useAuth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      setIsLoading(true);
      const response = await axios("/api/auth/logout", { withCredentials: true });
      setIsLoading(false);
      setAuth({});
      navigate("/")
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return [logout, isLoading] as const;
};

export default useLogout;
