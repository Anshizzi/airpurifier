import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";

const generateRandomData = () => {
  const now = new Date();
  return Array.from({ length: 10 }, (_, i) => ({
    time: new Date(now.getTime() - i * 5000).toLocaleTimeString(),
    value: (Math.random() * 100).toFixed(2), // Random pollution level between 0-100
  })).reverse();
};

const App = () => {
  const [data, setData] = useState(generateRandomData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Dashboard data={data} />
    </div>
  );
};

export default App;
