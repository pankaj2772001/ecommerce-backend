const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// This automatically uses CLOUDINARY_URL from .env
cloudinary.config();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "dressified_products", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp"]
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
