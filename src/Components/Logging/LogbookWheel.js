import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";

function LogbookWheel() {
  const completed = useSelector((state) => state.user.userWainwrights);
  const percentage = (completed.length / 214) * 100;
  return (
    <div>
      <CircularProgressbar
        value={percentage}
        maxValue={214}
        text={`${completed.length}/214`}
      ></CircularProgressbar>
    </div>
  );
}

export default LogbookWheel;
