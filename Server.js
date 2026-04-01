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

app.listen(5000, () => console.log("Server running on port 5000"));
