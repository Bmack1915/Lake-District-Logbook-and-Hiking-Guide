import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../Utilities/apiConfig";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export default function CompletedWainwrights() {
  const [completed, setCompleted] = useState([]);

  const decoded = jwtDecode(Cookies.get("token"));
  const id = decoded.nameid;

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}UserWainwrights/${id}`);
        setCompleted(res.data.$values);
        console.log("Completed", res.data.$values);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
      }
    };

    fetchCompleted();
  }, [id]);

  return (
    <div>
      <h1>You have completed: </h1>
      {completed.map((w) => (
        <h1>
          ⛰️ {w.name} - {w.heightM}m
        </h1>
      ))}
    </div>
  );
}
