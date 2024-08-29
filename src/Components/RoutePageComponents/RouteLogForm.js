import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../Utilities/apiConfig";
import { difficulties } from "../Utilities/utilityFuncsStats";
import { toast } from "react-toastify";
import StarRating from "../Utilities/StarRating";
import apiClient from "../Utilities/axiosInterceptor";

export default function RouteLogForm({ route }) {
  const id = useSelector((state) => state.user.id);
  const routeID = route.routeID;
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [rating, setRating] = useState("");

  async function CreateLog(log) {
    try {
      const response = await apiClient.post(`${API_BASE_URL}userroutes`, log);
      if (response.status === 201 || response.state === 200) {
        toast.alert("Route successfully logged!");
      }
    } catch (error) {
      toast.error(error.response, "you must login to record routes.");
      console.log("Error", error);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newLog = {
      id,
      routeID,
      description,
      date: new Date(date).toISOString(),
      DifficultyRating: difficulty,
    };

    CreateLog(newLog);
    setDate(today);
    setDescription("");
    setDifficulty("");
  }

  return (
    <div className="s-justify-between flex flex-col items-center">
      <h1 className="text-gray-800 mb-5 mt-5 w-full text-center text-3xl font-bold">
        Want to log this route?
      </h1>
      <form onSubmit={handleSubmit}>
        <ul className="space-y-8">
          <li>
            <TextField
              id="outlined-basic"
              type="text"
              value={description}
              placeholder="How did it go?"
              onChange={(e) => setDescription(e.target.value)}
            />
          </li>
          <li>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                How did it feel?
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={difficulty}
                label="Difficulty"
                onChange={(e) => setDifficulty(e.target.value)}
              >
                {difficulties.map((d) => (
                  <MenuItem value={d}>{d}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </li>

          <li>
            <h2>When did you complete this walk?</h2>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </li>
          <li>
            <h2>How would you rate this walk? </h2>
            <StarRating onSetRating={setRating} />
          </li>
          <li>
            <Button variant="contained" type="submit">
              Submit Log
            </Button>
          </li>
        </ul>
      </form>
    </div>
  );
}
