import React from "react";
import Cookies from "js-cookie";

export default function AuthCheck({ children }) {
  if (Cookies.get("token")) {
    return children;
  }
  return (
    <div>
      <h1>Please login to access your logbook!</h1>
    </div>
  );
}
