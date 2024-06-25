import React from "react";
import Cookies from "js-cookie";

export default function Logout() {
  function handleLogOut() {
    Cookies.remove("token");
    alert("User logged out!");
    window.location.href = "/";
  }

  return (
    <button onClick={handleLogOut} className="mx-3">
      Logout
    </button>
  );
}
