const express = require('express');
const multer = require('multer');
const VideoController = require('../controllers/video.controller');

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/videos'); // Define the directory where uploaded videos will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Define the filename for uploaded videos
  }
});

// Multer file filter function
const fileFilter = (req, file, cb) => {
  // Check file type and reject if not allowed (e.g., allow only video files)
  if (file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only video files are allowed'), false);
  }
};

// Initialize Multer with storage and file filter options
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Route handler for uploading videos
routes.post("/video", upload.single('file'), VideoController.createVideo);
routes.get("/get-video", VideoController.getVideo);
routes.put("/update-video/:id", VideoController.updateVideo);
routes.delete("/delete-video", VideoController.deleteVideo);
routes.get('/get-video-details/:id', VideoController.getVideoDetails);
routes.get('/videos', VideoController.getAllVideos);

module.exports = router;
