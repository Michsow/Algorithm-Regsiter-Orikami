import { useState } from "react";
import "./Popup.css";
import type { Patient } from "../types";

interface PatientEditProps {
  onClose: () => void;
  onSuccess: () => void;
  patient: Patient;
}

export default function PatientEdit({ onClose, onSuccess, patient }: PatientEditProps) {
  const [name, setName] = useState(patient.name || "");
  const [dateOfBirth, setDateOfBirth] = useState(patient.dateOfBirth || "");
  const [gender, setGender] = useState(patient.gender || "male");
  const [status, setStatus] = useState(patient.status || "Pending");
  const [created, setCreated] = useState(patient.created || "");

  const handleSubmit = async () => {
    try {
      await fetch(`http://localhost:5000/patients/${patient._id}`, {
        method: "PUT",
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
      console.error("Edit patient failed", error);
      alert("Could not update patient");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Edit Patient</h2>

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
