import { CircularProgress } from "@nextui-org/react";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";

function LogbookWheelOLD() {
  const completed = useSelector((state) => state.user.userWainwrights);
  if (completed && completed.length > 0) {
    return (
      <div>
        <CircularProgress
          size="lg"
          value={50}
          color="error"
          showValueLabel={true}
          aria-label="Hello"
        />
        {/* <CircularProgressbar
          value={percentage}
          maxValue={214}
          text={`${completed.length}/214`}
        ></CircularProgressbar> */}
      </div>
    );
  }
}

export default LogbookWheelOLD;
