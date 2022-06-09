const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("Error:", err.message);
  });

app.listen(process.env.PORT || 3000, () => {
  console.log("server started at port 3000");
});
