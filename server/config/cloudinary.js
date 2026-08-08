const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary SDK credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer storage engine to directly upload to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'thinked_notes',
    resource_type: 'auto',
    allowed_formats: ['pdf', 'png', 'jpg', 'jpeg', 'txt', 'doc', 'docx'],
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
