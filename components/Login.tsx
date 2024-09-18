import React, { useState, useEffect } from "react";
import { Plus } from "@nextui-org/shared-icons";
import { OAuthProvider } from "appwrite";
import { useRouter } from "next/navigation";

import { account } from "@/config/appwrite";
import { useAuth } from "@/contexts/AuthContext";

const HomePage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [hostname, setHostname] = useState("");

  useEffect(() => {
    setHostname(window.location.hostname);
  }, []);

  const handleLogout = async () => {
    await account.deleteSession("current");
    // Optionally, you can add a redirect or state update here
    router.push("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen flex-col dark:bg-gray-800">
      {user ? (
        <>
          <h1 className="text-2xl font-bold text-white dark:text-gray-200">
            Welcome back, {user.name}!
          </h1>
          <button
            className="mt-5 flex justify-center items-center gap-2 border-2 border-slate-600 px-5 py-2 rounded-sm"
            onClick={handleLogout}
          >
            <span className="text-white dark:text-gray-200">Logout</span>
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-white dark:text-gray-200">
            Welcome! Please sign in to continue
          </h1>
          <br />
          <div className="mt-5">
            <button
              className="flex justify-center items-center gap-2 border-2 border-slate-600 px-5 py-2 rounded-sm"
              onClick={() => {
                account.createOAuth2Session(
                  OAuthProvider.Google,
                  `http://${hostname}/`, // Success URL
                  `http://${hostname}/`, // Failure URL
                  ["profile", "email"], // Scopes
                );
              }}
            >
              <Plus size={30} />
              <span className="text-white dark:text-gray-200">
                Login with Google
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
