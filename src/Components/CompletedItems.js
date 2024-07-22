import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CompletedItems = ({ items, itemType }) => {
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
                  : item.name}
              </h1>
            ))}
          </>
        ) : (
          <p className="text-lg">You haven't completed any {itemType}</p>
        )}
      </div>
    </>
  );
};

export default CompletedItems;
