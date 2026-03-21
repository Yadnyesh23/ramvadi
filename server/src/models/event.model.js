import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date, // Used for filtering the day (e.g., 2026-03-26)
      required: true,
    },
    time: {
      type: String, // To store "09:00 AM" or "12:00 PM"
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    coverImage: {
      url: String,
      public_id: String,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;