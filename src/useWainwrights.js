import { useState } from "react";
import { useEffect } from "react";
import { API_BASE_URL } from "./Components/Utilities/apiConfig";
import axios from "axios";

function useData() {
  const [wainwrights, setWainwrights] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //Use Effect to load data
  useEffect(() => {
    setIsLoading(true);
    const fetchWainwrightData = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}Wainwrights`);
        setWainwrights(res.data.$values);
        //setFilteredWainwrights(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWainwrightData();
  }, []);

  return { wainwrights, isLoading };
}
