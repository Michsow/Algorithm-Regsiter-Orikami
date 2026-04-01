import { useState } from "react";
import "./Popup.css";

// Props for the edit popup component
interface AddAlgorithmPopupProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddAlgorithmPopup({ onClose, onSuccess }: AddAlgorithmPopupProps) {
   // State for form fields (pre-filled with existing algorithm data)
  const [name, setName] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [purpose, setPurpose] = useState("");
  const [owner, setOwner] = useState("");
  const [version, setVersion] = useState("");
  const [runsThisMonth, setRunsThisMonth] = useState(0);
  const [status, setStatus] = useState("active");

   // Sends updated data to backend
  const handleSubmit = async () => {
    try {
      await fetch("http://localhost:5000/algorithms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          lastUpdated,
          purpose,
          owner,
          version,
          runsThisMonth,
          status,
        }),
      });
      onSuccess();
    } catch (error) {
      console.error("Add algorithm failed", error);
      alert("Could not add algorithm");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>+Add algorithm form</h2>

        <div className="form-grid">
          <div>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="text" />
          </div>

          <div>
            <label>last updated(example date: XXXX-XX-XX)</label>
            <input value={lastUpdated} onChange={(e) => setLastUpdated(e.target.value)} placeholder="Date" />
          </div>

          <div>
            <label>Purpose</label>
            <input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="text" />
          </div>

          <div>
            <label>owner</label>
            <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="Value" />
          </div>

          <div>
            <label>Version</label>
            <input value={version} onChange={(e) => setVersion(e.target.value)} placeholder="Value" />
          </div>

          <div>
            <label>runs (this month)</label>
            <input
              value={runsThisMonth}
              onChange={(e) => setRunsThisMonth(Number(e.target.value) || 0)}
              type="number"
              placeholder="0"
            />
          </div>

          <div>
            <label>status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
              <option value="deprecate">deprecate</option>
            </select>
          </div>
        </div>

        <div className="popup-actions">
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
