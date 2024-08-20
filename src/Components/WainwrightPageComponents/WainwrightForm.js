import React, { useState, useEffect } from "react";
import { InputLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@nextui-org/react";

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

export default function WainwrightForm({
  userWainwright,
  wainwright,
  formOpen,
  setFormOpen,
  fetchUserWainwrightData,
  type,
}) {
  const userId = useSelector((state) => state.user.id);
  const wainwrightID = wainwright?.wainwrightID;

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

  // Get associated Wainwrights dynamically using useEffect
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
          // Editing a Route Log
          const RouteLog = { ...logData, routeID: routeName.routeID };

          // Update the Route Log
          await EditRouteLog(RouteLog);
          // Optionally, update associated Wainwright logs for the Route
          if (associatedWainwrights.length > 0) {
            const wainwrightLogs = associatedWainwrights.map((aw) => ({
              ...logData,
              wainwrightID: aw.wainwrightID, // Update each associated wainwright log
              routeName: routeName.name,
            }));

            wainwrightLogs.map((i) => EditWainwrightLog(i));
            // Update each associated wainwright log
            for (let wainwrightLog of wainwrightLogs) {
              await EditWainwrightLog(wainwrightLog);
            }
          }

          toast.success("Route log updated successfully!");
        } else {
          // Editing a Wainwright Log
          const WainwrightLog = { ...logData, wainwrightID: wainwrightID };
          await EditWainwrightLog(WainwrightLog);
        }
      } else {
        if (routeName !== null) {
          // Create a Route Log
          const RouteLog = { ...logData, routeID: routeName.routeID };
          await CreateUserRouteLog(RouteLog);

          // Create associated Wainwright logs for the route
          if (associatedWainwrights.length > 0) {
            const wainwrightLogs = associatedWainwrights.map((aw) => ({
              ...logData,
              wainwrightID: aw.wainwrightID,
              routeName: routeName.name,
            }));

            // Create each associated wainwright log
            for (let wainwrightLog of wainwrightLogs) {
              await CreateUserWainwrightLog(wainwrightLog, true);
            }
          }
        } else {
          // Create a Wainwright Log
          const WainwrightLog = { ...logData, wainwrightID: wainwrightID };
          await CreateUserWainwrightLog(WainwrightLog);
        }

        resetForm();
      }

      fetchUserWainwrightData();
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
          fontFamily: "Inconsolata",
          width: 500,
        }}
      >
        {routeName
          ? `Editing Route Log: ${routeName.name}`
          : `Editing Wainwright Log: ${wainwright?.name}`}
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "background.default",
          fontFamily: "Inconsolata",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ width: "400px" }}>
            {" "}
            {/* Adjust the width of the parent container */}
            <TextField
              label="Description"
              fullWidth
              placeholder="How was your experience? Write about it here"
              multiline
              maxRows={6}
              minRows={4}
              margin="dense"
              variant="standard"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                "& .MuiInputLabel-root": { color: "text.secondary" },
                "& .MuiInputBase-root": { color: "text.primary" },
                font: "bold",
              }}
            />
          </div>
          <InputLabel
            sx={{
              color: "text.secondary",
              paddingBottom: 2,
              fontFamily: "Inconsolata",
            }}
          >
            How long did this route take you?
          </InputLabel>
          <BasicTimeField width={385} value={duration} setValue={setDuration} />

          <p className="p-3">How difficult did it feel?</p>

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

          <InputLabel
            sx={{
              color: "text.secondary",
              fontFamily: "Inconsolata",
              marginTop: 3,
            }}
          >
            Date completed:
          </InputLabel>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-96 rounded border p-2"
          />

          {associatedRoutes && type === "create" && (
            <div>
              <InputLabel
                sx={{
                  color: "text.secondary",
                  fontFamily: "Inconsolata",
                  marginTop: 3,
                }}
              >
                Route Taken:
              </InputLabel>
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

          {associatedWainwrights.length > 0 && type === "create" && (
            <div className="flex flex-col pt-3">
              <p>Logging this Wainwright via this route also completes:</p>
              <ul className="list-disc pl-5">
                {associatedWainwrights.map((aw) => (
                  <li key={aw.id}>{aw.name}</li>
                ))}
              </ul>
            </div>
          )}

          <InputLabel
            sx={{
              color: "text.secondary",
              fontFamily: "Inconsolata",
              marginTop: 3,
            }}
          >
            How would you rate this Wainwright/Ascent?
          </InputLabel>
          <StarRating defaultRating={5} onSetRating={setRating} />
        </form>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: "background.paper" }}>
        <Button
          onPress={() => setFormOpen(false)}
          className="bg-lightblue text-white"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          onPress={handleSubmit}
          className="bg-green text-white"
        >
          {type === "edit" ? "Save" : "Create Log"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
