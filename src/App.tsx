import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

import Algorithms from "./pages/AlgorithmPage";
import Patients from "./pages/PatientsPage";
import Results from "./pages/ResultsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Algorithms />} />
          <Route path="patients" element={<Patients />} />
          <Route path="results" element={<Results />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
