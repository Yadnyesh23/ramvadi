import invitation from "../assets/invitation.png"; // Replace with your actual card image
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

export default function Invitation() {
  const { language } = useLanguage();

  return (
    <section className="min-h-screen bg-[#FFF9F2] py-20 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-[#D32F2F] font-bold text-4xl md:text-5xl mb-4">
            {language === "mr" ? "निमंत्रण पत्रिका" : "Invitation Card"}
          </h1>
          <div className="h-1.5 w-24 bg-yellow-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Invitation Card Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative inline-block group"
        >
          {/* Traditional "Frame" Border */}
          <div className="p-3 md:p-6 bg-white shadow-2xl rounded-sm border-1px border-yellow-500/30 transform transition-transform duration-500 hover:scale-[1.01]">
            <img
  src={invitation}
  alt="Ram Navami Invitation"
  className="w-full max-w-md md:max-w-lg mx-auto h-auto object-contain rounded-sm"
/>
            {/* Subtle inner gold hairline */}
            <div className="absolute inset-4 md:inset-8 border border-yellow-600/10 pointer-events-none"></div>
          </div>

          {/* New: Download Action (Optional but recommended for UI) */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
             <a 
               href={invitation} 
               download="RamNavami_Invitation" 
               className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-md"
               title="Download"
             >
               📥
             </a>
          </div>
        </motion.div>

        {/* Details Section */}
        <div className="mt-12 bg-white/50 backdrop-blur-sm p-8 rounded-2xl border-t-4 border-[#D32F2F] shadow-lg max-w-lg mx-auto">
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{language === "mr" ? "दिनांक" : "DATE"}</span>
              <p className="text-2xl font-black text-[#333]">
                {language === "mr" ? "२६ मार्च २०२६" : "26 March 2026"}
              </p>
            </div>
            
            <div className="h-px bg-yellow-500/20 w-1/2 mx-auto"></div>

            <div className="flex flex-col items-center">
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{language === "mr" ? "स्थळ" : "LOCATION"}</span>
              <p className="text-xl font-bold text-[#D32F2F]">
                {language === "mr" ? "राम मंदिर, रामवाडी" : "Ram Temple, Ramwadi"}
              </p>
            </div>
          </div>

          {/* WhatsApp Share Button */}
          <motion.a
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  href={`https://wa.me/?text=Join%20us%20for%20Ram%20Navami%20Celebration%20at%20Ramwadi!%20Check%20the%20invitation%20here:%20${window.location.origin}/assets/invitation.png`}
  target="_blank"
  rel="noreferrer"
  className="flex items-center justify-center gap-3 mt-8 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold shadow-[0_10px_20px_rgba(37,211,102,0.3)] hover:opacity-90 transition-all"
>
  <span>📱</span>
  {language === "mr" ? "WhatsApp वर शेअर करा" : "Share on WhatsApp"}
</motion.a>
        </div>
      </div>
    </section>
  );
}