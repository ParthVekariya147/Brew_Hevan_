

const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const photoController = require("../controller/photoController");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single("image"), photoController.uploadPhoto);
router.get("/photos", photoController.getAllPhotos);
router.delete("/photos/:id", photoController.deletePhoto);
router.put("/photos/:id", upload.single("image"), photoController.updatePhoto);

module.exports = router;
