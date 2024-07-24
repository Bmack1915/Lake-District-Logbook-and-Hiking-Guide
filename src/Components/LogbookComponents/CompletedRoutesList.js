import { useSelector } from "react-redux";
import CompletedRouteCard from "./CompletedRouteCard";

export default function CompletedRoutesList() {
  const completedRoutes = useSelector((state) => state.user.userRoutes) || [];
  return (
    <div className="my-4 flex flex-col items-center">
      {completedRoutes && completedRoutes.length > 0 ? (
        <>
          <h1 className="mb-4 text-xl font-bold">Hikes Completed 🥾</h1>
          {completedRoutes.map((userRoute) => (
            <CompletedRouteCard key={userRoute.routeID} userRoute={userRoute} />
          ))}
        </>
      ) : (
        <p className="text-lg">You haven't completed any Routes</p>
      )}
    </div>
  );
}
