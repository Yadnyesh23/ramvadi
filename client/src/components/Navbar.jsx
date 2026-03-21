import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const navText = {
    mr: {
      title: "श्रीराम सेवा सामाजिक विकास मंडळ, रामवाडी",
      home: "मुख्यपृष्ठ",
      events: "कार्यक्रम",
      gallery: "छायाचित्रे",
      invitation: "निमंत्रण",
      committee: "समिती",
      about: "आमच्याबद्दल",
      contact: "संपर्क",
      admin: "प्रशासन",
      toggle: "EN",
      live: "थेट",
    },
    en: {
      title: "Shree Ram Seva Samajik Vikas Mandal, Ramwadi",
      home: "Home",
      events: "Events",
      gallery: "Gallery",
      invitation: "Invitation",
      committee: "Committee",
      about: "About Us",
      contact: "Contact",
      admin: "Admin",
      toggle: "मराठी",
      live: "LIVE",
    },
  };

  const t = navText[language];

  const menuLinks = [
    { path: "/", label: t.home },
    { path: "/about", label: t.about },
    { path: "/events", label: t.events },
    { path: "/gallery", label: t.gallery },
    { path: "/committee", label: t.committee },
    { path: "/contact", label: t.contact },
  ];

  return (
    <header className="sticky top-0 z-50 shadow-xl font-sans">
      {/* 1. Top Decorative Banner */}
      <div className="bg-[#D32F2F] border-b-4 border-[#FFD700] py-3 md:py-4 text-center px-4 relative">
        <h1 className="text-lg md:text-3xl font-bold text-white drop-shadow-md tracking-wide truncate max-w-4xl mx-auto">
          {t.title}
        </h1>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-4 md:px-10 py-3 flex justify-between items-center relative">
        
        {/* Left: Mobile Toggle & Live Badge */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-[#D32F2F] p-1 focus:outline-none hover:bg-red-50 rounded-lg transition-colors"
          >
            <span className="text-3xl">☰</span>
          </button>

          
        </div>

        {/* Center: Desktop Links */}
        <div className="hidden lg:flex gap-8 text-[#333] font-bold text-sm uppercase tracking-wider">
          {menuLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className="hover:text-[#D32F2F] transition-all relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D32F2F] transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right: Admin & Language Toggle */}
        <div className="flex gap-2 md:gap-4 items-center">
          <Link
            to="/admin/login"
            className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white px-3 py-1.5 md:px-5 md:py-2 rounded-lg text-[10px] md:text-sm font-bold transition-all shadow-md active:scale-95"
          >
            {t.admin}
          </Link>

          <button
            onClick={toggleLanguage}
            className="border-2 border-[#D32F2F] text-[#D32F2F] hover:bg-[#D32F2F] hover:text-white px-2 py-1 md:px-4 md:py-1.5 rounded-lg font-bold text-[10px] md:text-sm transition-all shadow-sm"
          >
            {t.toggle}
          </button>
        </div>

        {/* 3. Mobile Drawer Menu (with AnimatePresence) */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Dark Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm"
              />

              {/* Sidebar Drawer */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 w-[280px] h-full bg-white shadow-2xl z-[70] lg:hidden flex flex-col border-r-4 border-[#FFD700]"
              >
                {/* Drawer Header */}
                <div className="bg-[#D32F2F] p-6 text-white flex justify-between items-center shadow-md">
                  <div className="font-bold text-sm">
                    {language === "mr" ? "श्री राम मंडळ" : "Shree Ram Mandal"}
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-2xl hover:rotate-90 transition-transform p-1"
                  >
                    ✕
                  </button>
                </div>

                {/* Drawer Links */}
                <div className="flex flex-col p-6 gap-2">
                  {menuLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-bold text-[#333] border-b border-gray-50 py-4 hover:text-[#D32F2F] flex justify-between items-center group transition-colors"
                    >
                      {link.label}
                      <span className="text-gray-300 group-hover:text-[#D32F2F] transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  ))}
                  
                  {/* Additional Mobile-Only Link */}
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="mt-6 bg-[#D32F2F] text-white text-center py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
                  >
                    {t.admin}
                  </Link>
                </div>

                {/* Drawer Footer */}
                <div className="mt-auto p-6 bg-gray-50 border-t border-gray-100">
                  <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">
                    © 2026 Ramwadi Mandal
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}