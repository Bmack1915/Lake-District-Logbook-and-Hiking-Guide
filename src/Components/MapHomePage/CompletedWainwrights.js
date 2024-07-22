import React from "react";
import { useSelector } from "react-redux";

export default function CompletedWainwrights() {
  const completed = useSelector((state) => state.user.userWainwrights);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div>
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
  );
}
