import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function Oops() {
  const navigate = useNavigate();

  function handleNavigate() {
    navigate("/wainwrightFinder");
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-lg bg-white bg-opacity-70 p-10 text-center shadow-lg">
        <div className="grid grid-cols-1 items-center gap-6">
          <img
            src="assets/mountainNoBg.png"
            alt="Oops"
            className="h-30 mx-auto w-44"
          />

          <h1 className="text-gray-800 text-3xl font-bold">
            Oops! You haven't logged any Wainwrights yet.
          </h1>

          <p className="text-gray-600">
            Start tracking your progress by adding your completed Wainwrights.
          </p>

          <Button
            onPress={() => handleNavigate()}
            className="mt-4 rounded-lg bg-blue px-6 py-3 text-white transition duration-300"
          >
            Log Your First Wainwright
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Oops;
