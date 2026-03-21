import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(""); // New state for sorting
  const [location, setLocation] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("adminToken");

   
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("time", time); // Vital for your timeline logic
    formData.append("location", location);
    formData.append("coverImage", coverImage);

    try {
      const res = await fetch(`${API_BASE_URL}/events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Note: Content-Type is handled automatically by FormData
        },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Event created successfully 🎉");
        setTitle("");
        setDescription("");
        setDate("");
        setTime("");
        setLocation("");
        setCoverImage(null);

        setTimeout(() => {
          navigate("/admin/events/manage");
        }, 1200);
      } else {
        setMessage(data.message || "Failed to create event");
      }
    } catch (error) {
      setMessage("Something went wrong with the server connection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#D32F2F]">Create New Event</h1>
        <div className="h-1 w-24 bg-yellow-500 mx-auto mt-3 rounded-full"></div>
      </div>

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 border-l-8 border-[#D32F2F]">
        {message && (
          <div className={`p-3 mb-6 rounded text-center font-bold ${message.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="font-semibold text-gray-700">Event Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Ram Janma Sohala"
              className="w-full mt-1 border rounded-lg px-4 py-2 text-black focus:ring-2 focus:ring-red-500 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold text-gray-700">Description</label>
            <textarea
              required
              rows="3"
              placeholder="Describe the importance of this event..."
              className="w-full mt-1 border rounded-lg px-4 py-2 text-black focus:ring-2 focus:ring-red-500 outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Date & Time Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-gray-700">Event Date</label>
              <input
                type="date"
                required
                className="w-full mt-1 border rounded-lg px-4 py-2 text-black"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700">Event Time</label>
              <input
                type="text"
                required
                placeholder="09:00 AM"
                className="w-full mt-1 border rounded-lg px-4 py-2 text-black"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="font-semibold text-gray-700">Location</label>
            <input
              type="text"
              required
              placeholder="e.g. Ramwadi Temple Main Hall"
              className="w-full mt-1 border rounded-lg px-4 py-2 text-black"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="font-semibold text-gray-700">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              required
              className="w-full mt-1 text-black bg-gray-50 p-2 rounded-lg border border-dashed border-gray-300"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#D32F2F] text-white py-3 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}