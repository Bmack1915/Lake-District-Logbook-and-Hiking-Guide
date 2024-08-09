import { useSelector } from "react-redux";
import CompletedRouteCard from "./CompletedRouteCard";
import { useUserRoutes } from "../Utilities/useUserRoutes";
import { Loading } from "../Utilities/Loading";

export default function CompletedRoutesList({ fetchUserWainwrightData }) {
  const id = useSelector((state) => state.user.id);
  //FetchUserRoutesData method needed to be called after deletion/edit etc to ensure it causes a re-render after CRUD operation
  const { userRoutes, isLoading, fetchUserRouteData } = useUserRoutes(id);

  return (
    <div className="my-4 flex items-center">
      {userRoutes && userRoutes.length > 0 ? (
        <>
          <h1 className="mb-4 text-xl font-bold">Hikes Completed 🥾</h1>
          {userRoutes.map((userRoute) => (
            <CompletedRouteCard
              fetchUserWainwrightData={fetchUserWainwrightData}
              fetchUserRouteData={fetchUserRouteData}
              key={userRoutes.routeID}
              userRoute={userRoute}
            />
          ))}
        </>
      ) : (
        <p className="text-lg">You haven't completed any Routes</p>
      )}
    </div>
  );
}
