import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ProgressWheel = () => {
  // Hard-coded value for completed
  const completed = 4;
  const total = 214;
  const percentage = ((completed / total) * 100).toFixed();

  // Create the data array with the completed count
  const data = [
    { name: "Completed", value: completed, fill: "#0088FE" },
    { name: "Remaining", value: total - completed, fill: "#00C49F" },
  ];

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex justify-center">
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            style={{ color: entry.color }}
            className="mx-6 flex items-center justify-center text-xl"
          >
            <svg width="50" height="50" style={{ marginRight: 5 }}>
              <rect width="50" height="50" fill={entry.color} />
            </svg>
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="h-[70vh] w-screen">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={180}
            outerRadius={240}
            fill="#8884d8"
            paddingAngle={5}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Legend iconSize={50} content={renderLegend} />
          <text
            x="50%"
            y="50%"
            fill="black"
            textAnchor="middle"
            style={{ fontSize: "36px", fontWeight: "bold" }}
          >
            {`${percentage}% Completed`}
            <tspan x="50%" y="50%" dy="1.2em" fontSize="24px">
              {`${completed}/${total} Wainwrights`}
            </tspan>
          </text>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressWheel;
