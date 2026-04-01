import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientsPage.css";
import PatientAdd from "../components/PatientAdd";
import PatientEdit from "../components/PatientEdit";
import { type Patient } from "../types";

export default function PatientsPage() {
  const [popupMode, setPopupMode] = useState<"add" | "edit" | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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
          "total patients",
          "active",
          "Total Assessments",
          "Pending",
        ].map((label, i) => (
          <div key={i} className="card">
            <div className="card-number">--</div>
            <div className="card-label">{label}</div>
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
        </div>

        {/* Filter patients */}
        {(() => {
          const filteredPatients = patients.filter((patient) =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
              <div>{patient.doctor}</div>

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
