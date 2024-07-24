import React from "react";
import { useSelector } from "react-redux";

const CompletedWainwrights = () => {
  const completedWainwrights =
    useSelector((state) => state.user.userWainwrights) || [];
  const wainwrightsLeft = 214 - completedWainwrights.length;

  if (!completedWainwrights) {
    return (
      <div className="my-4 flex flex-col items-center">
        <p className="text-lg">
          You haven't logged any Wainwrights as complete!
        </p>
      </div>
    );
  }

  return (
    <div className="my-4 flex flex-col items-center">
      <h1 className="mb-2 text-xl font-bold">Wainrights Logged ✅</h1>
      {completedWainwrights.map((item) => (
        <h1 key={item.id} className="text-lg">
          ⛰️ {item.name} - {item.heightM}
        </h1>
      ))}
      <h1>You have {wainwrightsLeft} left to complete</h1>
    </div>
  );
};

export default CompletedWainwrights;
