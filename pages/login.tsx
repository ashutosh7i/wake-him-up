import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/button";
import { LogIn } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const router = useRouter();
  const { user, loading, login } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome to Wake Him Up😴
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Sign in to continue
        </p>
        <Button
          className="w-full py-2 px-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-400 rounded shadow flex items-center justify-center"
          onClick={login}
        >
          <LogIn className="mr-2" size={24} />
          <span>Sign in with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
