import React, { useEffect } from "react";
import { Plus } from "@nextui-org/shared-icons";
import { useRouter } from "next/navigation";

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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen flex-col dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-white dark:text-gray-200">
        Welcome! Please sign in to continue
      </h1>
      <br />
      <div className="mt-5">
        <button
          className="flex justify-center items-center gap-2 border-2 border-slate-600 px-5 py-2 rounded-sm"
          onClick={login}
        >
          <Plus size={30} />
          <span className="text-white dark:text-gray-200">
            Login with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
