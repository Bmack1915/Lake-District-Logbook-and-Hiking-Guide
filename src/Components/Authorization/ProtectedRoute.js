import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loading } from "../Utilities/Loading";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      toast.warning("Please login to use this feature");
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return <Loading />;
  }

  return <div>{children}</div>;
}
