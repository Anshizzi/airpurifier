import React from "react";

const SensorData = ({ data = [] }) => { //data is always an array
  return (
    <div className="sensor-box">
      <h2>Live Sensor Data</h2>
      {data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>
              <strong>Pollution Level:</strong> {item.value} | <strong>Time:</strong> {item.time}
            </li>
          ))}
        </ul>
      ) : (
        <p>No sensor data available</p> //empty state
      )}
    </div>
  );
};

export default SensorData;
