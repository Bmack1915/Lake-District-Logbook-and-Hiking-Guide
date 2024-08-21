import React, { useState, useEffect } from "react";
import {
  InputLabel,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { Button } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import formatDate from "../Utilities/utilityFuncsStats.js";
import StarRating from "../Utilities/StarRating.js";
import dayjs from "dayjs";
import BasicTimeField from "../Utilities/TimePicker.js";
import useAssociatedRoutes from "../Utilities/useAssociatedRoutes.js";
import { Loading } from "../Utilities/Loading.js";
import useCreateRouteLog from "../Utilities/useCreateRouteLog.js";
import useCreateWainwrightLog from "../Utilities/useCreateWainwrightLog.js";
import { getAssociatedWainwrights } from "../Utilities/useAssociatedWainwrights.js";
import useEditRouteLog from "../Utilities/useEditLog.js";
import { difficulties } from "../Utilities/utilityFuncsStats.js";
import useEditWainwrightLog from "../Utilities/useEditWainwrightLog.js";
import { fetchUserData } from "../../redux/userSlice.js";

export default function WainwrightForm({
  userWainwright,
  wainwright,
  formOpen,
  setFormOpen,
  type,
}) {
  const userId = useSelector((state) => state.user.id);
  const wainwrightID = wainwright?.wainwrightID;
  const dispatch = useDispatch();

  const [duration, setDuration] = useState(dayjs().hour(1).minute(0));
  const [date, setDate] = useState(formatDate(new Date()));
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(5);
  const [routeName, setRouteName] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const { associatedRoutes, isLoadingRoutes } = useAssociatedRoutes(wainwright);
  const { CreateUserRouteLog } = useCreateRouteLog();
  const { CreateUserWainwrightLog } = useCreateWainwrightLog();
  const { EditRouteLog } = useEditRouteLog();
  const { EditWainwrightLog } = useEditWainwrightLog(wainwrightID);

  const [associatedWainwrights, setAssociatedWainwrights] = useState([]);

  useEffect(() => {
    const fetchAssociatedWainwrights = async () => {
      if (routeName !== null) {
        try {
          const response = await getAssociatedWainwrights(routeName.routeID);
          setAssociatedWainwrights(response);
        } catch (error) {
          console.error("Failed to fetch associated Wainwrights:", error);
        }
      } else {
        setAssociatedWainwrights([]);
      }
    };

    fetchAssociatedWainwrights(); // Call the async function
  }, [routeName]); // Trigger when route changes

  useEffect(() => {
    if (type === "edit" && userWainwright) {
      setDescription(userWainwright?.description || "");
      setRating(userWainwright?.rating || 5);
      setDate(formatDate(userWainwright?.date || new Date()));
      setDuration(dayjs(userWainwright?.duration || dayjs().hour(1).minute(0)));
      setRouteName(userWainwright?.routeName || null);
      setDifficulty(userWainwright?.difficultyRating || "");
    } else {
      resetForm();
    }
  }, [type, userWainwright]);

  const resetForm = () => {
    setDescription("");
    setRating(5);
    setDate(formatDate(new Date()));
    setDuration(dayjs().hour(1).minute(0));
    setRouteName(userWainwright?.route.name || null);
    setDifficulty("");
  };

  const handleSubmit = async (e) => {
    // Prepare the base log data
    const logData = {
      id: userId,
      description,
      date: new Date(date).toISOString(),
      duration: new Date(duration).toISOString(),
      difficultyRating: difficulty,
      rating,
    };

    try {
      if (type === "edit") {
        if (routeName !== null) {
          const RouteLog = { ...logData, routeID: routeName.routeID };
          await EditRouteLog(RouteLog);

          if (associatedWainwrights.length > 0) {
            const wainwrightLogs = associatedWainwrights.map((aw) => ({
              ...logData,
              wainwrightID: aw.wainwrightID,
              routeName: routeName.name,
            }));
            for (let wainwrightLog of wainwrightLogs) {
              await EditWainwrightLog(wainwrightLog);
            }
          }
          toast.success("Route log updated successfully!");
        } else {
          const WainwrightLog = { ...logData, wainwrightID: wainwrightID };
          await EditWainwrightLog(WainwrightLog);
        }
      } else {
        if (routeName !== null) {
          const RouteLog = { ...logData, routeID: routeName.routeID };
          await CreateUserRouteLog(RouteLog);

          if (associatedWainwrights.length > 0) {
            const wainwrightLogs = associatedWainwrights.map((aw) => ({
              ...logData,
              wainwrightID: aw.wainwrightID,
              routeName: routeName.name,
            }));
            for (let wainwrightLog of wainwrightLogs) {
              await CreateUserWainwrightLog(wainwrightLog, true);
            }
          }
        } else {
          const WainwrightLog = { ...logData, wainwrightID: wainwrightID };
          await CreateUserWainwrightLog(WainwrightLog);
        }

        resetForm();
      }

      dispatch(fetchUserData(userId));
      setFormOpen(false);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Unable to submit log. Please try again.");
    }
  };

  if (isLoadingRoutes) return <Loading />;

  return (
    <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="md">
      <DialogTitle
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          fontWeight: "bold",
          fontSize: "1.75rem",
          fontFamily: "Inconsolata",
        }}
      >
        {routeName
          ? `Editing Route Log: ${routeName.name}`
          : `Editing Wainwright Log: ${wainwright?.name}`}
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "background.default",
          color: "text.primary",
          fontFamily: "Inconsolata",
          padding: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          {/* Description Section */}
          <div style={{ width: "400px" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", mt: 2, fontFamily: "Inconsolata" }}
            >
              Description
            </Typography>
            <TextField
              fullWidth
              placeholder="How was your experience? Write about it here"
              multiline
              maxRows={6}
              minRows={3}
              margin="dense"
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                "& .MuiInputLabel-root": { color: "text.secondary" },
                "& .MuiInputBase-root": { color: "text.primary" },
                fontFamily: "Inconsolata",
              }}
            />
          </div>

          {/* Duration Section */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mt: 3, mb: 1, fontFamily: "Inconsolata" }}
          >
            How long did this route take you?
          </Typography>
          <BasicTimeField width={385} value={duration} setValue={setDuration} />

          {/* Difficulty Section */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mt: 3, mb: 1, fontFamily: "Inconsolata" }}
          >
            How difficult did it feel?
          </Typography>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-96 rounded border p-2"
          >
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Date Section */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mt: 3, mb: 1, fontFamily: "Inconsolata" }}
          >
            Date completed:
          </Typography>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-96 rounded border p-2"
          />

          {/* Associated Routes Section (optional) */}
          {associatedRoutes && type === "create" && (
            <div>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mt: 3,
                  mb: 1,
                  fontFamily: "Inconsolata",
                }}
              >
                Route Taken:
              </Typography>
              <select
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (selectedValue === "None") {
                    setRouteName(null);
                  } else {
                    const selectedRoute = associatedRoutes.find(
                      (ar) => ar.routeID === parseInt(selectedValue),
                    );
                    setRouteName(selectedRoute);
                  }
                }}
                className="w-96 rounded border p-2"
                id="route"
                value={routeName?.routeID || "None"}
              >
                <option value="None">None</option>
                {associatedRoutes.map((ar) => (
                  <option key={ar.routeID} value={ar.routeID}>
                    {ar.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Associated Wainwrights Section */}
          {associatedWainwrights.length > 0 && type === "create" && (
            <div className="flex flex-col pt-3">
              <Typography
                variant="body2"
                sx={{ fontFamily: "Inconsolata", mb: 1 }}
              >
                Logging this Wainwright via this route also completes:
              </Typography>
              <ul className="list-disc pl-5">
                {associatedWainwrights.map((aw) => (
                  <li key={aw.id}>{aw.name}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Rating Section */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mt: 3, mb: 1, fontFamily: "Inconsolata" }}
          >
            How would you rate this Wainwright/Ascent?
          </Typography>
          <StarRating defaultRating={5} onSetRating={setRating} />
        </form>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "background.paper" }}>
        <Button
          onPress={() => setFormOpen(false)}
          className="bg-mint font-inconsolata text-xl text-blue"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onPress={handleSubmit}
          className="bg-green font-inconsolata text-xl text-white"
        >
          {type === "edit" ? "Save" : "Create Log"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
