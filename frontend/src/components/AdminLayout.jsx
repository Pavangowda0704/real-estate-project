import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaHome,
  FaEnvelope,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";

function AdminLayout({ children }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  return (
    <div className="admin-layout-v2">
      <aside className="admin-sidebar-v2">
        <div className="admin-brand-v2">
          <div className="admin-logo-v2">🏡</div>
          <div>
            <h2>RealEstatePro</h2>
            <p>Admin Panel</p>
          </div>
        </div>

        <nav className="admin-nav-v2">
          <NavLink to="/admin" end>
            <FaTachometerAlt /> Dashboard
          </NavLink>

          <NavLink to="/admin/users">
            <FaUsers /> Users
          </NavLink>

          <NavLink to="/admin/properties">
            <FaHome /> Properties
          </NavLink>

          <NavLink to="/admin/enquiries">
            <FaEnvelope /> Enquiries
          </NavLink>

          <NavLink to="/admin/leads">
            <FaClipboardList /> Leads
          </NavLink>
        </nav>

        <div className="admin-user-v2">
          <strong>{user?.name || "Admin User"}</strong>
          <span>{user?.email}</span>
        </div>

        <button onClick={handleLogout} className="admin-logout-v2">
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      <main className="admin-main-v2">
        {children || <Outlet />}
      </main>
    </div>
  );
}

export default AdminLayout;