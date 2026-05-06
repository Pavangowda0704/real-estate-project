import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import FloatingLeadButton from "./components/FloatingLeadButton";

import Home from "./pages/Home";
import Buy from "./pages/Buy";
import Rent from "./pages/Rent";
import PropertyDetails from "./pages/PropertyDetails";
import PostProperty from "./pages/PostProperty";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Agents from "./pages/Agents";
import EditProperty from "./pages/EditProperty";
import Compare from "./pages/Compare";
import AgentDashboard from "./pages/AgentDashboard";

import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";

import AdminHome from "./pages/admin/AdminHome";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProperties from "./pages/admin/AdminProperties";
import AdminEnquiries from "./pages/admin/AdminEnquiries";
import AdminLeads from "./pages/admin/AdminLeads";

import ResetPassword from "./pages/ResetPassword";

function FloatingWrapper({ user }) {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  if (isAdminPage || user?.role === "admin") return null;

  return <FloatingLeadButton />;
}

function App() {
  const [showTop, setShowTop] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser"))
  );

  useEffect(() => {
    const updateUser = () => {
      setUser(JSON.parse(localStorage.getItem("loggedInUser")));
    };

    window.addEventListener("authChange", updateUser);
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("authChange", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/rent" element={<Rent />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/compare" element={<Compare />} />

        {/* AUTH ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* AGENT / SELLER ONLY */}
        <Route
          path="/agent"
          element={
            <ProtectedRoute allowedRoles={["agent", "seller"]}>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post-property"
          element={
            <ProtectedRoute allowedRoles={["agent", "seller"]}>
              <PostProperty />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-property/:id"
          element={
            <ProtectedRoute allowedRoles={["agent", "seller"]}>
              <EditProperty />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminHome />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminUsers />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/properties"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminProperties />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/enquiries"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminEnquiries />
              </AdminLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/leads"
          element={
            <AdminRoute>
              <AdminLayout>
                <AdminLeads />
              </AdminLayout>
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />

      {/* FAB hidden in admin */}
      <FloatingWrapper user={user} />

      {showTop && (
        <button
          className="scroll-top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          ↑
        </button>
      )}
    </BrowserRouter>
  );
}

export default App;