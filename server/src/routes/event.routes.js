import express from "express";

import {
    createEvent,
    getAllEvents,
    getEventById,
    deleteEvent,
    updateEvent
} from "../controllers/event.controller.js";

import verifyAdmin from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/", verifyAdmin, upload.single("coverImage"), createEvent);

router.get("/", getAllEvents);

router.get("/:id", getEventById);

router.put(
    "/:id",
    verifyAdmin,
    upload.single("coverImage"),
    updateEvent
);

router.delete(
    "/:id",
    verifyAdmin,
    deleteEvent
);

export default router;