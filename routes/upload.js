const router = require("express").Router();
const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../uploads");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

router.post("/profile", upload.single("file"), (req, res) => {
  console.log(`Storage locations is ${req.hostname}/${req.file.path}`);
  return res.send(req.file);
});

module.exports = router;
