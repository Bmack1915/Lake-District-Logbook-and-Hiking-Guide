import MarkCompleteButton from "../Utilities/MarkCompleteButton";
import MarkUncompleteButton from "../Utilities/MarkUncompleteButton";

function WainwrightInfo({ wainwright, completed, setCompleted, children }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <p className="pb-5">{wainwright.description}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <h2 className="mb-2 text-2xl font-semibold">Height</h2>
          <p className="text-lg">{wainwright.heightM} meters</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <h2 className="mb-2 text-2xl font-semibold">Rank in Height</h2>
          <p className="text-lg">{wainwright.rankByHeight}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <h2 className="mb-2 text-2xl font-semibold">Latitude</h2>
          <p className="text-lg">{wainwright.latitude}</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <h2 className="mb-2 text-2xl font-semibold">Longitude</h2>
          <p className="text-lg">{wainwright.longitude}</p>
        </div>
        <div className="col-span-2">
          <h2 className="mb-2 text-2xl font-semibold">Area</h2>
          <p className="text-lg">{wainwright.area}</p>
        </div>
        <div className="col-span-2">{children}</div>
      </div>
    </div>
  );
}

export default WainwrightInfo;
