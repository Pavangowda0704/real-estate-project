import { useEffect, useState } from "react";
import API from "../../api";

function AdminHome() {
  const [stats, setStats] = useState({
    users: 0,
    properties: 0,
    enquiries: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const users = await API.get("/admin/users");
      const properties = await API.get("/properties");
      const enquiries = await API.get("/admin/enquiries");

      setStats({
        users: users.data.length,
        properties: properties.data.length,
        enquiries: enquiries.data.length,
      });
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>

        <div className="card">
          <h3>Total Properties</h3>
          <p>{stats.properties}</p>
        </div>

        <div className="card">
          <h3>Total Enquiries</h3>
          <p>{stats.enquiries}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;