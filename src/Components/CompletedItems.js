import React from "react";
import { useSelector } from "react-redux";

const CompletedItems = ({ items, itemType }) => {
  const wainwrightsDone = useSelector(
    (state) => state.user.userWainwrights,
  ).length;
  const wainwrightsLeft = 214 - wainwrightsDone;
  return (
    <>
      <div className="my-4 flex flex-col items-center">
        {items && items.length > 0 ? (
          <>
            <h1 className="mb-2 text-xl font-bold">You have completed:</h1>
            {items.map((item) => (
              <h1 key={item.id} className="text-lg">
                {itemType === "wainwrights"
                  ? `⛰️ ${item.name} - ${item.heightM}m`
                  : `🚶 ${item.name}`}
              </h1>
            ))}
            {itemType === "wainwrights" ? (
              <h1>You have {wainwrightsLeft} left to complete</h1>
            ) : null}
          </>
        ) : (
          <p className="text-lg">You haven't completed any {itemType}</p>
        )}
      </div>
    </>
  );
};

export default CompletedItems;
