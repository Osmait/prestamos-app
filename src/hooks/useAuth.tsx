import { userSingUp } from "@/interface/userSignip";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Cookie from "js-cookie";

type Props = {
  children: JSX.Element;
};

const AuthContext = createContext<any>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<userSingUp | null>(null);

  useEffect(() => {
    const token = Cookie.get("token");
    if (!token) {
      return;
    }

    const config = {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const getProfile = async () => {
        const { data: user } = await axios.get(
          "http://localhost:8080/user/profile",
          config
        );
        setUser(user);
      };
      getProfile();
    } catch (error) {
      console.log(" hay un fallo");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export default useAuth;
