port { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function AirPurifierSimulator() {
  const [airQuality, setAirQuality] = useState(50);
  const [fanSpeed, setFanSpeed] = useState(1);
  const [filterStatus, setFilterStatus] = useState("Good");

  return (
    <div className="p-4 max-w-md mx-auto">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-bold mb-4">Air Purifier Simulator</h2>
          <div className="mb-4">
            <p>Air Quality: {airQuality}%</p>
            <Slider
              min={0}
              max={100}
              value={[airQuality]}
              onValueChange={(value) => setAirQuality(value[0])}
            />
          </div>
          <div className="mb-4">
            <p>Fan Speed: {fanSpeed}</p>
            <Button onClick={() => setFanSpeed((prev) => Math.min(prev + 1, 5))}>Increase</Button>
            <Button onClick={() => setFanSpeed((prev) => Math.max(prev - 1, 1))} className="ml-2">Decrease</Button>
          </div>
          <div className="mb-4">
            <p>Filter Status: {filterStatus}</p>
            <Button onClick={() => setFilterStatus(filterStatus === "Good" ? "Needs Replacement" : "Good")}>
              Toggle Status
            </Button>
          </div># airpurifier
