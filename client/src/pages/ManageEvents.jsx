import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

export default function ManageEvents() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/events`);
      const data = await res.json();

      if (data.success) {
        setEvents(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm("Delete this event?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        setEvents(events.filter((event) => event._id !== id));
      } else {
        alert(data.message);
      }

    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] px-6 py-12">

      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#D32F2F]">
          Manage Events
        </h1>

        <div className="h-1 w-24 bg-yellow-500 mx-auto mt-3 rounded-full"></div>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500">Loading events...</p>
      )}

      {/* Event List */}
      <div className="max-w-5xl mx-auto space-y-6">

        {events.map((event) => (

          <div
            key={event._id}
            className="bg-white rounded-xl shadow-md border-l-8 border-[#D32F2F] p-6 flex flex-col md:flex-row md:items-center md:justify-between"
          >

            {/* Event Info */}
            <div>

              <h2 className="text-xl font-bold text-[#D32F2F]">
                {event.title}
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                {new Date(event.date).toLocaleDateString()}
              </p>

              <p className="text-gray-700 mt-2">
                {event.description}
              </p>

            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4 md:mt-0">

              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(event._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

        {events.length === 0 && !loading && (
          <p className="text-center text-gray-500">
            No events found
          </p>
        )}

      </div>

    </div>
  );
}