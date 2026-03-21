import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

export default function Events() {
  const { language } = useLanguage();
  const t = (en, mr) => (language === "mr" ? mr : en);

  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("2026-03-26");
  const [loading, setLoading] = useState(true);

  const dates = [
    { id: "2026-03-23", label: "23 Mar" },
    { id: "2026-03-24", label: "24 Mar" },
    { id: "2026-03-25", label: "25 Mar" },
    { id: "2026-03-26", label: "26 Mar" },
  ];

  /**
   * Robust Time Converter
   * Converts "9:00 AM" or "4:00 PM" into total minutes from midnight.
   * Logic: 
   * 9:00 AM -> 9 * 60 = 540
   * 12:00 PM -> 12 * 60 = 720
   * 4:00 PM -> (4 + 12) * 60 = 960
   */
  const convertTimeToMinutes = (timeString) => {
    if (!timeString) return 0;
    try {
      const match = timeString.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!match) return 0;

      let hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2], 10);
      const modifier = match[3].toUpperCase();

      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      return hours * 60 + minutes;
    } catch (err) {
      return 0;
    }
  };

  const filterAndSortData = (data, selectedDate) => {
    const filtered = data.filter((event) => {
      const eventDate = event.date.split("T")[0];
      return eventDate === selectedDate;
    });

    // Sort chronologically morning to night
    const sorted = filtered.sort((a, b) => {
      return convertTimeToMinutes(a.time) - convertTimeToMinutes(b.time);
    });

    setFilteredEvents(sorted);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/events`);
        const result = await res.json();

        if (result.success) {
          setAllEvents(result.data);
          filterAndSortData(result.data, activeTab);
        }
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleTabChange = (dateId) => {
    setActiveTab(dateId);
    filterAndSortData(allEvents, dateId);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F2] py-16 px-4 md:px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#D32F2F] font-bold text-4xl md:text-5xl"
        >
          {t("Festival Schedule", "उत्सव वेळापत्रक")}
        </motion.h1>
        <div className="h-1.5 w-24 bg-yellow-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Date Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-16">
        {dates.map((date) => (
          <button
            key={date.id}
            onClick={() => handleTabChange(date.id)}
            className={`px-6 md:px-8 py-3 rounded-2xl font-bold transition-all duration-300 border-2 ${
              activeTab === date.id
                ? "bg-[#D32F2F] text-white border-[#D32F2F] shadow-lg scale-105"
                : "bg-white text-gray-500 border-gray-100 hover:border-yellow-400"
            }`}
          >
            {date.label}
          </button>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="max-w-5xl mx-auto relative min-h-[400px]">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-yellow-600/10"></div>

        <div className="space-y-16">
          <AnimatePresence mode="wait">
            {loading ? (
              <div className="text-center text-gray-400 animate-pulse pt-10">Loading Events...</div>
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <motion.div
                  key={event._id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className={`relative flex items-center justify-between w-full flex-col md:flex-row ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-[#D32F2F] rounded-full z-10 shadow-md flex items-center justify-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  </div>

                  {/* Card Content */}
                  <div className="w-full md:w-[45%] ml-12 md:ml-0">
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-50 hover:shadow-2xl transition-all duration-300 group">
                      
                      {event.coverImage?.url && (
                        <div className="h-48 overflow-hidden">
                           <img 
                            src={event.coverImage.url} 
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )}

                      <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <span className="bg-red-50 text-[#D32F2F] text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                            {event.time}
                          </span>
                          <span className="text-gray-400 text-xs font-semibold tracking-tighter">
                            {event.location}
                          </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-800 mb-2 leading-tight">
                          {event.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Spacer */}
                  <div className="hidden md:block md:w-[45%]"></div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-center py-20 border-2 border-dashed border-gray-100 rounded-[3rem]"
              >
                <p className="text-gray-400 font-medium italic">
                  {t("No events found for this date.", "या तारखेसाठी कोणतेही कार्यक्रम नाहीत.")}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}