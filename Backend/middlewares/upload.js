import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads directory exists
const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Temporarily store in uploads root, will be moved later
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename with original extension
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png/;
  const allowedDocTypes = /pdf/;

  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  // Define allowed field names for each type
  const imageFields = ['profileImage', 'imageUrl'];
  const documentFields = ['cv', 'file'];

  if (imageFields.includes(file.fieldname)) {
    // Validate image files
    if (allowedImageTypes.test(ext) && allowedImageTypes.test(mime)) {
      return cb(null, true);
    }
    return cb(new Error('Invalid image format. Only JPEG, JPG, and PNG are allowed.'));
  }

  if (documentFields.includes(file.fieldname)) {
    // Validate document files
    if (allowedDocTypes.test(ext) && mime === 'application/pdf') {
      return cb(null, true);
    }
    return cb(new Error('Invalid document format. Only PDF files are allowed.'));
  }

  // Handle unexpected fields
  cb(new Error(`Unexpected field: ${file.fieldname}. Allowed fields: ${[...imageFields, ...documentFields].join(', ')}`));
};


const upload = multer({ 
  storage,
  limits: { 
    fileSize: 10 * 1024 * 1024 
  },
  fileFilter
});

export default upload;