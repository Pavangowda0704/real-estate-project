import { useEffect, useState } from "react";
import API from "../../api";

function AdminHome() {
  const [stats, setStats] = useState({
    users: 0,
    properties: 0,
    enquiries: 0,
    leads: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Admin stats error:", error);
        alert(error.response?.data?.message || "Failed to load admin dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Users",
      value: stats.users,
      icon: "👥",
      note: "Registered platform users",
    },
    {
      title: "Total Properties",
      value: stats.properties,
      icon: "🏘️",
      note: "Active property listings",
    },
    {
      title: "Total Enquiries",
      value: stats.enquiries,
      icon: "📩",
      note: "Buyer enquiry requests",
    },
    {
      title: "Total Leads",
      value: stats.leads,
      icon: "📋",
      note: "Captured lead contacts",
    },
  ];

  return (
    <div className="admin-dashboard-pro">
      <div className="admin-hero-pro">
        <div>
          <span className="admin-kicker">Admin Overview</span>
          <h1>Dashboard</h1>
          <p>
            Monitor users, listings, enquiries, and leads from one professional
            control center.
          </p>
        </div>

        <div className="admin-hero-badge">
          <span>Live</span>
          <strong>Platform Status</strong>
        </div>
      </div>

      <div className="admin-stat-grid">
        {cards.map((card) => (
          <div className="admin-stat-card" key={card.title}>
            <div className="admin-stat-top">
              <span className="admin-stat-icon">{card.icon}</span>
              <span className="admin-stat-chip">Updated</span>
            </div>

            <h3>{card.title}</h3>

            <p className="admin-stat-number">
              {loading ? "..." : card.value}
            </p>

            <span className="admin-stat-note">{card.note}</span>
          </div>
        ))}
      </div>

      <div className="admin-dashboard-bottom">
        <div className="admin-insight-card">
          <h2>Quick Insights</h2>
          <p>
            Your platform currently has{" "}
            <strong>{loading ? "..." : stats.properties}</strong> properties and{" "}
            <strong>{loading ? "..." : stats.users}</strong> users.
          </p>
        </div>

        <div className="admin-insight-card">
          <h2>Next Actions</h2>
          <p>
            Review new enquiries, verify property listings, and manage user
            roles regularly.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;