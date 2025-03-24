import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const Graph = ({ data = [] }) => {  // ✅ Ensure data is always an array
  if (!Array.isArray(data) || data.length === 0) {
    return <p style={{ textAlign: "center", color: "gray" }}>No data available</p>;  // ✅ Show message instead of blank screen
  }

  return (
    <div className="graph-container">
      <h2>Pollution Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" stroke="#61dafb" />
          <YAxis stroke="#61dafb" />
          <Tooltip />
          <CartesianGrid stroke="#444" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="value" stroke="#61dafb" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
