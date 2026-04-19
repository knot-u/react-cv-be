const fs = require('fs');
const path = require('path');
const multer = require('multer');

const uploadDir = path.resolve(process.cwd(), process.env.UPLOAD_DIR || 'uploads');
const maxFileSizeMb = Number(process.env.MAX_FILE_SIZE_MB) || 2;

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, uploadDir),
  filename: (_req, file, callback) => {
    const safeName = file.originalname.replace(/\s+/g, '-').toLowerCase();
    callback(null, `${Date.now()}-${safeName}`);
  }
});

const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

const upload = multer({
  storage,
  limits: { fileSize: maxFileSizeMb * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      const error = new Error('Unsupported image type');
      error.statusCode = 400;
      return callback(error);
    }

    return callback(null, true);
  }
});

module.exports = {
  upload
};
