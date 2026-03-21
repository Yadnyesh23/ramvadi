import { useState } from "react";
import API_BASE_URL from "../config/api";

export default function UploadGallery() {
  const [year, setYear] = useState("2026");
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [inputKey, setInputKey] = useState(Date.now()); // 🔥 for reset

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");

    if (!token) {
      setMessage("Unauthorized. Please login again.");
      return;
    }

    if (!files || files.length === 0) {
      setMessage("Please select at least one file");
      return;
    }

    const formData = new FormData();
    formData.append("title", `Gallery ${year}`);
    formData.append("description", "Festival images");

    // ✅ append multiple files correctly
    for (let i = 0; i < files.length; i++) {
      formData.append("media", files[i]); // MUST match multer field
    }

    try {
      const res = await fetch(`${API_BASE_URL}/gallery`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Uploaded successfully 🎉");
        setFiles([]);
        setInputKey(Date.now()); // 🔥 reset file input UI
      } else {
        setMessage(data.message || "Upload failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-[#D32F2F]">
          Upload Gallery
        </h1>
        <div className="h-1 w-24 bg-yellow-500 mx-auto mt-3"></div>
      </div>

      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8 border-l-8 border-[#D32F2F]">
        {message && (
          <p className="text-center text-red-500 mb-4">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Year */}
          <div>
            <label className="font-semibold text-black">Year</label>
            <input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border rounded-lg px-4 py-2 mt-1 text-black"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="font-semibold text-black">
              Upload Files
            </label>
            <input
              key={inputKey} // 🔥 resets input
              type="file"
              multiple
              required
              className="w-full mt-1 text-black"
              onChange={(e) =>
                setFiles(Array.from(e.target.files)) // 🔥 FIXED
              }
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#D32F2F] text-white py-3 rounded-lg font-bold hover:bg-red-700"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}