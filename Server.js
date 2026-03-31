import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/AlgorithmTest")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

const algorithmSchema = new mongoose.Schema({
  name: String,
  purpose: String,
  version: String,
  status: String,
  lastUpdated: String,
  owner: String,
  runsThisMonth: Number,
});

const algorithms = mongoose.model("algorithms", algorithmSchema, "algorithms");

app.get("/algorithms", async (req, res) => {
  const data = await algorithms.find();
  console.log("DATA FROM DB:", data);
  res.json(data);
});


app.listen(5000, () => console.log("Server running on port 5000"));

app.get("/seed", async (req, res) => {
  try {
    const dummyDataPath = path.join(process.cwd(), "DummyData.json");
    const dummyData = JSON.parse(fs.readFileSync(dummyDataPath, "utf-8"));
    await Algorithm.insertMany(dummyData);
    res.send("Dummy data inserted");
  } catch (err) {
    console.error("Error seeding data:", err);
    res.status(500).send("Error seeding data");
  }
});
