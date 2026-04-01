import { useState } from "react";
import "./Popup.css";

// Props for the add patient popup
interface PatientAddProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function PatientAdd({ onClose, onSuccess }: PatientAddProps) {
   // State for form fields
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("male");
  const [status, setStatus] = useState("active");
  const [created, setCreated] = useState(new Date().toISOString().slice(0, 10));

  // Sends new patient data to backend
  const handleSubmit = async () => {
    try {
      await fetch("http://localhost:5000/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          dateOfBirth,
          gender,
          status,
          created,
        }),
      });

      onSuccess();
    } catch (error) {
      console.error("Add patient failed", error);
      alert("Could not add patient");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>+ Add patient</h2>

        <div className="form-grid">
          <div>
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </div>

          <div>
            <label>Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">other</option>
            </select>
          </div>

          <div>
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label>Created</label>
            <input
              type="date"
              value={created}
              onChange={(e) => setCreated(e.target.value)}
            />
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
