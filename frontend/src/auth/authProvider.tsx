import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "../auth/auth";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";
// Deprecated: do not persist admin flag; derive from adminToken instead
const IS_ADMIN_KEY = "isAdmin";
const ADMIN_TOKEN_KEY = "adminToken";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem(USERNAME_KEY)
  );
  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY)
  );
  // Derive admin state from presence of admin token (authoritative)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const hasAdminToken = !!localStorage.getItem(ADMIN_TOKEN_KEY);
    if (hasAdminToken) return true;
    // Fallback for legacy persisted flag; will be cleaned up on next login/logout
    return localStorage.getItem(IS_ADMIN_KEY) === 'true';
  });

  const login = (username: string, token: string, isAdmin: boolean = false) => {
    setUsername(username);
    setToken(token);
    // Only consider admin if there is an admin token in storage
    const hasAdminToken = !!localStorage.getItem(ADMIN_TOKEN_KEY);
    setIsAdmin(isAdmin && hasAdminToken);
    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(TOKEN_KEY, token);
    // Stop persisting isAdmin; ensure legacy key is cleared to avoid sticky admin
    localStorage.removeItem(IS_ADMIN_KEY);
  };

  const logout = () => {
    setUsername(null);
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(IS_ADMIN_KEY);
    localStorage.removeItem(ADMIN_TOKEN_KEY);
  };

  // Consider admin sessions authenticated via admin token as well
  const isAuth = !!token || !!localStorage.getItem(ADMIN_TOKEN_KEY);

  return (
    <AuthContext.Provider value={{ username, token, isAdmin, login, logout, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
