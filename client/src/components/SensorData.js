import React from "react";

const SensorData = ({ data }) => {
  return (
    <div className="sensor-box">
      <h2>Live Sensor Data</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>Pollution Level:</strong> {item.value} | <strong>Time:</strong> {item.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SensorData;
