import React, { useState, useEffect } from 'react';
import { fetchSensorData } from '../api/sensorAPI'; // Import API function

const SensorData = () => {
    const [sensorData, setSensorData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchSensorData();
            setSensorData(data);
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // Auto-refresh every 5 sec

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2>Live Sensor Data</h2>
            <ul>
                {sensorData.map((item) => (
                    <li key={item.id}>
                        Pollution Level: {item.pollutionLevel.toFixed(2)} - Time: {new Date(item.timestamp).toLocaleTimeString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SensorData;
