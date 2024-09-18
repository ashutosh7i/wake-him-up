import { useRouter } from "next/router";

import { useAuth } from "@/contexts/AuthContext";
import { logout } from "@/config/appwrite";

const Account = () => {
  const { user, loading, checkAuth } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    checkAuth(); // Update auth context after logout
    router.push("/login"); // Redirect to home page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user is logged in.</div>;
  }

  return (
    <div>
      <h2>Account Information</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Account;
