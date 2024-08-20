import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loading } from "../Utilities/Loading";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      toast.warning("Please login to use this feature");
      //Pass state that is the location of where were were just redirected from (from)
      navigate("/login", { state: { from: location } });
    } else {
      setLoading(false);
    }
  }, [location, navigate]);

  if (loading) {
    return <Loading />;
  }
  return children;
}
