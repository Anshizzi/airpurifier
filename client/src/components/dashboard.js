import React from "react";
import Graph from "./Graph";
import SensorData from "./SensorData";
import DataTable from "./Table";

const Dashboard = ({ data }) => {
  return (
    <div>
      <h1>Air Pollution Levels</h1> {/* This appears on the top of the pg*/}
      <Graph data={data} />
      <SensorData data={data} />
      <DataTable data={data} />
    </div>
  );
};

export default Dashboard;
