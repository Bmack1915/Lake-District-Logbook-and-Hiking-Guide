import { Button } from "@mui/material";
import React from "react";
import useDeleteWainwright from "../../Utilities/useDeleteWainwright";
import { useSelector } from "react-redux";

const CompletedWainwrights = () => {
  const completedWainwrights =
    useSelector((state) => state.user.userWainwrights) || [];
  const wainwrightsLeft = 214 - completedWainwrights.length;
  const deleteWainwright = useDeleteWainwright();

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
    <div>
      <h1 className="mb-2 text-xl font-bold">Wainrights Logged ✅</h1>
      <div className="flex flex-col space-y-4">
        {completedWainwrights.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between space-x-10"
          >
            <h1 className="flex-1 text-lg">
              ⛰️ {item.name} - {item.heightM} m
            </h1>
            <Button
              size="small"
              variant="contained"
              onClick={() => deleteWainwright(item.wainwrightID)}
              color="error"
            >
              Delete
            </Button>
          </div>
        ))}
        <h1>You have {wainwrightsLeft} left to complete</h1>
      </div>
    </div>
  );
};

export default CompletedWainwrights;
