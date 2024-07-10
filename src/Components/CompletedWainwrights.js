import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "./Utilities/apiConfig";
import Cookies from "js-cookie";

export default function CompletedWainwrights() {
  const [completed, setCompleted] = useState([]);

  const token = Cookies.get("token");
  const nameid = decodeURI();

  useEffect(() => {
    const fetchWainwrightData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}UserWainwrights/`);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
      }
    };

    fetchWainwrightData();
  }, []);
}
