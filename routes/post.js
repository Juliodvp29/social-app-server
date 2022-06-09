const router = require("express").Router();
const Post = require("../models/Post");
const { verifyToken } = require("./verifyToken");

// NEW POST 
router.post("/", verifyToken, async (req, res) => {})

// DELETE POST

// GET POSTS