const path = require('path');
const multer = require('multer');
const crypto = require('crypto');
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config();

// Separate bucket for food PDFs
const foodPdfStorage = new GridFsStorage({
  url: process.env.DB_CONNECTION, 
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    if (file.mimetype === 'application/pdf') {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) return reject(err);

        // const now = new Date();
        // const hours = now.getHours().toString().padStart(2, '0');
        // const minutes = now.getMinutes().toString().padStart(2, '0');
        // const militaryTime = `${hours}${minutes}`;
        // const filename = `${militaryTime}${path.extname(file.originalname)}`;

          const filename = `${buf.toString('hex')}${path.extname(file.originalname)}`;
          const fileInfo = {
            filename,
            bucketName: 'food-pdf', 
            metadata: req.body.selectControl,
            aliases: { author: req.session?.user?.username || 'Admin - Sina' },
          };
          resolve(fileInfo);
        });
      });
    }
    return null; // unsupported file types
  },
});

// Separate bucket for cocktail PDFs
const cocktailPdfStorage = new GridFsStorage({
  url: process.env.DB_CONNECTION, 
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    if (file.mimetype === 'application/pdf') {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) return reject(err);
          const filename = `${buf.toString('hex')}${path.extname(file.originalname)}`;
          const fileInfo = {
            filename,
            bucketName: 'cocktail-pdf', 
            metadata: req.body.selectControl,
            aliases: { author: req.session?.user?.username || 'Admin' },
          };
          resolve(fileInfo);
        });
      });
    }
    return null; // unsupported file types
  },
});

// handling file uploads
const foodPdfUpload = multer({ storage: foodPdfStorage });
const cocktailPdfUpload = multer({ storage: cocktailPdfStorage });

module.exports = {
  foodPdfUpload,
  cocktailPdfUpload,
};
