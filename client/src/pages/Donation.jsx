import { useState } from "react";
import donation from '../assets/Donation.jpeg'

export default function DonationPage({ language = "mar" }) {
  const upiId = "boim-006869337624@boi";

  const content = {
    mar: {
      title: "सेवेत सहभागी व्हा 🙏",
      subtitle: "रामवाडी रामनवमी उत्सवासाठी आपले स्वागत आहे",
      note: "दान केल्यानंतर कृपया स्क्रीनशॉट जतन करा 🙏",
      copy: "कॉपी करा",
      copied: "UPI ID कॉपी झाले ✅"
    },
    en: {
      title: "Be a Part of the Seva 🙏",
      subtitle: "Support the Ramwadi Ram Navami Festival",
      note: "Please save the screenshot after completing the payment 🙏",
      copy: "Copy",
      copied: "UPI ID copied ✅"
    }
  };

  const [showToast, setShowToast] = useState(false);

  const copyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <section className="min-h-screen bg-[#F5EFE6] flex flex-col items-center justify-center px-6 py-16 relative">

      {/* Heading */}
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
        {content[language].title}
      </h1>
      <p className="text-gray-600 text-center mb-10">
        {content[language].subtitle}
      </p>

      {/* QR Code */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <img
          src= {donation}
          alt="QR Code"
          className="w-64 h-64 object-contain"
        />
      </div>

      {/* UPI */}
      <div className="bg-white px-6 py-4 rounded-xl shadow flex items-center gap-4">
        <span className="text-lg font-medium text-gray-800">
          {upiId}
        </span>

        <button
          onClick={copyUPI}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          {content[language].copy}
        </button>
      </div>

      {/* Note */}
      <p className="text-gray-500 mt-6 text-center text-sm">
        {content[language].note}
      </p>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-black text-white px-5 py-3 rounded-lg shadow-lg animate-fadeIn">
          {content[language].copied}
        </div>
      )}
    </section>
  );
}