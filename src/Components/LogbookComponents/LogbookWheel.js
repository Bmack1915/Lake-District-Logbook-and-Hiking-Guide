import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { Loading } from "../Utilities/Loading";
import { useSelector } from "react-redux";

function ProgressWheel({ isLoading }) {
  const userWainwrights = useSelector((state) => state.user.userWainwrights);
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  // Check if userWainwrights and id are available before calculating the percentage
  const total = 214;
  const percentage = !isLoading
    ? ((userWainwrights.length / total) * 100).toFixed()
    : 0;

  // Create the data array with the completed count
  const data = [
    { name: "Completed", value: userWainwrights.length, fill: "#00C47F" },
    {
      name: "Remaining",
      value: total - userWainwrights.length,
      fill: "#8EBCE5",
    },
  ];

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex justify-center">
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            className="mx-6 flex items-center justify-center text-2xl"
          >
            <svg width="50" height="50" style={{ marginRight: 5 }}>
              <rect width="50" height="50" fill={entry.color} />
            </svg>

            <span
              className="text-gray-700 font-semibold"
              style={{ fontFamily: "poppins" }}
            >
              {entry.value}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="h-[70vh] w-[100vh]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            // dataKey
            cx="50%"
            cy="50%"
            innerRadius={180}
            outerRadius={240}
            paddingAngle={5}
            label
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Legend iconSize={50} content={renderLegend} />
          <text
            x="50%"
            y="42%"
            fill="black"
            textAnchor="middle"
            style={{
              fontSize: "42px",
              fontWeight: "bold",
              fontFamily: "poppins",
            }}
          >
            {`${percentage}% Completed`}
            <tspan x="50%" y="45%" dy="1.2em" fontSize="25px">
              {`${userWainwrights.length}/${total} Wainwrights`}
            </tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProgressWheel;
