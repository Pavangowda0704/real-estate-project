import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function AgentDashboard() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const [properties, setProperties] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const canManage = user?.role === "agent" || user?.role === "seller";

  useEffect(() => {
    if (canManage) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [canManage]);

  const fetchData = async () => {
    try {
      const propRes = await API.get("/properties/my");
      const enqRes = await API.get("/enquiries/my");

      setProperties(propRes.data);
      setEnquiries(enqRes.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Delete this property?")) return;

    try {
      await API.delete(`/properties/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      alert("Property deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  if (!canManage) {
    return (
      <div className="section">
        <h2>Access Denied</h2>
        <p>Only agents and sellers can manage properties.</p>
        <Link to="/dashboard" className="details-btn">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="section">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="dashboard-header">
        <div>
          <h2>{user.role === "agent" ? "Agent" : "Seller"} Dashboard</h2>
          <p>Manage only your own property listings.</p>
        </div>

        <Link to="/post-property" className="details-btn">
          + Add Property
        </Link>
      </div>

      <h3>My Properties</h3>

      {properties.length === 0 ? (
        <p>No properties posted yet.</p>
      ) : (
        <div className="dashboard-list">
          {properties.map((p) => (
            <div key={p._id} className="dashboard-card">
              <img src={p.image} alt={p.title} />

              <div className="dashboard-card-content">
                <h3>{p.title}</h3>
                <p>{p.location}</p>
                <p>{p.price}</p>
                <p>
                  {p.bhk} | {p.area}
                </p>

                <Link to={`/edit-property/${p._id}`} className="edit-btn">
                  Edit Property
                </Link>

                <button
                  onClick={() => deleteProperty(p._id)}
                  className="delete-btn"
                >
                  Delete Property
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 style={{ marginTop: "30px" }}>Enquiries For My Properties</h3>

      {enquiries.length === 0 ? (
        <p>No enquiries yet.</p>
      ) : (
        enquiries.map((e) => (
          <div key={e._id} className="admin-row">
            <span>{e.name}</span>
            <span>{e.email}</span>
            <span>{e.phone}</span>
            <span>{e.property?.title || "N/A"}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default AgentDashboard;