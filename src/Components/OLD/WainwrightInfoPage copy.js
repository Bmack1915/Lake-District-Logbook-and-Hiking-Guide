import { useParams } from "react-router-dom";
import { useWainwright } from "../Utilities/useWainwright";
import { Loading } from "../Utilities/Loading";

import WainwrightMap from "../WainwrightPageComponents/WainwrightMap";
import WainwrightInfo from "../WainwrightPageComponents/WainwrightInfo";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AssociatedRoutes from "../WainwrightPageComponents/AssociatedRoutes";
import ViewWainwrightButton from "../WainwrightPageComponents/ViewWainwrightButton";
import fetchWainwrightData from "../Utilities/fetchWainwright";

function WainwrightInfoPage() {
  const [completed, setCompleted] = useState(false);
  const [loggedAscent, setLoggedAscent] = useState(null);
  const [wainwright, setWainwright] = useState();

  // Get wainwright ID from URL
  const userWainwrights = useSelector((state) => state.user.userWainwrights);
  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      const wainwright = await fetchWainwrightData(id);
      setWainwright(wainwright);
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
  }, [wainwright, userWainwrights]);

  if (!wainwright || !userWainwrights) return <Loading />;

  return (
    <div>
      <h1 className="mb-4 px-5 text-start text-4xl font-bold">
        {wainwright.name}
      </h1>
      <div className="grid grid-cols-5 grid-rows-5 gap-4">
        <div className="col-span-3 col-start-3 row-span-3 row-start-1">
          <WainwrightMap wainwright={wainwright} />
        </div>
        <div className="col-span-2 col-start-1 row-span-2 row-start-1">
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

        <div className="col-span-4 col-start-3 row-span-2 row-start-3">
          <AssociatedRoutes wainwright={wainwright} />
        </div>
      </div>
    </div>
  );
}

export default WainwrightInfoPage;
