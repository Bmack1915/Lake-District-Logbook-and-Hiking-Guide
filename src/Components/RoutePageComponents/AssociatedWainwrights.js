import { Loading } from "../Utilities/Loading";
import useAssociatedWainwrights from "../Utilities/useAssociatedWainwrights";

function AssociatedWainwrights({ route }) {
  const { associatedWainwrights, isLoading } = useAssociatedWainwrights(route);
  console.log(associatedWainwrights);

  if (isLoading) return <Loading />;

  return (
    <div className="rounded-lg bg-white p-1 shadow-md">
      <span>
        <h1 className="mb-2 text-2xl font-bold md:text-xl">
          {associatedWainwrights.length > 1
            ? `${associatedWainwrights.length} Wainwrights summited in this route: `
            : "This route summits:"}
        </h1>{" "}
        <p className="text-gray-600 pb-5 md:text-sm">
          (Logging this route will automatically add{" "}
          {associatedWainwrights.length > 1 ? "these" : "this"} Wainwright/s to
          your logbook)
        </p>
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
