import { useParams } from "react-router-dom";
import { Loading } from "../Components/Utilities/Loading";

import WainwrightMap from "../Components/WainwrightPageComponents/WainwrightMap";
import WainwrightInfo from "../Components/WainwrightPageComponents/WainwrightInfo";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AssociatedRoutes from "../Components/WainwrightPageComponents/AssociatedRoutes";
import ViewWainwrightButton from "../Components/WainwrightPageComponents/ViewWainwrightButton";
import fetchWainwrightData from "../Components/Utilities/fetchWainwright";
import { getAssociatedRoutes } from "../Components/Utilities/fetchAssociatedRoutes";

function WainwrightInfoPage() {
  const [completed, setCompleted] = useState(false);
  const [loggedAscent, setLoggedAscent] = useState(null);
  const [wainwright, setWainwright] = useState();
  const [associatedRoutes, setAssociatedRoutes] = useState();

  // Get wainwright ID from URL
  const userWainwrights = useSelector((state) => state.user.userWainwrights);
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      const wainwright = await fetchWainwrightData(id);
      const associatedRoutes = await getAssociatedRoutes(wainwright);
      setWainwright(wainwright);
      setAssociatedRoutes(associatedRoutes);
    }

    getData();
  }, [id]);

  useEffect(() => {
    async function GetCompleted() {
      let isCompleted = false;
      let loggedAscent = null;

      if (wainwright !== null && userWainwrights) {
        isCompleted = userWainwrights
          .map((uw) => uw.wainwright.name)
          .includes(wainwright.name);

        loggedAscent = userWainwrights.find(
          (uw) => uw.wainwright && uw.wainwright.name === wainwright.name,
        );
      }

      if (isCompleted) {
        setCompleted(true);
        setLoggedAscent(loggedAscent);
      }
    }

    if (wainwright && userWainwrights) GetCompleted();
  }, [userWainwrights, wainwright]);

  if (!wainwright || !userWainwrights) return <Loading />;
  return (
    <div>
      <div
        className={`grid grid-cols-7 ${associatedRoutes ? "grid-rows-6" : "grid-row-4"} gap-4`}
      >
        <div className="col-span-5 col-start-2 row-span-2">
          <WainwrightInfo
            wainwright={wainwright}
            completed={completed}
            setCompleted={setCompleted}
          >
            <ViewWainwrightButton
              userWainwright={loggedAscent}
              completed={completed}
              wainwright={wainwright}
            />
          </WainwrightInfo>
        </div>
        <div className="col-span-5 col-start-2 row-span-2 row-start-3">
          <h1 className="pb-5 text-2xl font-bold sm:text-3xl md:text-4xl">
            Wainwright Map
          </h1>
          <WainwrightMap wainwright={wainwright} />
        </div>
        <div className="col-span-5 col-start-2 row-span-2 row-start-5">
          <AssociatedRoutes
            associatedRoutes={associatedRoutes}
            wainwright={wainwright}
          />
        </div>
      </div>
    </div>
  );
}
export default WainwrightInfoPage;
