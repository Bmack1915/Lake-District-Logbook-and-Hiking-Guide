import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom"; // or useNavigate for React Router v6

const SessionChecker = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      handleLogOut();
    }
  });

  const handleLogOut = () => {
    sessionStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };

  return <>{children}</>;
};

export default SessionChecker;
