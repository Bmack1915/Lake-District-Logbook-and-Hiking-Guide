import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { Button } from "@nextui-org/react";

export default function Logout() {
  const dispatch = useDispatch();

  function handleLogOut() {
    sessionStorage.removeItem("token");
    dispatch(logout());
    alert("User logged out!");
    window.location.href = "/landing";
  }

  return <Button onPress={handleLogOut}>Logout</Button>;
}
