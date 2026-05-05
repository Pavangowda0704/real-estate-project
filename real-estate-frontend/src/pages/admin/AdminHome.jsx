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
        alert(error.response?.data?.message || "Failed to fetch dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-pro-page">
      <div className="admin-pro-title-row">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Platform overview, users, listings, enquiries, and leads.</p>
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="card"><h3>Total Users</h3><p>{loading ? "..." : stats.users}</p></div>
        <div className="card"><h3>Total Properties</h3><p>{loading ? "..." : stats.properties}</p></div>
        <div className="card"><h3>Total Enquiries</h3><p>{loading ? "..." : stats.enquiries}</p></div>
        <div className="card"><h3>Total Leads</h3><p>{loading ? "..." : stats.leads}</p></div>
      </div>
    </div>
  );
}

export default AdminHome;