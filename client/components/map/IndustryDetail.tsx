import { Industry } from "../types/index";

interface Props {
  industry: Industry | null;
  userLocation: [number, number] | null;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): string {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(1);
}

const IndustryDetail = ({ industry, userLocation }: Props) => {
  if (!industry) return null;

  const distance = userLocation
    ? calculateDistance(userLocation[0], userLocation[1], industry.location[0], industry.location[1])
    : "Calculating...";

  return (
    <div id="industry-detail">
      <div style={{
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #dee2e6",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}>
        <h4 style={{ margin: "0 0 15px 0", color: "#2c3e50" }}>{industry.name}</h4>
        <div style={{ marginBottom: "10px" }}>
          <strong>Waste Type:</strong> {industry.wasteType}
        </div>
        <div style={{ marginBottom: "10px" }}>
          <strong>MSP Price per kg:</strong> ₹{industry.pricePerKg}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <strong>Distance:</strong> {distance} km
        </div>
        <button 
          style={{
            backgroundColor: "#28a745",
            color: "#ffffff",
            border: "none",
            padding: "10px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            width: "100%"
          }}
          onClick={() => alert(`Request sent to ${industry.name}`)}
        >
          Send Request
        </button>
      </div>
    </div>
  );
};

export default IndustryDetail;