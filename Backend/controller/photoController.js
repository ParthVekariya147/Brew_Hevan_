// const Photo = require("../model/Photo");
// const path = require("path");

// exports.uploadPhoto = async (req, res) => {
//   try {
//     const { title } = req.body;
//     const url = `http://localhost:4000/uploads/${req.file.filename}`; // Construct the URL for the uploaded file
//     const newPhoto = new Photo({ title, url });
//     await newPhoto.save();
//     res.status(201).json({ success: true, data: newPhoto });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// exports.getAllPhotos = async (req, res) => {
//   try {
//     const photos = await Photo.find();
//     res.status(200).json({ success: true, data: photos });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// }; 


const Photo = require("../model/Photo");
const fs = require("fs");
const path = require("path");

exports.uploadPhoto = async (req, res) => {
  try {
    const { title, category } = req.body;
    const url = `http://localhost:4000/uploads/${req.file.filename}`;
    const newPhoto = new Photo({ title, url, category });
    await newPhoto.save();
    res.status(201).json({ success: true, data: newPhoto });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.find();
    res.status(200).json({ success: true, data: photos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePhoto = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ success: false, message: "Photo not found" });
    }
    
    fs.unlinkSync(path.join(__dirname, "../uploads", path.basename(photo.url)));
    await photo.deleteOne();
    res.status(200).json({ success: true, message: "Photo deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePhoto = async (req, res) => {
  try {
    const { title, category, price } = req.body;
    const photoId = req.params.id;

    // Find the existing photo
    const photo = await Photo.findById(photoId);
    if (!photo) {
      return res.status(404).json({ success: false, message: "Photo not found" });
    }

    // Update the photo's title, category, and price
    photo.title = title;
    photo.category = category;
    photo.price = price;

    // If a new image is uploaded, update the URL
    if (req.file) {
      // Delete the old image file from the server
      fs.unlinkSync(path.join(__dirname, "../uploads", path.basename(photo.url)));
      // Update the URL with the new image
      photo.url = `http://localhost:4000/uploads/${req.file.filename}`;
    }

    // Save the updated photo
    await photo.save();
    res.status(200).json({ success: true, data: photo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
