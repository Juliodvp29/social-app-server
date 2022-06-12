const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    birthdate: { type: String, required: true },
    password: { type: String, required: true },
    imgProfile: { type: String, default: "" },
    followers: { type: [String], default: [] },
    following: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
