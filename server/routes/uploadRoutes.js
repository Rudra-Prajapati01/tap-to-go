import express from "express";

import multer from "multer";

import cloudinary
from "../config/cloudinary.js";

const router = express.Router();

const storage =
  multer.memoryStorage();

const upload =
  multer({ storage });

router.post(
  "/image",

  upload.single("image"),

  async (req, res) => {

    try {

      const file =
        req.file;

      const result =
        await cloudinary.uploader.upload(

          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,

          {
            folder: "tap-to-go",
          }
        );

      res.status(200).json({

        imageUrl:
          result.secure_url,

      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);

export default router;