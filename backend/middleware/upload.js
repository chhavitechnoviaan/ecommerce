// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import crypto from 'crypto';

// const CUSTOM_DIR = path.resolve(process.cwd(), 'uploads', 'customorder');
// fs.mkdirSync(CUSTOM_DIR, { recursive: true });

// const customStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, CUSTOM_DIR);
//   },
//   filename: (req, file, cb) => {
//     const rnd = crypto.randomBytes(6).toString('hex');
//     const ext = path.extname(file.originalname) || '';
//     cb(null, `${Date.now()}-${rnd}${ext}`);
//   }
// });

// const customFileFilter = (req, file, cb) => {
//   const allowed = [
//     'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
//     'application/pdf'
//   ];
//   if (allowed.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Unsupported file type. Allowed: images and pdf'), false);
//   }
// };

// export const uploadCustomOrder = multer({
//   storage: customStorage,
//   limits: { fileSize: 10 * 1024 * 1024 },
//   fileFilter: customFileFilter
// });


// const PRODUCT_DIR = path.resolve(process.cwd(), 'uploads', 'products');
// fs.mkdirSync(PRODUCT_DIR, { recursive: true });

// const productStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, PRODUCT_DIR);
//   },
//   filename: (req, file, cb) => {
//     const rnd = crypto.randomBytes(6).toString('hex');
//     const ext = path.extname(file.originalname) || '';
//     cb(null, `${Date.now()}-${rnd}${ext}`);
//   }
// });

// const productFileFilter = (req, file, cb) => {
//   const allowed = [
//     'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'
//   ];
//   if (allowed.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Unsupported file type. Allowed: jpeg, jpg, png, webp, gif'), false);
//   }
// };

// export const uploadProducts = multer({
//   storage: productStorage,
//   limits: { fileSize: 10 * 1024 * 1024 },
//   // fileFilter: productFileFilter
// });

import multer from "multer";
import path from "path";
import fs from "fs";
import crypto from "crypto";

// PRODUCTS FOLDER
const PRODUCT_DIR = path.resolve(
  process.cwd(),
  "uploads",
  "products"
);

// AUTO CREATE FOLDER
fs.mkdirSync(PRODUCT_DIR, {
  recursive: true,
});

// STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PRODUCT_DIR);
  },

  filename: (req, file, cb) => {
    const random =
      crypto.randomBytes(6).toString("hex");

    const ext =
      path.extname(file.originalname);

    cb(
      null,
      `${Date.now()}-${random}${ext}`
    );
  },
});

// FILE FILTER
const fileFilter = (
  req,
  file,
  cb
) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only image files allowed"
      ),
      false
    );
  }
};

// EXPORT
export const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});