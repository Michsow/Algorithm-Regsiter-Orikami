import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/AlgorithmTest");

const algorithmSchema = new mongoose.Schema({
  name: String,
  purpose: String,
  version: String,
  status: String,
  lastUpdated: String,
  owner: String,
  runsThisMonth: Number,
});

const Algorithm = mongoose.model("Algorithm", algorithmSchema, "AlgorithmRegister");

const patientSchema = new mongoose.Schema({
  name: String,
  dateOfBirth: String,
  gender: String,
  status: String,
  created: String,
  Assessments: { type: Number, default: 0 },
});

const Patient = mongoose.model("Patient", patientSchema, "Patients");

const resultSchema = new mongoose.Schema({
  Patients_ID: String,
  Created_date: String,
  Algorithm_ID: String,
  Assessor: String,
  Assessment_Status: String,
  Risk_Level: String,
  Probability: Number,
});

const Result = mongoose.model("Result", resultSchema, "Results");

app.get("/algorithms", async (req, res) => {
  const data = await Algorithm.find();
  res.json(data);
});

app.get("/algorithms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const algorithm = await Algorithm.findById(id);
    if (!algorithm) {
      return res.status(404).json({ error: "Algorithm not found" });
    }
    res.json(algorithm);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch algorithm" });
  }
});

app.post("/algorithms", async (req, res) => {
  try {
    const body = req.body;
    const algorithm = new Algorithm({
      name: body.name,
      purpose: body.purpose,
      version: body.version,
      status: body.status,
      lastUpdated: body.lastUpdated,
      owner: body.owner,
      runsThisMonth: body.runsThisMonth || 0,
    });
    const saved = await algorithm.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create algorithm" });
  }
});

app.put("/algorithms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updated = await Algorithm.findByIdAndUpdate(
      id,
      {
        name: body.name,
        purpose: body.purpose,
        version: body.version,
        status: body.status,
        lastUpdated: body.lastUpdated,
        owner: body.owner,
        runsThisMonth: body.runsThisMonth || 0,
      },
      { returnDocument: 'after' }
    );
    if (!updated) {
      return res.status(404).json({ error: "Algorithm not found" });
    }
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update algorithm" });
  }
});

app.get("/patients", async (req, res) => {
  const data = await Patient.find();
  res.json(data);
});

app.get("/patients/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch patient" });
  }
});

app.post("/patients", async (req, res) => {
  try {
    const body = req.body;
    const patient = new Patient({
      name: body.name,
      dateOfBirth: body.dateOfBirth,
      gender: body.gender,
      status: body.status,
      created: body.created || new Date().toISOString(),
      Assessments: body.Assessments || 0,
    });
    const saved = await patient.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create patient" });
  }
});

app.put("/patients/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updated = await Patient.findByIdAndUpdate(
      id,
      {
        name: body.name,
        dateOfBirth: body.dateOfBirth,
        gender: body.gender,
        status: body.status,
        created: body.created,
      },
      { returnDocument: 'after' }
    );
    if (!updated) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update patient" });
  }
});

app.get("/results", async (req, res) => {
  const data = await Result.find();
  res.json(data);
});

app.get("/results/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Result.findById(id);
    if (!result) {
      return res.status(404).json({ error: "Result not found" });
    }
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch result" });
  }
});

app.post("/results", async (req, res) => {
  try {
    const body = req.body;
    const result = new Result({
      Patients_ID: body.Patients_ID,
      Created_date: body.Created_date || new Date().toISOString(),
      Algorithm_ID: body.Algorithm_ID,
      Assessor: body.Assessor,
      Assessment_Status: body.Assessment_Status,
      Risk_Level: body.Risk_Level,
      Probability: body.Probability || 0,
    });
    const saved = await result.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create result" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

