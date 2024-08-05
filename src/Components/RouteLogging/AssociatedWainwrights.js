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
    <div className="rounded-lg bg-white p-1 shadow-md">
      <span>
        <h1 className="mb-2 text-2xl font-bold md:text-xl">
          This route summits the following Wainwrights:
        </h1>{" "}
        <p className="t-2 text-gray-600 md:text-sm">
          (Logging this route will automatically add these to your completed
          Wainwrights!)
        </p>
      </span>
      <ul className="flex overflow-y-hidden">
        {associatedWainwrights.map((aw) => (
          <li key={aw.id} className="mb-2 mr-4 flex-shrink-0 border-r pr-4">
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="mr-2 text-xl">⛰</span>
                <p>{aw.name}</p>
              </div>
              <p>{aw.heightM} meters</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssociatedWainwrights;
