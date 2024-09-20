import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { logout } from "@/config/appwrite";

const LogoutPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push("/login");
  }, []);

  return <div>Logout</div>;
};

export default LogoutPage;
