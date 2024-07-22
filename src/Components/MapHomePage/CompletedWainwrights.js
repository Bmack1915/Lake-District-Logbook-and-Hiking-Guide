import React from "react";
import { useSelector } from "react-redux";

export default function CompletedWainwrights({ data }) {
  const completed = useSelector((state) => state.user.userWainwrights);
  const routes = useSelector((state) => state.user.userRoutes);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div>
      <div className="flex justify-between">
        {isAuthenticated ? (
          completed && completed.length > 0 ? (
            <>
              <h1>You have completed:</h1>
              {completed.map((w) => (
                <h1 key={w.wainwrightID}>
                  ⛰️ {w.name} - {w.heightM}m
                </h1>
              ))}
            </>
          ) : (
            <p>You haven't completed any Wainwrights</p>
          )
        ) : null}
      </div>

      <div className="flex justify-evenly">
        {isAuthenticated ? (
          routes && routes.length > 0 ? (
            <>
              <h1>You have completed:</h1>
              {routes.map((w) => (
                <h1 key={w.routeID}>{w.name}</h1>
              ))}
            </>
          ) : (
            <p>You haven't completed any routes</p>
          )
        ) : null}
      </div>
    </div>
  );
}
