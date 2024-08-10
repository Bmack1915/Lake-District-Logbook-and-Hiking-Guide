import { useParams } from "react-router-dom";
import { useWainwright } from "../Components/Utilities/useWainwright";
import { Loading } from "../Components/Utilities/Loading";

import WainwrightMap from "../Components/WainwrightPageComponents/WainwrightMap";
import WainwrightInfo from "../Components/WainwrightPageComponents/WainwrightInfo";
import { useUserWainwrights } from "../Components/Utilities/useUserWainwrights";
import { useSelector } from "react-redux";
import { useState } from "react";
import AssociatedRoutes from "../Components/WainwrightPageComponents/AssociatedRoutes";

function WainwrightInfoPage() {
  const [completed, setCompleted] = useState(false);
  // Get wainwright ID from URL
  const { id } = useParams();
  // Custom hook to fetch Wainwright
  const { wainwright } = useWainwright(id);

  const userId = useSelector((state) => state.user.id);
  const { userWainwrights, isLoading } = useUserWainwrights(userId);

  if (isLoading) return <Loading />;

  if (!wainwright) {
    return <Loading />;
  }
  const isCompleted = userWainwrights
    .map((uw) => uw.name)
    .includes(wainwright.name);

  if (isCompleted) {
    setCompleted(true);
  }

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
            completed={completed}
            setCompleted={setCompleted}
            wainwright={wainwright}
          />
        </div>
        <div className="col-span-4 col-start-3 row-span-2 row-start-3">
          <AssociatedRoutes wainwright={wainwright} />
        </div>
      </div>
    </div>
  );
}

export default WainwrightInfoPage;
