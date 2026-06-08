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
    if (canManage) fetchData();
    else setLoading(false);
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
      <main className="agent-pro-page">
        <div className="agent-access-card">
          <h2>Access Denied</h2>
          <p>Only agents and sellers can manage properties.</p>
          <Link to="/dashboard">Back to Dashboard</Link>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="agent-pro-page">
        <div className="agent-access-card">
          <h2>Loading dashboard...</h2>
          <p>Please wait while we load your listings and enquiries.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="agent-pro-page">
      <section className="agent-hero">
        <div>
          <span>{user.role === "agent" ? "Agent Panel" : "Seller Panel"}</span>
          <h1>Welcome, {user?.name || "User"}</h1>
          <p>
            Manage your property listings, track enquiries, and keep your real
            estate business organized.
          </p>
        </div>

        <Link to="/post-property" className="agent-add-btn">
          + Add Property
        </Link>
      </section>

      <section className="agent-stats">
        <div>
          <span>🏘️</span>
          <strong>{properties.length}</strong>
          <p>My Properties</p>
        </div>

        <div>
          <span>📩</span>
          <strong>{enquiries.length}</strong>
          <p>Total Enquiries</p>
        </div>

        <div>
          <span>✅</span>
          <strong>{properties.filter((p) => p.status !== "Sold").length}</strong>
          <p>Active Listings</p>
        </div>

        <div>
          <span>👤</span>
          <strong>{user.role}</strong>
          <p>Account Role</p>
        </div>
      </section>

      <section className="agent-actions">
        <Link to="/post-property">
          <span>➕</span>
          <div>
            <strong>Post Property</strong>
            <p>Add a new listing quickly.</p>
          </div>
        </Link>

        <Link to="/buy">
          <span>🏠</span>
          <div>
            <strong>View Market</strong>
            <p>Browse active properties.</p>
          </div>
        </Link>

        <Link to="/contact">
          <span>🛟</span>
          <div>
            <strong>Need Support?</strong>
            <p>Contact platform support.</p>
          </div>
        </Link>
      </section>

      <section className="agent-section">
        <div className="agent-section-head">
          <div>
            <span>Listings</span>
            <h2>My Properties</h2>
          </div>

          <Link to="/post-property">Add New</Link>
        </div>

        {properties.length === 0 ? (
          <div className="agent-empty">
            <h3>No properties posted yet</h3>
            <p>Start by adding your first property listing.</p>
            <Link to="/post-property">Post Property</Link>
          </div>
        ) : (
          <div className="agent-property-grid">
            {properties.map((p) => (
              <article key={p._id} className="agent-property-card">
                <img src={p.image} alt={p.title} />

                <div>
                  <h3>{p.title}</h3>
                  <p>{p.location}</p>

                  <div className="agent-property-meta">
                    <span>{p.price}</span>
                    <span>{p.bhk}</span>
                    <span>{p.area}</span>
                  </div>

                  <div className="agent-card-actions">
                    <Link to={`/edit-property/${p._id}`}>Edit</Link>
                    <button onClick={() => deleteProperty(p._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="agent-section">
        <div className="agent-section-head">
          <div>
            <span>Customer Leads</span>
            <h2>Enquiries For My Properties</h2>
          </div>
        </div>

        {enquiries.length === 0 ? (
          <div className="agent-empty">
            <h3>No enquiries yet</h3>
            <p>Enquiries from customers will appear here.</p>
          </div>
        ) : (
          <div className="agent-enquiry-list">
            {enquiries.map((e) => (
              <div key={e._id} className="agent-enquiry-card">
                <div>
                  <strong>{e.name}</strong>
                  <p>{e.property?.title || "Property not available"}</p>
                </div>

                <div>
                  <span>{e.email}</span>
                  <span>{e.phone}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default AgentDashboard;