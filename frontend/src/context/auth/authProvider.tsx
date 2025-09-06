import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./auth";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";
const IS_ADMIN_KEY = "isAdmin";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem(USERNAME_KEY)
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );
  const [isAdmin, setIsAdmin] = useState<boolean>(
    localStorage.getItem(IS_ADMIN_KEY) === 'true'
  );

  const login = (username: string, token: string, isAdmin: boolean = false) => {
    setUsername(username);
    setToken(token);
    setIsAdmin(isAdmin);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(IS_ADMIN_KEY, isAdmin.toString());
  };

  const logout = () => {
    setUsername(null);
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(IS_ADMIN_KEY);
  };

  const isAuth = !!token;

  return (
    <AuthContext.Provider value={{ username, token, isAdmin, login, logout, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
