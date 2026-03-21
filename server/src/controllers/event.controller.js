import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";
import Event from "../models/event.model.js";
import cloudinary from "../config/cloudinary.js";

const createEvent = AsyncHandler(
    async(req, res, next) => {
        const {title, description, date, location, time} = req.body

    if (!title || !description || !date || !location || !time) {
        throw new ApiError(400, "All fields are required");
    }

    if (!req.file) {
        throw new ApiError(400, "Cover image required");
    }

    const result = await uploadToCloudinary(req.file.path);

    const event = await Event.create({
        title,
        description,
        time,
        date,
        location,
        coverImage: {
            url: result.secure_url,
            public_id: result.public_id
        }
    });

    return res.status(201).json(
        new ApiResponse(201, event, "Event created successfully")
    );


    }
)

const getAllEvents = AsyncHandler(async (req, res) => {

    const events = await Event
        .find()
        .sort({ date: 1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            events,
            "Events fetched successfully"
        )
    );

});

const getEventById = AsyncHandler(async (req, res) => {

    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            event,
            "Event fetched successfully"
        )
    );

});

const deleteEvent = AsyncHandler(async (req, res) => {

    const { id } = req.params;

    const event = await Event.findById(id);

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    // delete cover image from cloudinary
    if (event.coverImage?.public_id) {
        await cloudinary.uploader.destroy(event.coverImage.public_id);
    }

    await Event.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(
            200,
            {},
            "Event deleted successfully"
        )
    );

});

const updateEvent = AsyncHandler(async (req, res) => {

    const { id } = req.params;

    const { title, description, date, location } = req.body;

    const event = await Event.findById(id);

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    let coverImage = event.coverImage;

    if (req.file) {

        // delete old image
        if (event.coverImage?.public_id) {
            await cloudinary.uploader.destroy(event.coverImage.public_id);
        }

        const result = await uploadToCloudinary(req.file.path);

        coverImage = {
            url: result.secure_url,
            public_id: result.public_id
        };
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.location = location || event.location;
    event.coverImage = coverImage;

    await event.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            event,
            "Event updated successfully"
        )
    );

});

export {
    createEvent,
    getAllEvents,
    getEventById,
    deleteEvent,
    updateEvent
};