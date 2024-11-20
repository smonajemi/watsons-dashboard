const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config();

// Configure GridFsStorage for food PDFs
const foodPdfStorage = new GridFsStorage({
  url: process.env.DB_CONNECTION, // MongoDB connection string
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    if (file.mimetype === 'application/pdf') {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = `${buf.toString('hex')}${path.extname(file.originalname)}`;
          const fileInfo = {
            filename,
            bucketName: 'food-pdf', // Separate bucket for food PDFs
            metadata: req.body.selectControl,
            aliases: { author: req.session?.user?.username || 'Admin - Sina' },
          };
          resolve(fileInfo);
        });
      });
    }
    return null; // Skip unsupported file types
  },
});

// Configure GridFsStorage for cocktail PDFs
const cocktailPdfStorage = new GridFsStorage({
  url: process.env.DB_CONNECTION, // MongoDB connection string
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    if (file.mimetype === 'application/pdf') {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = `${buf.toString('hex')}${path.extname(file.originalname)}`;
          const fileInfo = {
            filename,
            bucketName: 'cocktail-pdf', // Separate bucket for cocktail PDFs
            metadata: req.body.selectControl,
            aliases: { author: req.session?.user?.username || 'Admin - Sina' },
          };
          resolve(fileInfo);
        });
      });
    }
    return null; // Skip unsupported file types
  },
});

// Multer middleware for handling file uploads
const foodPdfUpload = multer({ storage: foodPdfStorage });
const cocktailPdfUpload = multer({ storage: cocktailPdfStorage });

module.exports = {
  foodPdfUpload,
  cocktailPdfUpload,
};
