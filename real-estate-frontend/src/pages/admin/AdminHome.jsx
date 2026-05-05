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

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>{loading ? "..." : stats.users}</p>
        </div>

        <div className="card">
          <h3>Total Properties</h3>
          <p>{loading ? "..." : stats.properties}</p>
        </div>

        <div className="card">
          <h3>Total Enquiries</h3>
          <p>{loading ? "..." : stats.enquiries}</p>
        </div>

        <div className="card">
          <h3>Total Leads</h3>
          <p>{loading ? "..." : stats.leads}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;