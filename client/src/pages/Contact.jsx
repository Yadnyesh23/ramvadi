import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, Landmark } from "lucide-react";

export default function Contact() {
  const { language } = useLanguage();
  const t = (en, mr) => (language === "mr" ? mr : en);

  return (
    <section className="min-h-screen bg-[#FFF9F2] py-20 px-6 relative overflow-hidden">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#D32F2F] font-serif font-bold text-4xl md:text-6xl mb-4"
          >
            {t("Contact Us", "संपर्क करा")}
          </motion.h1>
          <div className="h-1.5 w-32 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            {t(
              "Get in touch with Ramwadi Gramasth Mandal for inquiries or contributions.",
              "रामवाडी ग्रामस्थ मंडळाशी संबंधित माहिती किंवा योगदानासाठी आमच्याशी संपर्क साधा."
            )}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Details Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-[#D32F2F]">
              <h2 className="text-2xl font-serif font-bold text-[#D32F2F] mb-8 flex items-center gap-3">
                <Landmark className="text-yellow-600" />
                {t("Mandal Details", "मंडळ माहिती")}
              </h2>

              <div className="space-y-6">
                <ContactItem 
                  icon={<MapPin className="text-red-600" />} 
                  label={t("Location", "स्थान")} 
                  content="Ramwadi, Near Sudhagad Fort, Raigad, Maharashtra 412108" 
                />
                <ContactItem 
                  icon={<Phone className="text-green-600" />} 
                  label={t("Phone", "संपर्क क्रमांक")} 
                  content="+91 XXXXX XXXXX" 
                />
                <ContactItem 
                  icon={<Mail className="text-blue-600" />} 
                  label={t("Email", "ईमेल")} 
                  content="sssvmramvadi@gmail.com" 
                />
              </div>

              {/* Cultural Note */}
              <div className="mt-10 p-4 bg-orange-50 rounded-2xl border border-orange-100 italic text-gray-700 text-sm">
                {t(
                  "Join us during the grand Ram Navami celebrations held annually in our village.",
                  "दरवर्षी आमच्या गावात आयोजित केल्या जाणाऱ्या भव्य रामनवमी उत्सवात सहभागी व्हा."
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100"
          >
            <h2 className="text-3xl font-serif font-bold text-[#D32F2F] mb-8">
              {t("Send a Message", "संदेश पाठवा")}
            </h2>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">{t("Full Name", "पूर्ण नाव")}</label>
                  <input
                    type="text"
                    placeholder={t("Enter your name", "तुमचे नाव टाका")}
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all text-black"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 ml-1">{t("Email Address", "ईमेल पत्ता")}</label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all text-black"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">{t("Message", "संदेश")}</label>
                <textarea
                  placeholder={t("How can we help you?", "आम्ही तुम्हाला कशी मदत करू शकतो?")}
                  rows="5"
                  className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all resize-none text-black"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D32F2F] to-[#8B0000] text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-md"
              >
                <Send size={20} />
                {t("Send Message", "संदेश पाठवा")}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Reusable Contact Detail Component
function ContactItem({ icon, label, content }) {
  return (
    <div className="flex gap-4">
      <div className="bg-white p-3 rounded-xl shadow-md border border-gray-50 shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</h4>
        <p className="text-gray-800 font-medium leading-relaxed">{content}</p>
      </div>
    </div>
  );
}