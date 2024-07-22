import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

export default function Logout() {
  const dispatch = useDispatch();

  function handleLogOut() {
    Cookies.remove("token");
    dispatch(logout());
    alert("User logged out!");
    window.location.href = "/";
  }

  return (
    <button onClick={handleLogOut} className="mx-3">
      Logout
    </button>
  );
}
