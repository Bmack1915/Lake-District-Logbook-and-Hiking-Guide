import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function AuthCheck({ children }) {
  const navigate = useNavigate();
  if (!Cookies.get("token")) navigate("/login");
  if (Cookies.get("token")) {
    return children;
  }
  return (
    <div>
      <h1>Please login to access your logbook!</h1>
    </div>
  );
}
