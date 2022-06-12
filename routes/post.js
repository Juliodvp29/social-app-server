const router = require("express").Router();
const Post = require("../models/Post");
const { verifyToken } = require("./verifyToken");

// NEW POST
router.post("/", verifyToken, async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    createdAt: req.body.createdAt,
    likes: req.body.likes,
    comments: req.body.comments,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json({
      status: true,
      result: {
        savedPost,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE POST
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POST

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POSTS

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET POST SORTED BY NUMBER OF LIKES
router.get("/likes", async (req, res) => {
  try {
    const posts = await Post.find().sort({ likes: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});
