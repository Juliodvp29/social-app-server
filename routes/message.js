const router = require("express").Router();
const Message = require("../models/Message");

router.post("/", async (req, res) => {
  const newMessage = new Message({
    message: req.body.message,
    userId: req.body.userId,
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(201).json({
      status: true,
      result: {
        savedMessage,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
