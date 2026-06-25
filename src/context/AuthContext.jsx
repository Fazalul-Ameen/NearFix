import { createContext, useState, useEffect, useContext } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Resolve user login status on app start
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Auth initialization error:", err);
        authService.logout();
      }
    }
    setLoading(false);
  }, []);

  const loginUser = async (identifier, password) => {
    setLoading(true);
    try {
      const data = await authService.login(identifier, password);
      setToken(data.token);
      setUser(data.user);
      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signupUser = async (userData) => {
    setLoading(true);
    try {
      const data = await authService.signup(userData);
      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  const refreshUser = () => {
    // Refresh user state from localStorage (e.g. after worker registration)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Auth refresh error:", err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login: loginUser,
        signup: signupUser,
        logout: logoutUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
