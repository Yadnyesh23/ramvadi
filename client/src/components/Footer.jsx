import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-card border-t border-gray-800 py-12 px-6 mt-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center md:text-left">
        
        {/* Mandal Info */}
        <div>
          <h3 className="font-devnagari text-xl text-gold mb-3 text-gray-400">
            {language === "mr"
              ? "रामवाडी रामनवमी"
              : "Ramwadi Ram Navami"}
          </h3>
          <p className="text-gray-400">
            {language === "mr"
              ? "राम मंदिर, रामवाडी"
              : "Ram Temple, Ramwadi"}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-gray-400 mb-3">
            {language === "mr" ? "लिंक्स" : "Links"}
          </h4>
          <div className="flex flex-col gap-2 text-gray-400">
            <Link to="/">Home</Link>
            <Link to="/events">Events</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/committee">Committee</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-gray-400 mb-3">
            {language === "mr" ? "संपर्क" : "Contact"}
          </h4>
          <p className="text-gray-400">
            {language === "mr"
              ? "रामवाडी मंडळ"
              : "Ramwadi Mandal"}
          </p>
          <p className="text-gray-400 mt-2">
            Email: ramwadi@gmail.com
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 mt-10 text-sm">
        © 2026 Ramwadi Ram Navami Mandal
      </div>
    </footer>
  );
}