import { useSelector } from "react-redux";
import CompletedRouteCard from "../LogbookComponents/MyRoutes/CompletedRouteCard";
import { useUserRoutes } from "../Utilities/useUserRoutes";
import { Loading } from "../Utilities/Loading";

export default function CompletedRoutesList({ fetchUserWainwrightData }) {
  const id = useSelector((state) => state.user.id);
  //FetchUserRoutesData method needed to be called after deletion/edit etc to ensure it causes a re-render after CRUD operation
  const { userRoutes, isLoading, fetchUserRouteData } = useUserRoutes(id);

  if (isLoading) return <Loading />;

  return (
    <div>
      {userRoutes && userRoutes.length > 0 ? (
        <>
          {userRoutes.map((userRoute) => (
            <CompletedRouteCard
              fetchUserWainwrightData={fetchUserWainwrightData}
              fetchUserRouteData={fetchUserRouteData}
              key={userRoutes.route}
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
