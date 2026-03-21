import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

export default function ManageGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/gallery`);
      const data = await res.json();

      if (data.success) {
        setItems(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this gallery?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("Unauthorized");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/gallery/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setItems((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#D32F2F]">
          Manage Gallery
        </h1>
        <div className="h-1 w-24 bg-yellow-500 mx-auto mt-3"></div>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <div className="max-w-6xl mx-auto space-y-10">
          {items.map((item) => (
            <div key={item._id}>
              {/* Gallery Title */}
              <h2 className="text-xl font-bold mb-4 text-gray-700">
                {item.title}
              </h2>

              {/* Media Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {item.media.map((media, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow overflow-hidden"
                  >
                    {media.resource_type === "image" ? (
                      <img
                        src={media.url}
                        alt="gallery"
                        className="w-full h-40 object-cover"
                      />
                    ) : (
                      <video
                        src={media.url}
                        controls
                        className="w-full h-40 object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Delete Button */}
              <div className="mt-4">
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete Gallery
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}