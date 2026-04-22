const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const os = require("os");

// console.log(os.cpus().length);

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Resume Optimizer API running ");
});


const resumeRoutes = require("./routes/resumeRoutes");
app.use("/api/resume", resumeRoutes);

const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected "))
  .catch(err => console.log(err));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});