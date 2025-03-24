import React, { useState, useEffect } from "react";
import Graph from "./Graph";
import SensorData from "./SensorData";
import DataTable from "./Table";
import "../App.css";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("Fetching sensor data..."); 
    fetch("/api/sensors")
      .then((res) => res.json())
      .then((result) => {
        console.log("Received data:", result); 
        setData(result || []);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setData([]); 
      });
  }, []);

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
