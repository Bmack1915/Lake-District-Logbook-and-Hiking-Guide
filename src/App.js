import "./App.css";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "./apiConfig";
import axios from "axios";

function App() {
  const [ErrorMsg, setErrorMsg] = useState("");
  const [wainwrights, setWainwrights] = useState([]);
  useEffect(() => {
    const fetchDataTest = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}Wainwrights`);
        const Wainwrights = res.data;
        console.log(Wainwrights);
        setWainwrights(Wainwrights);
      } catch (err) {
        setErrorMsg("Error found");
        console.log(ErrorMsg);
      }
    };

    fetchDataTest();
  }, []);

  return (
    <div>
      <p>Hello Ben</p>
      {wainwrights.map((w) => (
        <Wainwright w={w} />
      ))}
    </div>
  );
}

function Wainwright({ w }) {
  return (
    <div>
      <p>
        {w.name} is {w.heightM}m / {w.heightFeet} tall and is ranked{" "}
        {w.rankByHeight} by height. Grid Ref: {w.osGridRef}
      </p>
    </div>
  );
}

export default App;
