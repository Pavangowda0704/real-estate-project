import { useEffect, useMemo, useState } from "react";
import API from "../../api";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");
      setUsers(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const changeRole = async (id, role) => {
    try {
      await API.put(`/admin/users/${id}/role`, { role });
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update role");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user and related data?")) return;
    try {
      await API.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };

  const filteredUsers = useMemo(() => users.filter((u) => {
    const text = `${u.name || ""} ${u.email || ""} ${u.role || ""}`.toLowerCase();
    return text.includes(search.toLowerCase()) && (roleFilter === "" || u.role === roleFilter);
  }), [users, search, roleFilter]);

  return (
    <div className="admin-pro-page">
      <div className="admin-pro-title-row">
        <div><h1>Users Management</h1><p>Manage users, role upgrades, and account access.</p></div>
        <span className="admin-pro-count">{filteredUsers.length} users</span>
      </div>

      <div className="admin-pro-toolbar">
        <input placeholder="Search name, email, role..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="">All Roles</option><option value="buyer">Buyer</option><option value="seller">Seller</option><option value="agent">Agent</option><option value="admin">Admin</option>
        </select>
      </div>

      <div className="admin-pro-table-card">
        <table className="admin-pro-table admin-users-table">
          <colgroup><col className="col-name" /><col className="col-email" /><col className="col-role" /><col className="col-change" /><col className="col-actions" /></colgroup>
          <thead><tr><th>Name</th><th>Email</th><th>Current Role</th><th>Change Role</th><th>Action</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan="5" className="admin-pro-empty">Loading users...</td></tr> : filteredUsers.length === 0 ? <tr><td colSpan="5" className="admin-pro-empty">No users found</td></tr> : filteredUsers.map((u) => (
              <tr key={u._id}>
                <td><div className="admin-main-text">{u.name || "Unnamed User"}</div></td>
                <td><span className="admin-muted-text">{u.email}</span></td>
                <td><span className={`admin-role-badge role-${u.role}`}>{u.role}</span></td>
                <td><select value={u.role} onChange={(e) => changeRole(u._id, e.target.value)}><option value="buyer">Buyer</option><option value="seller">Seller</option><option value="agent">Agent</option><option value="admin">Admin</option></select></td>
                <td><button className="admin-danger-btn" onClick={() => deleteUser(u._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
