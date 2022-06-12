const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: false },
    content: { type: String, required: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    comments: { type: [{}], default: [{}] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
