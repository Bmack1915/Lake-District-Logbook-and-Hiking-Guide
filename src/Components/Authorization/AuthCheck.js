import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loading } from "../Utilities/Loading";

export default function AuthCheck({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    }, 500); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <Loading />;
  }

  return <div>{children}</div>;
}
