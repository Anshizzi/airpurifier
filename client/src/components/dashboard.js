import React, { useState, useEffect } from "react";
import Graph from "./Graph";
import SensorData from "./SensorData";
import DataTable from "./DataTable";
import "../App.css";
import { fetchSensorData } from "../api/sensorAPI";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const sensorData = await fetchSensorData();
        setData(sensorData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch sensor data");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000); 

    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <h1 className="title">Loading Sensor Data...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <h1 className="title">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

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