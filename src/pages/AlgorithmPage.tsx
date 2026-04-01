
import { useState, useEffect } from "react";
import "./AlgorithmPage.css";
import AlgorithmAdd from "../components/AlgorithmAdd";
import AlgorithmEdit from "../components/AlgorithmEdit";

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

export default function Algorithms() {
  const [popupMode, setPopupMode] = useState<"add" | "edit" | null>(null);
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAlgorithms = () => {
    fetch("http://localhost:5000/algorithms")
      .then((res) => res.json())
      .then((data) => setAlgorithms(data));
  };

  useEffect(() => {
    fetchAlgorithms();
  }, []);
/*run with: node server.js and npm run admin*/
  return (
    <div className="algorithms-page">
      {/* Header */}
      <div className="alg-header">
        <h1>Algorithms</h1>
        <button className="add-btn" onClick={() => setPopupMode("add")}>
          + Add algorithm
        </button>
      </div>

      {/* Search */}
      <div className="search-container">
        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button>Search</button>
      </div>

      {/* Stats */}
      <div className="stats">
        {[
          "algorithm total amount",
          "algorithm active amount",
          "public accessible algorithms",
          "algorithms categories",
        ].map((label, i) => (
          <div key={i} className="card">
            <div className="card-number">--</div>
            <div className="card-label">{label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="table-section">
        <h3>Algorithm List</h3>

        <div className="table-header">
          <span>ID</span>
          <span>Name</span>
          <span>Purpose</span>
          <span>Version</span>
          <span>Status</span>
          <span>Last Updated</span>
          <span>Owner</span>
          <span>Runs</span>
          <span>Actions</span>
        </div>

        {/* Filter algorithms based on search term */}
        {(() => {
          const filteredAlgorithms = algorithms.filter(algo =>
            algo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            algo.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
            algo.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
            algo.status.toLowerCase().includes(searchTerm.toLowerCase())
          );
          return filteredAlgorithms.map((algo, index) => (
            <div key={index} className="table-row" onClick={() => {
              setSelectedAlgorithm(algo);
              setPopupMode("edit");
            }}>
              <div>{index + 1}</div>
              <div>{algo.name}</div>
              <div>{algo.purpose}</div>
              <div>{algo.version}</div>
              <div>{algo.status}</div>
              <div>{algo.lastUpdated}</div>
              <div>{algo.owner}</div>
              <div>{algo.runsThisMonth}</div>
              <div>
                <button
                  className="edit-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the row click
                    setSelectedAlgorithm(algo);
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

          {/* Popup */}
          {popupMode === "add" && (
      <AlgorithmAdd
        onClose={() => setPopupMode(null)}
        onSuccess={() => {
          setPopupMode(null);
          fetchAlgorithms();
        }}
      />
    )}

    {popupMode === "edit" && selectedAlgorithm && (
      <AlgorithmEdit
        algorithm={selectedAlgorithm}
        onClose={() => setPopupMode(null)}
        onSuccess={() => {
          setPopupMode(null);
          setSelectedAlgorithm(null);
          fetchAlgorithms();
        }}
      />
    )}
    </div>
  );
}
