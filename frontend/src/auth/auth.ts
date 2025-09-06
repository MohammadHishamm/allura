import { createContext, useContext } from "react";

interface authContextType {
  username: string | null;
  token: string | null;
  isAdmin: boolean;
  login: (username: string, token: string, isAdmin?: boolean) => void;
  isAuth: boolean;
  logout: () => void;
}

export const AuthContext = createContext<authContextType>({
  username: null,
  token: null,
  isAdmin: false,
  login: () => {},
  isAuth: false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);
