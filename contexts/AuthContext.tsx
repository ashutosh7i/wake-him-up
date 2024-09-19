import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { OAuthProvider } from "appwrite";

import { account } from "@/config/appwrite";

interface AuthContextType {
  user: any;
  loading: boolean;
  login: () => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => Promise.resolve(),
  checkAuth: () => Promise.resolve(),
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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
      //console.error("No active session:", error);
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
      ["profile", "email"], // Scopes
    );
  }

  async function logout() {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      //console.error("Logout failed:", error);
    }
  }

  const checkAuth = useCallback(async () => {
    // Implement your auth checking logic here
    await checkUserStatus();
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
    checkAuth,
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
