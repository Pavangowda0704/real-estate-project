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
      <div className="section">
        <h2>Please login first</h2>
        <Link to="/login" className="details-btn">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="dashboard-header">
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Role: {user.role}</p>
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {user.role === "buyer" && (
        <div className="dashboard-card">
          <div className="dashboard-card-content">
            <h3>Buyer Dashboard</h3>
            <p>
              As a buyer, you can browse properties, compare listings, and send
              enquiries.
            </p>

            <div className="dashboard-actions">
              <Link to="/buy" className="details-btn">
                Browse Buy Properties
              </Link>

              <Link to="/rent" className="details-btn">
                Browse Rent Properties
              </Link>

              <Link to="/compare" className="details-btn">
                Compare Properties
              </Link>
            </div>
          </div>
        </div>
      )}

      {(user.role === "agent" || user.role === "seller") && (
        <div className="dashboard-card">
          <div className="dashboard-card-content">
            <h3>{user.role === "agent" ? "Agent" : "Seller"} Dashboard</h3>
            <p>
              Manage your own property listings and view enquiries from buyers.
            </p>

            <div className="dashboard-actions">
              <Link to="/agent" className="details-btn">
                Manage My Properties
              </Link>

              <Link to="/post-property" className="details-btn">
                Post New Property
              </Link>
            </div>
          </div>
        </div>
      )}

      {user.role === "admin" && (
        <div className="dashboard-card">
          <div className="dashboard-card-content">
            <h3>Admin Dashboard</h3>
            <p>You have full platform control.</p>

            <Link to="/admin" className="details-btn">
              Go to Admin Panel
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;