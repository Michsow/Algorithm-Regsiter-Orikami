import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientsPage.css";
import PatientAdd from "../components/PatientAdd";
import PatientEdit from "../components/PatientEdit";
import { type Patient } from "../types";

  // Controls which popup is open (add/edit)
  // Stores list of patients and selected patient for editing
  // Also handles search term for filtering patients
export default function PatientsPage() {
  const [popupMode, setPopupMode] = useState<"add" | "edit" | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  // Fetches patients from backend and updates state
  const fetchPatients = () => {
    fetch("http://localhost:5000/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data));
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div className="patients-page">
      {/* Header */}
      <div className="patients-header">
        <h1>Patients</h1>
        <button className="add-btn" onClick={() => setPopupMode("add")}>
          + Add patient
        </button>
      </div>

      {/* Search */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>Search</button>
      </div>

      {/* Stats */}
      <div className="stats">
        {[
          { label: "total patients", value: patients.length },
          { label: "active", value: patients.filter(p => p.status.toLowerCase() === "active").length },
          { label: "Total Assessments", value: 0 },
          { label: "Pending", value: 0 },

        ].map((stat, i) => (
          <div key={i} className="card">
            <div className="card-number">{stat.value}</div>
            <div className="card-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="table-section">
        <h3>Patient List</h3>

        <div className="table-header">
          <span>ID</span>
          <span>Name</span>
          <span>Date of Birth</span>
          <span>Gender</span>
          <span>Status</span>
          <span>Created</span>
          <span>Assessments</span>
          <span>Actions</span>
        </div>

        {/* Filter patients */}
        {(() => {
          const filteredPatients = patients.filter((patient) =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.created.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.status.toLowerCase().includes(searchTerm.toLowerCase())
          );

          return filteredPatients.map((patient, index) => (
            <div
              key={index}
              className="table-row"
              onClick={() => navigate(`/patient/${patient._id}`)}
            >
              <div>{index + 1}</div>
              <div>{patient.name}</div>
              <div>{patient.dateOfBirth}</div>
              <div>{patient.gender}</div>
              <div>{patient.status}</div>
              <div>{patient.created}</div>
              <div>
                <span className="placeholder-text">No data</span>
              </div>
              <div>
                <button
                  className="edit-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPatient(patient);
                    setPopupMode("edit");
                  }}
                >
                  edit
                </button>
              </div>
            </div>
          ));
        })()}
      </div>

      {/* Popups */}
      {popupMode === "add" && (
        <PatientAdd
          onClose={() => setPopupMode(null)}
          onSuccess={() => {
            setPopupMode(null);
            fetchPatients();
          }}
        />
      )}

      {popupMode === "edit" && selectedPatient && (
        <PatientEdit
          patient={selectedPatient}
          onClose={() => setPopupMode(null)}
          onSuccess={() => {
            setPopupMode(null);
            setSelectedPatient(null);
            fetchPatients();
          }}
        />
      )}
    </div>
  );
}
