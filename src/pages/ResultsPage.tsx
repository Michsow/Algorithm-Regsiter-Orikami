import { useState, useEffect } from "react";
import "./AlgorithmPage.css";
import type { Result } from "../types";

export default function Results() {
  const [results, setResults] = useState<Result[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchResults = () => {
    fetch("http://localhost:5000/results")
      .then((res) => res.json())
      .then((data) => setResults(data))
      .catch((error) => console.error("Error fetching results:", error));
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="algorithms-page">
      {/* Header */}
      <div className="alg-header">
        <h1>Results</h1>
      </div>

      {/* Search */}
      <div className="search-container">
        <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button>Search</button>
      </div>

      {/* Stats */}
      <div className="stats">
        {[
          { label: "Total Assessments", value: results.length },
          { label: "Completed", value: results.filter(r => r.Assessment_Status?.toLowerCase() === "completed").length },
          { label: "Pending", value: results.filter(r => r.Assessment_Status?.toLowerCase() === "pending").length },
          { label: "High Risk", value: results.filter(r => r.Risk_Level?.toLowerCase() === "high").length },
        ].map((stat, i) => (
          <div key={i} className="card">
            <div className="card-number">{stat.value}</div>
            <div className="card-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="table-section">
        <h3>Results List</h3>

        <div className="table-header">
          <span>ID</span>
          <span>Patient ID</span>
          <span>Created Date</span>
          <span>Algorithm ID</span>
          <span>Assessor</span>
          <span>Assessment Status</span>
          <span>Risk Level</span>
          <span>Probability</span>
        </div>

        {/* Filter results based on search term */}
        {(() => {
          const filteredResults = results.filter(result =>
            result.Patients_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.Algorithm_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.Assessor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.Assessment_Status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.Risk_Level.toLowerCase().includes(searchTerm.toLowerCase())
          );
          return filteredResults.map((result, index) => (
            <div key={index} className="table-row">
              <div>{index + 1}</div>
              <div>{result.Patients_ID}</div>
              <div>{result.Created_date}</div>
              <div>{result.Algorithm_ID}</div>
              <div>{result.Assessor}</div>
              <div>{result.Assessment_Status}</div>
              <div>{result.Risk_Level}</div>
              <div>{result.Probability}</div>
            </div>
          ));
        })()}
      </div>
    </div>
  );
}

