
import { useState, useEffect } from "react";
import "./AlgorithmPage.css";
import AlgorithmAdd from "../components/AlgorithmAdd";
import AlgorithmEdit from "../components/AlgorithmEdit";

interface Algorithm {
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

    useEffect(() => {
      fetch("http://localhost:5000/algorithms")
        .then((res) => res.json())
        .then((data) => setAlgorithms(data));
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
        <input type="text" placeholder="Search..." />
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

        {/* TODO: Replace hardcoded [1, 2] with dynamic data when available */}
        {algorithms.map((algo, index) => (
            <div key={index} className="table-row">
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
                  onClick={() => setPopupMode("edit")}
                >
                  edit
                </button>
              </div>
            </div>
          ))}
      </div>

          {/* Popup */}
          {popupMode === "add" && (
      <AlgorithmAdd onClose={() => setPopupMode(null)} />
    )}

    {popupMode === "edit" && (
      <AlgorithmEdit onClose={() => setPopupMode(null)} />
    )}
    </div>
  );
}
