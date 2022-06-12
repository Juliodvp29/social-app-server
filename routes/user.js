const router = require("express").Router();
const User = require("../models/User");
const { verifyToken } = require("./verifyToken");

// UPDATE USER
router.put("/:id", verifyToken, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE USER
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET FOLLOWERS OF USER

router.get("/:id/followers", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const followers = await User.find({ _id: { $in: user.followers } });
    res.status(200).json(followers);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET FOLLOWING OF USER

router.get("/:id/following", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const following = await User.find({ _id: { $in: user.following } });
    res.status(200).json(following);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
