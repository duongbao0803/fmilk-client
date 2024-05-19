import React, { useEffect } from "react";
import Router from "./routes/Sections";
import useAuth from "./hooks/useAuth";
import Cookies from "js-cookie";

const App: React.FC = () => {
  const { fetchUserInfo, isAuthenticated } = useAuth();
  const token = Cookies.get("accessToken");

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserInfo();
    }
  }, [token]);

  return (
    <>
      <Router />
    </>
  );
};

export default App;
