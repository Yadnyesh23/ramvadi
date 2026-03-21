import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API_BASE_URL from "../../config/api";

export default function GalleryPreview() {
  const { language } = useLanguage();

  const [images, setImages] = useState([]);

  const title = language === "mr" ? "छायाचित्रे" : "Festival Gallery";
  const subtitle =
    language === "mr"
      ? "मागील वर्षांची काही खास क्षणचित्रे"
      : "Glimpses of previous years";

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/gallery`);
        const data = await res.json();

        if (data.success) {
          const galleries = data.data;

          // collect all images
          let imgs = [];

          galleries.forEach((gallery) => {
            gallery.media.forEach((item) => {
              if (item.resource_type === "image") {
                imgs.push(item.url);
              }
            });
          });

          setImages(imgs.slice(0, 5)); // only first 5 images
        }
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section className="bg-[#FFF9F2] py-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D32F2F]/5 rounded-full -mr-32 -mt-32"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[#D32F2F] font-bold text-4xl md:text-5xl mb-2">
            {title}
          </h2>
          <div className="h-1 w-24 bg-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium italic">{subtitle}</p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4 h-[600px]">
          {images.length > 0 && (
            <>
              {/* Main Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="col-span-2 row-span-2 relative group overflow-hidden border-8 border-white shadow-xl"
              >
                <img
                  src={images[0]}
                  alt="Gallery"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 border border-yellow-500/30 m-2"></div>
              </motion.div>

              {/* Small Images */}
              <div className="col-span-2 grid grid-cols-2 gap-4">
                {images.slice(1, 3).map((img, i) => (
                  <PhotoFrame key={i} src={img} />
                ))}
              </div>

              <div className="col-span-2 grid grid-cols-2 gap-4">
                {images.slice(3, 5).map((img, i) => (
                  <PhotoFrame key={i} src={img} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Button */}
        <div className="text-center mt-16">
          <Link
            to="/gallery"
            className="inline-block border-2 border-[#D32F2F] text-[#D32F2F] hover:bg-[#D32F2F] hover:text-white px-10 py-3 rounded-full font-bold transition-all shadow-md"
          >
            {language === "mr" ? "सर्व छायाचित्रे पहा" : "View All Photos"}
          </Link>
        </div>
      </div>
    </section>
  );
}

function PhotoFrame({ src }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative overflow-hidden border-4 border-white shadow-lg h-full group"
    >
      <img
        src={src}
        alt="Gallery"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 border border-yellow-600/20 m-1"></div>
    </motion.div>
  );
}