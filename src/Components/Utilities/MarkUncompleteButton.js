import { useSelector } from "react-redux";
import apiClient from "./axiosInterceptor";
import { API_BASE_URL } from "./apiConfig";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/react";

function MarkUncompleteButton({ wainwright, setCompleted }) {
  const userId = useSelector((state) => state.user.id);

  async function postUserWainwright(userWainwright) {
    try {
      await apiClient.delete(`${API_BASE_URL}userwainwrights/`, userWainwright);
      toast.success("Wainwright log removed!");
      setCompleted(false);
    } catch (err) {
      toast.error("Unable to remove Wainwright log");
      console.error("Unable to remove Wainwright log:", err);
    }
  }

  function handleMarkUnComplete() {
    const userWainwright = {
      Id: userId,
      WainwrightID: wainwright.wainwrightID,
    };
    postUserWainwright(userWainwright);
  }
  return (
    <Button
      className="bg-lightblue p-3"
      onPress={handleMarkUnComplete}
      variant="bordered"
      radius="half"
    >
      Mark Uncomplete
    </Button>
  );
}

export default MarkUncompleteButton;
