import express from "express";

import {
    createGallery,
    getAllGalleries,
    getGalleryById,
    deleteGallery
} from "../controllers/gallery.controller.js";

import verifyAdmin from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
    "/",
    verifyAdmin,
    upload.array("media", 20),
    createGallery
);

router.get("/", getAllGalleries);

router.get("/:id", getGalleryById);

router.delete("/:id", verifyAdmin, deleteGallery);

export default router;