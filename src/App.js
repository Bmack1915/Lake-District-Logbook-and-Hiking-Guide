import "./App.css";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "./apiConfig";
import axios from "axios";

function App() {
  const [ErrorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    const fetchDataTest = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}Wainwrights`);
        const data = res.json();
        console.log(data);
      } catch (err) {
        setErrorMsg("Error found");
        console.log(ErrorMsg);
      }
    };

    fetchDataTest();
  }, [ErrorMsg]);

  return (
    <div>
      <p>Hello Ben</p>
      {ErrorMsg && <p>{ErrorMsg}</p>}
    </div>
  );
}

export default App;
