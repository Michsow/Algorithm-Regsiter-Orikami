import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./AlgorithmPage.css"; // Reuse styles or create specific ones

// Type definition for an algorithm object
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

export default function AlgorithmDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [algorithm, setAlgorithm] = useState<Algorithm | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/algorithms/${id}`)
        .then((res) => res.json())
        .then((data) => setAlgorithm(data))
        .catch(() => navigate("/")); // Redirect if not found
    }
  }, [id, navigate]);

  if (!algorithm) {
    return <div>Loading...</div>;
  }

  return (
    <div className="algorithm-details">
      <button onClick={() => navigate("/")}>Back to Algorithms</button>
      <h1>{algorithm.name}</h1>
      <div className="details-content">
        <p><strong>Purpose:</strong> {algorithm.purpose}</p>
        <p><strong>Version:</strong> {algorithm.version}</p>
        <p><strong>Status:</strong> {algorithm.status}</p>
        <p><strong>Last Updated:</strong> {algorithm.lastUpdated}</p>
        <p><strong>Owner:</strong> {algorithm.owner}</p>
        <p><strong>Runs This Month:</strong> {algorithm.runsThisMonth}</p>
        {/* Future content can be added here */}
      </div>
    </div>
  );
}