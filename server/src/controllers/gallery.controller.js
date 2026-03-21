import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";
import Gallery from "../models/gallery.model.js";

const createGallery = AsyncHandler(async (req, res) => {

    const { title, description } = req.body;

    if (!title) {
        throw new ApiError(400, "Title required");
    }

    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, "Media files required");
    }

    const uploadedMedia = [];

    for (const file of req.files) {

        const result = await uploadToCloudinary(file.path);

        uploadedMedia.push({
            url: result.secure_url,
            public_id: result.public_id,
            resource_type: result.resource_type
        });
    }

    const gallery = await Gallery.create({
        title,
        description,
        media: uploadedMedia
    });

    return res
        .status(201)
        .json(new ApiResponse(201, gallery, "Gallery created"));
});

const getAllGalleries = AsyncHandler(async (req, res) => {

    const galleries = await Gallery
        .find()
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            galleries,
            "Galleries fetched successfully"
        )
    );
});
const getGalleryById = AsyncHandler(async (req, res) => {

    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
        throw new ApiError(404, "Gallery not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            gallery,
            "Gallery fetched successfully"
        )
    );
});
const deleteGallery = AsyncHandler(async (req, res) => {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
        throw new ApiError(404, "Gallery not found");
    }

    // ✅ Safe delete from cloudinary
    for (const media of gallery.media) {
        try {
            if (media.public_id) {
                await cloudinary.uploader.destroy(
                    media.public_id,
                    {
                        resource_type: media.resource_type || "image"
                    }
                );
            }
        } catch (err) {
            console.error("Cloudinary delete error:", err);
        }
    }

    await Gallery.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200, {}, "Gallery deleted successfully")
    );
});
export { createGallery , getAllGalleries, getGalleryById, deleteGallery};