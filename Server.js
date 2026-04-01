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
  /*console.log("DATA FROM DB:", data);
  uncomment the above line to see the data fetched from MongoDB in the server console. 
  This will help you verify that the data is being retrieved correctly before sending it to the frontend.
  */
  res.json(data);
});


app.listen(5000, () => console.log("Server running on port 5000"));
