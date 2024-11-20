const express = require('express');
const { foodPdfUpload, cocktailPdfUpload } = require('../middleware/upload'); // Adjust the path as needed

const router = express.Router();

router.get("/", (req, res) => {
  res.send('Pdf is working...')
});

// Generic upload handler for food and cocktail PDFs
const handleFileUpload = (uploadMiddleware, redirectType) => async (req, res) => {
  try {
    uploadMiddleware.single('pdf')(req, res, (err) => {
      if (err) {
        console.error('Multer error:', err.message || err);
        return res.status(500).send({
          message: 'An error occurred during the file upload.',
          error: err.message || err,
        });
      }

      if (!req.file) {
        console.error('File upload error: No file or unsupported file type.');
        return res.status(400).send({
          message: 'No file uploaded or file type is not supported.',
        });
      }

      console.log('File uploaded successfully:', req.file);
      return res.redirect(`/menu-table/${req.session.user?._id}?type=${redirectType}`);
    });
  } catch (error) {
    console.error('Unexpected error:', error.message || error);
    res.status(500).send({
      message: 'An unexpected error occurred.',
      error: error.message || error,
    });
  }
};

// Route for uploading food PDFs
router.post('/pdf-food', handleFileUpload(foodPdfUpload, 'foodMenu'));

// Route for uploading cocktail PDFs
router.post('/pdf-cocktail', handleFileUpload(cocktailPdfUpload, 'cocktailMenu'));

module.exports = router;