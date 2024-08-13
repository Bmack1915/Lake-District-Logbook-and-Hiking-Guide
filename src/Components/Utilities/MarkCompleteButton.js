import { useSelector } from "react-redux";
import apiClient from "./axiosInterceptor";
import { API_BASE_URL } from "./apiConfig";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/react";

function MarkCompleteButton({ wainwright, setCompleted }) {
  const userId = useSelector((state) => state.user.id);

  async function postUserWainwright(userWainwright) {
    try {
      await apiClient.post(`${API_BASE_URL}userwainwrights/`, userWainwright);
      toast.success("Wainwright successfully logged!");
      setCompleted(true);
    } catch (err) {
      toast.error(`${err.response.data}!!!`);
      console.error("Error logging Wainwright:", err);
    }
  }

  function handleMarkComplete() {
    const userWainwright = {
      Id: userId,
      WainwrightID: wainwright.wainwrightID,
    };
    postUserWainwright(userWainwright);
  }
  return (
    <Button
      className="p-3"
      color="primary"
      onPress={handleMarkComplete}
      variant="bordered"
      radius="half"
    >
      Mark Complete
    </Button>
  );
}

export default MarkCompleteButton;
