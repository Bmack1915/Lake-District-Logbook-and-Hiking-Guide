import axios from "axios";
import { useEffect, useState } from "react";

function WeatherBar({ route }) {
  const [data, setData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [weatherAvailable, setWeatherAvailable] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${route.latitude}&lon=${route.longitude}&units=metric&appid=c8444dc095cbd98d6d1f799a6e88bf83`;

  useEffect(() => {
    async function getWeather() {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setSelectedDate(response.data.list[0]);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }

    getWeather();
  }, [url]);

  const filteredData = data.list
    ? data.list.filter((timePoint) => timePoint.dt_txt.includes("12:00:00"))
    : [];

  const formattedDateData = filteredData.map((timePoint) => {
    const date = new Date(timePoint.dt_txt);
    const formattedDate = date
      .toLocaleDateString("en-US", { month: "short", day: "2-digit" })
      .replace(",", "");
    return { ...timePoint, dt_txt: formattedDate };
  });

  return (
    data &&
    data.city && (
      <div>
        <p className="flex justify-center font-bold">
          Daily Weather Forecast for the {data.city.name} Area
        </p>
        <div className="dark:text-gray-400 dark:border-gray-700 overflow-x-auto border-primary text-center text-sm">
          <ul className="-mb-px flex justify-evenly">
            {formattedDateData.map((timePoint, index) => (
              <li key={index}>
                <button
                  onClick={() => setSelectedDate(timePoint)}
                  className={`border-transparent hover:border-gray-300 inline-block rounded-t-lg border-b-2 p-4 hover:font-bold ${timePoint?.dt === selectedDate?.dt ? "font-bold text-primary" : ""}`}
                >
                  {timePoint.dt_txt}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {selectedDate && (
          <div className="flex items-center justify-evenly rounded-lg bg-white p-4 shadow-md">
            <p className="text-xl font-semibold">
              🌡️ Avg Temp: {selectedDate.main.temp.toFixed()}°C
            </p>
            <p className="text-xl font-semibold">
              ☁️ Weather: {selectedDate.weather[0].main}
            </p>
            <p className="text-xl font-semibold">
              🌬️ Feels Like: {selectedDate.main.feels_like.toFixed()}°F
            </p>
            <p className="text-xl font-semibold">
              💧 Humidity: {selectedDate.main.humidity}%
            </p>
            <p className="text-xl font-semibold">
              🌪️ Wind: {selectedDate.wind.speed.toFixed()} MPH
            </p>
          </div>
        )}
      </div>
    )
  );
}

export default WeatherBar;
