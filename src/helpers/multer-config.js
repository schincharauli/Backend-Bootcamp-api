import multer from "multer";

export const createMulterImageConfigs = (destination) => {
  const fileStorage = multer.diskStorage({
    destination: (_, __, callback) => {
      callback(null, destination);
    },
    filename: (_, file, callback) => {
      const timestamp = new Date().toISOString().replace(/:/g, "-");
      const name = file.originalname.replace(/[^a-zA-Z0-9.]/g, "_");
      callback(null, timestamp + name);
    },
  });

  const fileFilter = (__, file, callback) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  };

  const upload = multer({
    storage: fileStorage,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter,
  });

  return upload;
};
