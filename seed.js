import mongoose from "mongoose";
import fs from "fs";

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

const data = JSON.parse(fs.readFileSync("DummyData.json", "utf8"));

async function seed() {
  try {
    await Algorithm.deleteMany(); // Clear existing data
    await Algorithm.insertMany(data);
    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
}

seed();