import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function LogEntry() {
  //Receieve r object from the navigated from page (Route marker containing this route info).
  const passedState = useLocation();
  const route = passedState.state.r;

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const newLog = {
      description: description,
      date: date,
      route: route.routeID,
    };
    console.log(newLog); // You can replace this with any action you want to perform with newLog

    alert("Log added to logbook!");
    setDate(today);
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{route.name}</h1>
      <p>
        Ascent : {route.ascentF} Distance {route.distanceKm} kM
      </p>
      <ul>
        <li>
          <input
            type="text"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </li>
        <li>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </li>
      </ul>
      <button type="submit">Submit Log</button>
    </form>
  );
}
