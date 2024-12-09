import path from 'path';
import { promises as fs } from 'fs';

// File type configurations
const FILE_TYPES = {
  IMAGE: {
    extensions: ['.jpg', '.jpeg', '.png'],
    mimeTypes: ['image/jpeg', 'image/jpg', 'image/png'],
    maxSize: 5 * 1024 * 1024, // 5MB
    directory: 'images'
  },
  PDF: {
    extensions: ['.pdf'],
    mimeTypes: ['application/pdf'],
    maxSize: 10 * 1024 * 1024, // 10MB
    directory: 'documents'
  }
};

// Create directory if it doesn't exist
const createDirectoryIfNotExists = async (dirPath) => {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (error) {
    console.error(`Error creating directory ${dirPath}:`, error.message);
    throw new Error('Failed to create directory');
  }
};

// Get file type configuration based on file extension and mime type
const getFileTypeConfig = (file) => {
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  for (const [type, config] of Object.entries(FILE_TYPES)) {
    if (config.extensions.includes(ext) && config.mimeTypes.includes(mime)) {
      return { type, config };
    }
  }
  return null;
};

// Generate storage path for a file
const getStoragePath = async (userId, category = 'general') => {
  const baseDir = 'uploads';
  const userDir = userId ? `user-${userId}` : 'temp';
  const categoryDir = category.toLowerCase();

  const fullPath = path.normalize(path.join(baseDir, userDir, categoryDir));
  await createDirectoryIfNotExists(fullPath);

  return fullPath;
};

// Generate public URL for stored file
const getPublicUrl = (filePath) => {
  if (!filePath) return null;
  return `/${path.relative('uploads', filePath).replace(/\\/g, '/')}`; // Replace backslashes for web URLs
};

// Process a single file upload
export const processFile = async (file, userId, category = 'general') => {
  if (!file) return null;

  const typeInfo = getFileTypeConfig(file);
  if (!typeInfo) {
    throw new Error('Unsupported file type');
  }

  // Validate file size
  if (file.size > typeInfo.config.maxSize) {
    throw new Error(
      `File size exceeds the maximum limit of ${typeInfo.config.maxSize / (1024 * 1024)} MB`
    );
  }

  const storagePath = await getStoragePath(userId, category);
  const safeFilename = path.basename(file.filename || file.originalname);
  const newPath = path.join(storagePath, safeFilename);

  try {
    await fs.rename(file.path, newPath);
  } catch (error) {
    console.error(`Error moving file to ${newPath}:`, error.message);
    throw new Error('Failed to process the uploaded file');
  }

  return {
    url: getPublicUrl(newPath),
    path: newPath,
    type: typeInfo.type.toLowerCase(),
    filename: safeFilename,
    originalname: file.originalname,
    size: file.size,
    mimetype: file.mimetype
  };
};

// Process multiple files
export const processFiles = async (files, userId, category = 'general') => {
  if (!files) return {};

  const results = {};

  const processFileGroup = async (fileOrArray) => {
    if (Array.isArray(fileOrArray)) {
      return Promise.all(fileOrArray.map(file => processFile(file, userId, category)));
    }
    return processFile(fileOrArray, userId, category);
  };

  await Promise.all(
    Object.entries(files).map(async ([fieldName, fileOrArray]) => {
      results[fieldName] = await processFileGroup(fileOrArray);
    })
  );

  return results;
};

// Delete file
export const deleteFile = async (filePath) => {
  if (filePath && (await fileExists(filePath))) {
    try {
      await fs.unlink(filePath);
      return true;
    } catch (error) {
      console.error(`Error deleting file ${filePath}:`, error.message);
      return false;
    }
  }
  return false;
};

// Check if a file exists
const fileExists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

// Clean up temporary files
export const cleanupTempFiles = async (files) => {
  if (!files) return;

  const cleanup = async (file) => {
    if (file && file.path && (await fileExists(file.path))) {
      try {
        await fs.unlink(file.path);
      } catch (error) {
        console.error(`Error cleaning up file ${file.path}:`, error.message);
      }
    }
  };

  if (Array.isArray(files)) {
    await Promise.all(files.map(cleanup));
  } else if (typeof files === 'object') {
    await Promise.all(
      Object.values(files).map(async (fileOrFiles) => {
        if (Array.isArray(fileOrFiles)) {
          await Promise.all(fileOrFiles.map(cleanup));
        } else {
          await cleanup(fileOrFiles);
        }
      })
    );
  }
};
