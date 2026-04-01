import { useState } from "react";
import "./Popup.css";

interface Algorithm {
  _id?: string;
  name: string;
  purpose: string;
  version: string;
  status: string;
  lastUpdated: string;
  owner: string;
  runsThisMonth: number;
}

interface EditAlgorithmPopupProps {
  onClose: () => void;
  onSuccess: () => void;
  algorithm: Algorithm;
}

export default function EditAlgorithmPopup({ onClose, onSuccess, algorithm }: EditAlgorithmPopupProps) {
  const [name, setName] = useState(algorithm.name || "");
  const [lastUpdated, setLastUpdated] = useState(algorithm.lastUpdated || "");
  const [purpose, setPurpose] = useState(algorithm.purpose || "");
  const [version, setVersion] = useState(algorithm.version || "");
  const [runsThisMonth, setRunsThisMonth] = useState(algorithm.runsThisMonth || 0);
  const [status, setStatus] = useState(algorithm.status || "active");
  const [changeOwner, setChangeOwner] = useState(algorithm.owner || "");

  const handleSubmit = async () => {
    try {
      await fetch(`http://localhost:5000/algorithms/${algorithm._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          lastUpdated,
          purpose,
          owner: changeOwner,
          version,
          runsThisMonth,
          status,
        }),
      });
      onSuccess();
    } catch (error) {
      console.error("Edit algorithm failed", error);
      alert("Could not update algorithm");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Edit</h2>

        <div className="form-grid">
          <div>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="text" />
          </div>

          <div>
            <label>last updated</label>
            <input value={lastUpdated} onChange={(e) => setLastUpdated(e.target.value)} placeholder="Date" />
          </div>

          <div>
            <label>Purpose</label>
            <input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="text" />
          </div>

          <div>
            <label>Version</label>
            <input value={version} onChange={(e) => setVersion(e.target.value)} placeholder="Value" />
          </div>

          <div>
            <label>runs (this month)</label>
            <input
              type="number"
              value={runsThisMonth}
              onChange={(e) => setRunsThisMonth(Number(e.target.value) || 0)}
              placeholder="Value"
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

          {/* Only in EDIT */}
          <div>
            <label>Change owner</label>
            <input value={changeOwner} onChange={(e) => setChangeOwner(e.target.value)} placeholder="ID" />
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
