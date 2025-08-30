import { useEffect, useState } from "react";
import * as tmImage from "@teachablemachine/image";

const MODEL_URL = "https://teachablemachine.withgoogle.com/models/1AKsqNwrF/";

interface Props {
  onWasteDetected: (waste: string) => void;
}

const Scanner = ({ onWasteDetected }: Props) => {
  const [model, setModel] = useState<tmImage.CustomMobileNet | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [waste, setWaste] = useState("—");
  const [conf, setConf] = useState("—");
  const [error, setError] = useState("");

  useEffect(() => {
    tmImage.load(MODEL_URL + "model.json", MODEL_URL + "metadata.json")
      .then(setModel)
      .catch(() => setError("⚠ Could not load model"));
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file || !model) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();
    setPreview(img.src);

    try {
      const predictions = await model.predict(img);
      const best = predictions.reduce((a, b) =>
        b.probability > a.probability ? b : a
      );

      const threshold = 0.3;
      setWaste(best.className);
      setConf((best.probability * 100).toFixed(1) + "%");

      if (best.probability >= threshold) {
        onWasteDetected(best.className);
      }
    } catch {
      setError("⚠ Prediction failed");
    }
  };

  return (
    <div id="scanner" style={{ marginBottom: "20px" }}>
      <div style={{ marginBottom: "15px" }}>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #dee2e6",
            borderRadius: "4px"
          }}
        />
      </div>
      {preview && (
        <div style={{ marginBottom: "15px" }}>
          <img 
            id="preview" 
            src={preview} 
            alt="Preview" 
            style={{
              width: "100%",
              maxHeight: "200px",
              objectFit: "cover",
              borderRadius: "6px"
            }}
          />
        </div>
      )}
      <div style={{ 
        backgroundColor: "#ffffff", 
        padding: "15px", 
        borderRadius: "6px", 
        border: "1px solid #dee2e6",
        marginBottom: "10px"
      }}>
        <div style={{ marginBottom: "8px" }}>
          <strong>Detected Waste:</strong> {waste}
        </div>
        <div>
          <strong>Confidence:</strong> {conf}
        </div>
      </div>
      {error && (
        <div style={{ 
          color: "#dc3545", 
          backgroundColor: "#f8d7da", 
          padding: "10px", 
          borderRadius: "4px",
          border: "1px solid #f5c6cb"
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Scanner;