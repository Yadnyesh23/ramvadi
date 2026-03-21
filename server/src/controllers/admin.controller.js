import AsyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import Event from "../models/event.model.js";
import Gallery from "../models/gallery.model.js";

const getDashboardStats = AsyncHandler(async (req, res) => {

    const totalEvents = await Event.countDocuments();

    const totalGalleries = await Gallery.countDocuments();

    const galleries = await Gallery.find();

    let totalMedia = 0;

    for (const gallery of galleries) {
        totalMedia += gallery.media.length;
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                events: totalEvents,
                galleries: totalGalleries,
                mediaFiles: totalMedia
            },
            "Dashboard stats fetched successfully"
        )
    );

});

export { getDashboardStats };