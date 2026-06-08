import { useEffect, useState } from "react";
import API from "../api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersRes = await API.get("/admin/users");
      const propRes = await API.get("/admin/properties");
      const enquiryRes = await API.get("/enquiries");

      setUsers(usersRes.data);
      setProperties(propRes.data);
      setEnquiries(enquiryRes.data);
    } catch (err) {
      alert("Admin access failed");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;
    await API.delete(`/admin/users/${id}`);
    setUsers(users.filter((u) => u._id !== id));
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Delete property?")) return;
    await API.delete(`/admin/properties/${id}`);
    setProperties(properties.filter((p) => p._id !== id));
  };

  return (
    <div className="section admin-dashboard">
      <h2>Admin Control Panel</h2>

      {/* 📊 Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <h3>{users.length}</h3>
          <p>Total Users</p>
        </div>

        <div className="stat-card">
          <h3>{properties.length}</h3>
          <p>Total Properties</p>
        </div>

        <div className="stat-card">
          <h3>{enquiries.length}</h3>
          <p>Total Enquiries</p>
        </div>
      </div>

      {/* USERS */}
      <div className="admin-section">
        <h3>Users</h3>

        <div className="admin-table">
          {users.map((u) => (
            <div key={u._id} className="admin-row">
              <span>{u.name}</span>
              <span>{u.email}</span>
              <span className="role">{u.role}</span>

              <button onClick={() => deleteUser(u._id)} className="danger-btn">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* PROPERTIES */}
      <div className="admin-section">
        <h3>Properties</h3>

        <div className="admin-table">
          {properties.map((p) => (
            <div key={p._id} className="admin-row">
              <span>{p.title}</span>
              <span>{p.location}</span>
              <span>{p.price}</span>

              <button
                onClick={() => deleteProperty(p._id)}
                className="danger-btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ENQUIRIES */}
      <div className="admin-section">
        <h3>Enquiries</h3>

        <div className="admin-table">
          {enquiries.map((e) => (
            <div key={e._id} className="admin-row">
              <span>{e.name}</span>
              <span>{e.email}</span>
              <span>{e.phone}</span>
              <span>{e.property?.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;