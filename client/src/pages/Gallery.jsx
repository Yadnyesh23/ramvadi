import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import API_BASE_URL from "../config/api";

export default function Gallery() {
  const { language } = useLanguage();

  const [galleryData, setGalleryData] = useState([]);
  const [year, setYear] = useState(null);

  const t = (en, mr) => (language === "mr" ? mr : en);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/gallery`);
        const data = await res.json();
        
        if (data.success) {
          // Flatten all media items with type and url
          const allMedia = [];
          data.data.forEach((item) => {
            item.media.forEach((m) => {
              allMedia.push({
                type: m.resource_type === "video" ? "video" : "image",
                src: m.url,
                title: item.title,
                description: item.description,
                createdAt: item.createdAt,
              });
            });
          });

          setGalleryData(allMedia);
        }
      } catch (error) {
        console.error("Failed to fetch gallery", error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF9F1] text-[#333] px-6 py-12">
      
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#D32F2F] mb-2">
          {t("Festival Gallery", "उत्सव गॅलरी")}
        </h1>

        <div className="h-1.5 w-24 bg-[#FFC107] mx-auto mb-4 rounded-full"></div>

        <p className="text-gray-600 italic font-medium">
          {t("Ram Navmi Celebration Memories", "राम नवमी उत्सवाच्या आठवणी")}
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {galleryData.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg border-l-8 border-[#D32F2F] overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="relative group">
              {item.type === "image" ? (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="aspect-[4/3] bg-black">
                  <video
                    src={item.src}
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Badge */}
              <div className="absolute top-3 right-3 bg-[#FFF3E0] text-[#E65100] px-3 py-1 rounded-full text-xs font-bold uppercase border border-[#FFE0B2]">
                {item.type === "video"
                  ? t("Video", "व्हिडिओ")
                  : t("Photo", "फोटो")}
              </div>
            </div>

            {/* Title & Description */}
            <div className="p-4">
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}