import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../Utilities/apiConfig";

function AssociatedWainwrights({ route }) {
  const [associatedWainwrights, setAssociatedWainwrights] = useState([]);
  useEffect(() => {
    async function getAssociatedWainwrights() {
      const res = await axios.get(
        `${API_BASE_URL}WainwrightRoutes/wainwrights/fromRoute/${route.routeID}`,
      );

      const wainwrightObjs = await res.data.$values;
      setAssociatedWainwrights(wainwrightObjs);
    }

    getAssociatedWainwrights();
  }, [route.routeID]);
  return (
    <div>
      <h1>This route conquers: </h1>
      {associatedWainwrights.map((aw) => (
        <p>
          ⛰ {aw.name}, {aw.heightM}
        </p>
      ))}
      <p>
        Logging this route will automatically add these to your completed
        Wainwrights!
      </p>
    </div>
  );
}

export default AssociatedWainwrights;
