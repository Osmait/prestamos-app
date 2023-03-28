import { userSingUp } from "@/interface/userSignip";
import { loginApi } from "@/pages/api/login";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";

type Props = {
  children: JSX.Element;
};

const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<userSingUp | null>(null);

  const singIn = async (data: any) => {
    const token = await loginApi(data);

    Cookie.set("token", token, { expires: 5 });
    axios.defaults.headers.Authorization = `Bearer ${token}`;

    const { data: user } = await axios.get(
      "http://localhost:8080/user/profile"
    );

    setUser(user);
  };

  useEffect(() => {
    const token = Cookie.get("token");
    axios.defaults.headers.Authorization = `Bearer ${token}`;
    const getProfile = async () => {
      const { data: user } = await axios.get(
        "http://localhost:8080/user/profile"
      );
      setUser(user);
    };
    getProfile();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        singIn,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
