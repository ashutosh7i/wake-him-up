import { useRouter } from "next/router";

import { useAuth } from "@/contexts/AuthContext";

const Account = () => {
  const { user, loading, logout, checkAuth } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    await checkAuth(); // Update auth context after logout
    router.push("/login"); // Redirect to login page
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
