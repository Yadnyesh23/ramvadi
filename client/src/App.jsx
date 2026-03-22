import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Invitation from "./pages/Invitation";
import Committee from "./pages/Committee";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import CreateEvent from "./pages/CreateEvent";
import ManageEvents from "./pages/ManageEvents";
import UploadGallery from "./pages/UploadGallery";
import ManageGallery from "./pages/ManageGallery";
import Donation from "./pages/Donation"

function App() {
  return (
    
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/invitation" element={<Invitation />} />
          <Route path="/committee" element={<Committee />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/events/create" element={<CreateEvent />} />
          <Route path="/admin/events/manage" element={<ManageEvents />} />
          <Route path="/admin/gallery/upload" element={<UploadGallery />} />
<Route path="/admin/gallery/manage" element={<ManageGallery />} />
        </Routes>
      </MainLayout>
  );
}

export default App;