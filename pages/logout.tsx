import React, { useEffect } from "react";
import { logout } from "@/config/appwrite";
import { useRouter } from "next/navigation";

const LogoutPage: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    logout();
    router.push("/login");
  }, []);
  return <div>Logout</div>;
};

export default LogoutPage;
