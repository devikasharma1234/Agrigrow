import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Industry } from "../types/index";

interface Props {
  industries: Industry[];
  userLocation: [number, number] | null;
  onIndustryClick: (ind: Industry) => void;
}

const MapView = ({ industries, userLocation, onIndustryClick }: Props) => {
  useEffect(() => {
    const map = L.map("map").setView([28.7, 77.1], 8);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    industries.forEach((ind) => {
      const marker = L.marker(ind.location).addTo(map).bindPopup(ind.name);
      marker.on("click", () => onIndustryClick(ind));
    });

    if (userLocation) {
      L.marker(userLocation, {
        icon: L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
          iconSize: [30, 30],
        }),
      }).addTo(map).bindPopup("You are here").openPopup();
    }
  }, [industries, userLocation]);

  return <div id="map" style={{ flex: 3 }} />;
};

export default MapView;