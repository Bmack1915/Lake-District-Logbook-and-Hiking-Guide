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
    <div className="rounded-lg bg-white p-4 shadow-md">
      <h1 className="mb-4 text-2xl font-bold">This route conquers:</h1>
      {associatedWainwrights.map((aw) => (
        <p key={aw.id} className="mb-2 flex items-center">
          <span className="mr-2 text-xl">⛰</span>
          <span className="font-semibold">{aw.name}</span>, {aw.heightM} meters
        </p>
      ))}
      <p className="mt-4 text-gray-600">
        Logging this route will automatically add these to your completed
        Wainwrights!
      </p>
    </div>
  );
}

export default AssociatedWainwrights;
