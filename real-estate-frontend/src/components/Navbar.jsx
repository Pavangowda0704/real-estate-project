import { Link, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

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

  const closeMenu = () => setMenuOpen(false);

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    window.dispatchEvent(new Event("authChange"));
    setMenuOpen(false);
    navigate("/login");
  };

  const isAdmin = user?.role === "admin";

  return (
    <>
      <header className="pro-navbar">
        <Link to="/" className="pro-navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">🏡</span>
          <span>RealEstatePro</span>
        </Link>

        <nav className="pro-navbar-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/buy">Buy</NavLink>
          <NavLink to="/rent">Rent</NavLink>
          <NavLink to="/agents">Agents</NavLink>
          <NavLink to="/compare">Compare</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <div className="pro-navbar-actions">
          {user ? (
            <>
              <Link
                to={isAdmin ? "/admin" : "/dashboard"}
                className="pro-user-pill"
              >
                <FaUserCircle />
                {isAdmin ? "Admin" : "Dashboard"}
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
        >
          <FaBars />
        </button>
      </header>

      {menuOpen && (
        <div className="pro-mobile-overlay" onClick={closeMenu}></div>
      )}

      <aside className={`pro-mobile-menu ${menuOpen ? "show" : ""}`}>
        <div className="pro-mobile-menu-header">
          <Link to="/" className="pro-navbar-logo" onClick={closeMenu}>
            <span className="logo-icon">🏡</span>
            <span>RealEstatePro</span>
          </Link>

          <button className="pro-mobile-close" onClick={closeMenu}>
            <FaTimes />
          </button>
        </div>

        <nav className="pro-mobile-links">
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/buy" onClick={closeMenu}>
            Buy Properties
          </NavLink>
          <NavLink to="/rent" onClick={closeMenu}>
            Rent Properties
          </NavLink>
          <NavLink to="/agents" onClick={closeMenu}>
            Agents
          </NavLink>
          <NavLink to="/compare" onClick={closeMenu}>
            Compare
          </NavLink>
          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>
          <NavLink to="/contact" onClick={closeMenu}>
            Contact
          </NavLink>
        </nav>

        <div className="pro-mobile-actions">
          {user ? (
            <>
              <Link
                to={isAdmin ? "/admin" : "/dashboard"}
                onClick={closeMenu}
                className="pro-mobile-primary"
              >
                {isAdmin ? "Go to Admin Panel" : "Go to Dashboard"}
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