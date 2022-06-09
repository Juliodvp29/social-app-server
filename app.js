const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log("Error:", err.message);
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("server started at port 3000");
});
