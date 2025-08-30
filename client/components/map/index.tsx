import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MapView from "./MapView";
import { Industry } from "../types/index";
import "./styles.css";

// Mock data for industries
const mockIndustries: Industry[] = [
  {
    name: "Paper Mill Industries",
    location: [28.7, 77.1],
    wasteType: "Rice Straw",
    pricePerKg: 5.5
  },
  {
    name: "Biofuel Plant",
    location: [28.6, 77.2],
    wasteType: "Wheat Residue",
    pricePerKg: 6.0
  },
  {
    name: "Animal Feed Factory",
    location: [28.8, 77.0],
    wasteType: "Sugarcane Bagasse",
    pricePerKg: 4.5
  }
];

const MapComponent = () => {
  const [waste, setWaste] = useState<string | null>(null);
  const [industries] = useState<Industry[]>(mockIndustries);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          // Default to Delhi if location access is denied
          setUserLocation([28.7, 77.1]);
        }
      );
    } else {
      setUserLocation([28.7, 77.1]);
    }
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        waste={waste}
        setWaste={setWaste}
        industries={industries}
        selectedIndustry={selectedIndustry}
        setSelectedIndustry={setSelectedIndustry}
        userLocation={userLocation}
      />
      <MapView
        industries={industries}
        userLocation={userLocation}
        onIndustryClick={setSelectedIndustry}
      />
    </div>
  );
};

export default MapComponent;
