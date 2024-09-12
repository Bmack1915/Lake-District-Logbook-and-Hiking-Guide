import { Loading } from "../Utilities/Loading";
import { FaArrowsAltH } from "react-icons/fa";
import useAssociatedWainwrights from "../Utilities/useAssociatedWainwrights";

//Component to show the Wainwrights a route summits
function AssociatedWainwrights({ route }) {
  const { associatedWainwrights, isLoading } = useAssociatedWainwrights(route);

  if (isLoading) return <Loading />;

  //If no assosicated wainwrights return null
  if (associatedWainwrights.length < 1) return null;

  return (
    <div className="w-[80vh] rounded-lg bg-white p-2 shadow-lg">
      <span>
        <h1 className="mb-2 text-2xl font-bold md:text-xl">
          {associatedWainwrights.length > 1
            ? `${associatedWainwrights.length} Wainwrights summited in this route: `
            : "This route summits:"}
        </h1>
        <div className="flex items-center pb-5 text-lg md:text-sm">
          <p>
            (Logging this route will automatically add{" "}
            {associatedWainwrights.length > 1 ? "these" : "this"} Wainwright/s
            to your logbook)
          </p>

          <FaArrowsAltH size={20} className="ml-2 items-center" />
        </div>
      </span>

      {associatedWainwrights.length === 1 && (
        <div className="mb-2 mr-4 flex items-center justify-between">
          <span className="mr-2 text-xl">⛰</span>
          <p>{associatedWainwrights[0].name}</p>
          <p>{associatedWainwrights[0].heightM} meters</p>
          <p>{associatedWainwrights[0].rankByHeight}# Highest</p>
        </div>
      )}
      <ul className="flex overflow-y-hidden">
        {associatedWainwrights.length > 1 &&
          associatedWainwrights.map((aw, index) => (
            <li key={index} className="mb-2 mr-4 flex-shrink-0 border-r pr-4">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="mr-2 text-xl">⛰</span>
                  <p>{aw.name}</p>
                </div>
                <p>{aw.heightM} meters</p>
                <p>{aw.rankbyheight}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AssociatedWainwrights;
