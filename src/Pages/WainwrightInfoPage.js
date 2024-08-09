import { useParams } from "react-router-dom";
import { useWainwright } from "../Components/Utilities/useWainwright";
import { Loading } from "../Components/Utilities/Loading";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../Components/Utilities/apiConfig";
import { toast } from "react-toastify";

function WainwrightInfoPage() {
  //Get wainwright ID from URL
  const { id } = useParams();
  //Custom hook to fetch Wainwright
  const { wainwright } = useWainwright(id);
  const userId = useSelector((state) => state.user.id);

  if (!wainwright) {
    return <Loading />;
  }

  async function postUserWainwright(userWainwright) {
    try {
      await axios.post(`${API_BASE_URL}userwainwrights/`, userWainwright);
      toast.success("Wainwright successfully logged!");
    } catch (err) {
      toast.error(`${err.response.data}!!!`);
      console.error("Error logging Wainwright:", err);
    } finally {
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
    <div className="mx-auto max-w-4xl p-5">
      <h1 className="mb-4 text-center text-4xl font-bold">{wainwright.name}</h1>
      <div className="rounded-lg bg-white p-6 shadow-md">
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
          <div className="col-span-2">
            <Button
              onClick={handleMarkComplete}
              color="success"
              variant="contained"
            >
              Mark Complete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WainwrightInfoPage;
