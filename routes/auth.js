const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({
      status: true,
      result: {
        savedUser,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN

router.post("/login", async (re, res) => {
  const { username, password } = re.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    } else {
      const decryptedPass = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASS_SEC
      ).toString(CryptoJS.enc.Utf8);
      if (decryptedPass !== password) {
        return res.status(401).json({ message: "Invalid Credentials" });
      }
      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
        },
        process.env.ACCESS_TOKEN_SEC,
        { expiresIn: "24h" }
      );
      res.status(200).json({
        status: true,
        result: {
          token,
          username: user.username,
        },
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
