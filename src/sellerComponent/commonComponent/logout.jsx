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
    if (await localStorage.getItem("staff")) {
      await localStorage.removeItem("staff");
    }

    return navigate("/login");
  };

  return null;
}

export default Logout;
