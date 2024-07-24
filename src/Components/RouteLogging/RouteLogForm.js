import React, { useState } from "react";
import axios from "axios";
import { difficulties } from "../Utilities/difficulties";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../Utilities/apiConfig";
import { UpdateUserInfo, addUserRoute } from "../../redux/userSlice";

export default function RouteLogForm({ route }) {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.id);
  const routeID = route.routeID;
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");

  // async function CreateLog(log) {
  //   try {
  //     const response = await axios.post(`${API_BASE_URL}userroutes`, log);
  //     console.log("Response", response);
  //     if (response.status === 201 || response.state === 200) {
  //       console.log("Log created successfully", response.data);
  //       //This post method returns the whole thing created at action, which is the primary keys, referencs (Route and Application User),
  //       //description, etc. Do I want to add these or just the routes? We will need to access the logs too btw.
  //       dispatch(addUserRoute(response.data));
  //       dispatch(UpdateUserInfo());
  //     } else {
  //       console.error("Failed to create log");
  //     }
  //   } catch (error) {
  //     alert("Error creating log");
  //     console.error("Error creating log:", error.response);
  //   }
  // }

  async function CreateLog(log) {
    const response = await axios.post(`${API_BASE_URL}userroutes`, log);
    // console.log("Response", response);
    if (response.status === 201 || response.state === 200) {
      // console.log("Log created successfully", response.data);
      //This post method returns the whole thing created at action, which is the primary keys, referencs (Route and Application User),
      //description, etc. Do I want to add these or just the routes? We will need to access the logs too btw.
    }
    dispatch(addUserRoute(response.data));
    dispatch(UpdateUserInfo());
  }

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior
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
      <h1 className="mb-5 w-full text-center text-3xl font-bold text-gray-800">
        Route: {route.name}
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
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
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
