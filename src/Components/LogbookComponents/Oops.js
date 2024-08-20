import { Button } from "@nextui-org/react";
import { MdWarning } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoMdSend } from "react-icons/io";

function Oops() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center">
      <MdWarning className="text-white" size={150} />
      <h2 className="mt-8 text-4xl font-bold text-white">
        Oops, you haven't summited any Wainwrights yet
      </h2>
      <Button
        className="mt-10 rounded-lg bg-blue px-4 py-4 text-xl text-white hover:bg-lightblue"
        onPress={() => navigate("/wainwrightFinder")}
        endContent={<IoMdSend />}
      >
        Start Exploring
      </Button>
    </div>
  );
}

export default Oops;
