import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="profile-dashboard">
        <div className="profile-card">
          <h2>Please login first</h2>

          <Link to="/login" className="profile-btn">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="profile-dashboard">
      {/* PROFILE SECTION */}
      <section className="profile-header-card">
        <div className="profile-avatar">
          {user.name?.charAt(0).toUpperCase()}
        </div>

        <div className="profile-user-info">
          <h1>{user.name}</h1>

          <p>{user.email}</p>

          <span className="profile-role">
            {user.role?.toUpperCase()}
          </span>
        </div>

        <button onClick={handleLogout} className="profile-logout-btn">
          Logout
        </button>
      </section>

      {/* ACCOUNT DETAILS */}
      <section className="profile-section-card">
        <div className="profile-section-title">
          <h2>Account Details</h2>
        </div>

        <div className="profile-details-grid">
          <div className="profile-detail-box">
            <span>Full Name</span>
            <h3>{user.name}</h3>
          </div>

          <div className="profile-detail-box">
            <span>Email Address</span>
            <h3>{user.email}</h3>
          </div>

          <div className="profile-detail-box">
            <span>Account Role</span>
            <h3>{user.role}</h3>
          </div>

          <div className="profile-detail-box">
            <span>Status</span>
            <h3>Active</h3>
          </div>
        </div>
      </section>

      {/* LIKED PROPERTIES */}
      <section className="profile-section-card">
        <div className="profile-section-title">
          <h2>Liked Properties</h2>
        </div>

        <div className="profile-empty-card">
          <div className="profile-empty-icon">❤️</div>

          <h3>No liked properties yet</h3>

          <p>
            Save your favorite homes and properties to access them quickly.
          </p>

          <Link to="/buy" className="profile-btn">
            Explore Properties
          </Link>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="profile-section-card">
        <div className="profile-section-title">
          <h2>Quick Actions</h2>
        </div>

        <div className="profile-actions-grid">
          <Link to="/buy" className="profile-action-card">
            <div className="profile-action-icon">🏠</div>
            <h3>Buy Properties</h3>
          </Link>

          <Link to="/rent" className="profile-action-card">
            <div className="profile-action-icon">🔑</div>
            <h3>Rent Properties</h3>
          </Link>

          <Link to="/compare" className="profile-action-card">
            <div className="profile-action-icon">⚖️</div>
            <h3>Compare</h3>
          </Link>

          {(user.role === "agent" || user.role === "seller") && (
            <Link to="/agent" className="profile-action-card">
              <div className="profile-action-icon">📋</div>
              <h3>Manage Properties</h3>
            </Link>
          )}

          {user.role === "admin" && (
            <Link to="/admin" className="profile-action-card">
              <div className="profile-action-icon">🛠️</div>
              <h3>Admin Panel</h3>
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;