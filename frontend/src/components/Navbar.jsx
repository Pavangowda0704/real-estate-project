import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaHome,
  FaBuilding,
  FaKey,
  FaUsers,
  FaExchangeAlt,
  FaInfoCircle,
  FaPhoneAlt,
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

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
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    window.dispatchEvent(new Event("authChange"));
    setMenuOpen(false);
    navigate("/login");
  };

  // Role handling
  const isAdmin = user?.role === "admin";

  const isAgentOrSeller =
    user?.role === "agent" || user?.role === "seller";

  const dashboardPath = isAdmin
    ? "/admin"
    : isAgentOrSeller
    ? "/agent"
    : "/dashboard";

  const links = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/buy", label: "Buy", icon: <FaBuilding /> },
    { to: "/rent", label: "Rent", icon: <FaKey /> },
    { to: "/agents", label: "Agents", icon: <FaUsers /> },
    { to: "/compare", label: "Compare", icon: <FaExchangeAlt /> },
    { to: "/about", label: "About", icon: <FaInfoCircle /> },
    { to: "/contact", label: "Contact", icon: <FaPhoneAlt /> },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <header className="pro-navbar">
        <Link to="/" className="pro-navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">🏡</span>
          <span>RealEstatePro</span>
        </Link>

        <nav className="pro-navbar-links">
          {links.map((item) => (
            <NavLink key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="pro-navbar-actions">
          {user ? (
            <>
              <Link to={dashboardPath} className="pro-user-pill">
                <FaUserCircle />

                {isAdmin
                  ? "Admin"
                  : isAgentOrSeller
                  ? "Agent Panel"
                  : "Dashboard"}
              </Link>

              <button onClick={logout} className="pro-logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="pro-login-link">
                Login
              </Link>

              <Link to="/register" className="pro-register-btn">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          className="pro-mobile-toggle"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <FaBars />
        </button>
      </header>

      {/* Overlay */}
      {menuOpen && (
        <button
          className="pro-mobile-overlay"
          onClick={closeMenu}
          aria-label="Close menu"
        />
      )}

      {/* Mobile Menu */}
      <aside className={`pro-mobile-menu ${menuOpen ? "show" : ""}`}>
        <div className="pro-mobile-menu-header">
          <Link to="/" className="pro-navbar-logo" onClick={closeMenu}>
            <span className="logo-icon">🏡</span>
            <span>RealEstatePro</span>
          </Link>

          <button
            className="pro-mobile-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="pro-mobile-links">
          {links.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={closeMenu}>
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="pro-mobile-actions">
          {user ? (
            <>
              <Link
                to={dashboardPath}
                onClick={closeMenu}
                className="pro-mobile-primary"
              >
                {isAdmin
                  ? "Go to Admin Panel"
                  : isAgentOrSeller
                  ? "Go to Agent Panel"
                  : "Go to Dashboard"}
              </Link>

              <button onClick={logout} className="pro-mobile-danger">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="pro-mobile-secondary"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={closeMenu}
                className="pro-mobile-primary"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
}

export default Navbar;