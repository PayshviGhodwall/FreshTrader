import React, { useEffect } from "react";
import { useNavigate } from "react-router";

function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    logout();
  }, []);

  const logout = async () => {
    if (await localStorage.getItem("token")) {
      await localStorage.removeItem("token");
    }
    return navigate("/login");
  };

  return null;
}

export default Logout;
