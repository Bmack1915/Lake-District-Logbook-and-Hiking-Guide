import axios from "axios";
import { useEffect, useState } from "react";

function WeatherBar({ route }) {
  const [data, setData] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${route.latitude}&lon=${route.longitude}&units=metric&appid=c8444dc095cbd98d6d1f799a6e88bf83`;

  useEffect(() => {
    async function getWeather() {
      try {
        const response = await axios.get(url);
        console.log("weather response", response.data.list[0]);
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
      <div className="flex w-full flex-col justify-evenly overflow-hidden rounded-xl bg-white p-6 shadow-2xl">
        <p className="flex justify-center pt-3 text-2xl font-extrabold">
          Daily Weather Forecast for the {data.city.name} Area
        </p>

        <div className="mt-4 text-center text-sm">
          <ul className="-mb-px flex justify-evenly space-x-4">
            {formattedDateData.map((timePoint, index) => (
              <li
                key={index}
                className="transform transition ease-in-out hover:scale-125"
              >
                <button
                  onClick={() => setSelectedDate(timePoint)}
                  className={`border-transparent inline-block rounded-t-lg border-b-4 p-4 text-xl hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue ${
                    timePoint?.dt === selectedDate?.dt
                      ? "border-b-blue-500 text-2xl font-bold text-blue"
                      : "border-b-transparent"
                  }`}
                >
                  {timePoint.dt_txt}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {selectedDate && (
          <div className="ring-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:ring-gray-700 mt-6 flex items-center justify-evenly rounded-xl bg-white p-6 shadow-lg ring-1">
            <p className="text-gray-800 dark:text-gray-200 text-xl font-semibold">
              Avg Temp: {selectedDate.main.temp.toFixed()}°C
            </p>

            <p className="text-gray-800 dark:text-gray-200 text-xl font-semibold">
              Feels Like: {selectedDate.main.feels_like.toFixed()}°C
            </p>
            <p className="text-gray-800 dark:text-gray-200 text-xl font-semibold">
              Weather: {selectedDate.weather[0].description}
            </p>

            <p className="text-gray-800 dark:text-gray-200 text-xl font-semibold">
              Wind: {selectedDate.wind.speed.toFixed()} MPH
            </p>
          </div>
        )}
      </div>
    )
  );
}

export default WeatherBar;
