import React, { createContext, useState, useContext, useEffect } from "react";
import { account } from "@/config/appwrite";
import { OAuthProvider } from "appwrite";

interface AuthContextType {
  user: any;
  loading: boolean;
  login: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserStatus();
  }, []);

  async function checkUserStatus() {
    try {
      const session = await account.get();
      setUser(session);
    } catch (error) {
      console.error("No active session:", error);
    } finally {
      setLoading(false);
    }
  }

  function login() {
    const hostname = window.location.hostname;
    account.createOAuth2Session(
      OAuthProvider.Google,
      `http://${hostname}/`, // Success URL
      `http://${hostname}/`, // Failure URL
      ["profile", "email"] // Scopes
    );
  }

  async function logout() {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
