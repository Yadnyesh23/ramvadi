import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import RamPhoto from "../../assets/Ram.png"
import RamPhoto2 from '../../assets/RamLaxmanSita1.png'

export default function Hero() {
  const { language } = useLanguage();

  // --- Countdown Logic ---
  const targetDate = new Date("March 26, 2026 00:00:00").getTime();

  const calculateTime = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;
    return {
      days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((difference / 1000 / 60) % 60)),
      seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full bg-[#FFF9F2] py-16 px-6 overflow-hidden">
      {/* Background Decorative Motif */}
      <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
        <span className="text-[20rem]">🕉️</span>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* Left Side: Traditional Deity Display */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex gap-4 w-full md:w-1/2 justify-center"
        >
          <div className="border-8 border-white p-1 shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-1/2 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
            <img src={RamPhoto2} alt="Deity 1" className="w-full h-auto object-cover" />
          </div>
          <div className="border-8 border-white p-1 shadow-[0_20px_50px_rgba(0,0,0,0.15)] w-1/2 transform rotate-2 hover:rotate-0 transition-transform duration-500 mt-8">
            <img src={RamPhoto} alt="Deity 2" className="w-full h-auto object-cover" />
          </div>
        </motion.div>

        {/* Right Side: Information & Countdown */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-[#D32F2F] font-bold text-lg mb-2 tracking-widest uppercase">
            {language === "mr" ? "॥ रामो विग्रहवान् धर्मः ॥" : "|| Rama is the embodiment of Dharma ||"}
          </h2>
          
          <h1 className="text-4xl md:text-6xl font-bold text-[#333] mb-6 leading-tight">
            {language === "mr" ? "रामवाडी रामनवमी उत्सव २०२६" : "Ramwadi Ram Navami 2026"}
          </h1>
          
          <p className="text-gray-600 text-lg mb-8 italic">
            {language === "mr" 
              ? "रामवाडी महोत्सवाच्या अमृत महोत्सवी वर्षात आपले सहर्ष स्वागत!"
              : "Welcome to the grand Amrut Mahotsav celebrations of Ramwadi!"}
          </p>

          {/* --- The Countdown Component --- */}
          <div className="flex justify-center md:justify-start gap-3 mb-10">
            <TimeBox value={timeLeft.days} label={language === "mr" ? "दिवस" : "Days"} />
            <TimeBox value={timeLeft.hours} label={language === "mr" ? "तास" : "Hours"} />
            <TimeBox value={timeLeft.minutes} label={language === "mr" ? "मि." : "Min"} />
            <TimeBox value={timeLeft.seconds} label={language === "mr" ? "से." : "Sec"} />
          </div>

          <Link
            to="/invitation"
            className="inline-block bg-[#D32F2F] text-white px-10 py-4 rounded-full font-bold shadow-xl hover:bg-[#B71C1C] transition-all hover:scale-105 active:scale-95"
          >
            {language === "mr" ? "अधिक माहिती पहा" : "View Details"}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

// Sub-component for the Countdown boxes
function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white border-b-4 border-yellow-500 w-16 h-16 md:w-20 md:h-20 rounded shadow-md group hover:bg-yellow-50 transition-colors">
      <span className="text-xl md:text-2xl font-black text-[#D32F2F] group-hover:scale-110 transition-transform">
        {value}
      </span>
      <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-tighter">
        {label}
      </span>
    </div>
  );
}