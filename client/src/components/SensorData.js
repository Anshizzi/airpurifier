import React from "react";

const SensorData = ({ data }) => {
  return (
    <div>
      <h2>Live Sensor Data</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            Pollution Level: {item.value} - Time: {item.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SensorData;
