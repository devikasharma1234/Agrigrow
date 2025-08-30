import { Industry } from "../types/index";

interface Props {
  industries: Industry[];
  selected: Industry | null;
  onSelect: (ind: Industry) => void;
}

const IndustryList = ({ industries, selected, onSelect }: Props) => (
  <div id="industry-list" style={{ marginBottom: "20px" }}>
    {industries.map((ind) => (
      <div
        key={ind.name}
        style={{
          padding: "12px",
          margin: "8px 0",
          backgroundColor: selected?.name === ind.name ? "#007bff" : "#ffffff",
          color: selected?.name === ind.name ? "#ffffff" : "#333333",
          border: "1px solid #dee2e6",
          borderRadius: "6px",
          cursor: "pointer",
          transition: "all 0.2s ease"
        }}
        onClick={() => onSelect(ind)}
      >
        <div style={{ fontWeight: "bold" }}>{ind.name}</div>
        <div style={{ fontSize: "12px", opacity: 0.8 }}>
          {ind.wasteType} • ₹{ind.pricePerKg}/kg
        </div>
      </div>
    ))}
  </div>
);

export default IndustryList;