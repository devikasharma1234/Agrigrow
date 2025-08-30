import Scanner from "./Scanner";
import IndustryList from "./IndustryList";
import IndustryDetail from "./IndustryDetail";
import { Industry } from "../types/index";

interface Props {
  waste: string | null;
  setWaste: (w: string) => void;
  industries: Industry[];
  selectedIndustry: Industry | null;
  setSelectedIndustry: (ind: Industry) => void;
  userLocation: [number, number] | null;
}

const Sidebar = ({
  waste,
  setWaste,
  industries,
  selectedIndustry,
  setSelectedIndustry,
  userLocation,
}: Props) => (
  <div id="sidebar" style={{ 
    width: "400px", 
    padding: "20px", 
    backgroundColor: "#f8f9fa", 
    borderRight: "1px solid #dee2e6",
    overflowY: "auto"
  }}>
    <h3 style={{ marginBottom: "20px", color: "#2c3e50" }}>🌾 Agri-Waste Scanner</h3>
    <Scanner onWasteDetected={setWaste} />
    <h3 style={{ marginTop: "30px", marginBottom: "15px", color: "#2c3e50" }}>Industries</h3>
    <IndustryList
      industries={industries}
      selected={selectedIndustry}
      onSelect={setSelectedIndustry}
    />
    <IndustryDetail industry={selectedIndustry} userLocation={userLocation} />
  </div>
);

export default Sidebar;