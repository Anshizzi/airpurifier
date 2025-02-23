import React from "react";
import Graph from "./Graph";
import SensorData from "./SensorData";
import DataTable from "./Table";
import "../App.css"; 

const Dashboard = ({ data }) => {
  return (
    <div className="dashboard">
      <h1 className="title">Air Pollution Levels</h1>
      <div className="content">
        <div className="box">
          <Graph data={data} />
        </div>
        <div className="box">
          <SensorData data={data} />
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
