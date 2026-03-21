import { Link } from "react-router-dom";

export default function AdminDashboard() {

  const cards = [
    {
      title: "Create Event",
      description: "Add a new festival or event",
      path: "/admin/events/create"
    },
    {
      title: "Manage Events",
      description: "Edit or delete existing events",
      path: "/admin/events/manage"
    },
    {
      title: "Upload Gallery",
      description: "Upload festival photos or videos",
      path: "/admin/gallery/upload"
    },
    {
      title: "Manage Gallery",
      description: "View or delete gallery items",
      path: "/admin/gallery/manage"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F2] px-6 py-12">

      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#D32F2F]">
          Admin Dashboard
        </h1>

        <div className="h-1 w-24 bg-yellow-500 mx-auto mt-4 rounded-full"></div>

        <p className="text-gray-500 mt-3">
          Manage festival events and gallery
        </p>
      </div>

      {/* Dashboard Grid */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.path}
            className="bg-white p-8 rounded-xl shadow-md border-l-8 border-[#D32F2F] hover:shadow-xl hover:scale-[1.02] transition"
          >

            <h2 className="text-2xl font-bold text-[#D32F2F] mb-2">
              {card.title}
            </h2>

            <p className="text-gray-600">
              {card.description}
            </p>

          </Link>
        ))}

      </div>

    </div>
  );
}