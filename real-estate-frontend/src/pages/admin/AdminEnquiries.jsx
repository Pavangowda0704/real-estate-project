import { useEffect, useMemo, useState } from "react";
import API from "../../api";

function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchEnquiries(); }, []);

  const fetchEnquiries = async () => {
    try {
      const res = await API.get("/enquiries");
      setEnquiries(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch enquiries");
    } finally {
      setLoading(false);
    }
  };

  const deleteEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await API.delete(`/enquiries/${id}`);
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete enquiry");
    }
  };

  const filteredEnquiries = useMemo(() => enquiries.filter((e) => {
    const text = `${e.name || ""} ${e.email || ""} ${e.phone || ""} ${e.property?.title || ""} ${e.message || ""}`.toLowerCase();
    return text.includes(search.toLowerCase());
  }), [enquiries, search]);

  return (
    <div className="admin-pro-page">
      <div className="admin-pro-title-row">
        <div><h1>Enquiries Management</h1><p>Track customer enquiries, contact details, and property interest.</p></div>
        <span className="admin-pro-count">{filteredEnquiries.length} enquiries</span>
      </div>

      <div className="admin-pro-toolbar"><input placeholder="Search name, email, phone, property, message..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>

      <div className="admin-pro-table-card">
        <table className="admin-pro-table admin-enquiries-table">
          <colgroup><col className="col-name" /><col className="col-contact" /><col className="col-phone" /><col className="col-property" /><col className="col-message" /><col className="col-actions" /></colgroup>
          <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Property</th><th>Message</th><th>Action</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan="6" className="admin-pro-empty">Loading enquiries...</td></tr> : filteredEnquiries.length === 0 ? <tr><td colSpan="6" className="admin-pro-empty">No enquiries found</td></tr> : filteredEnquiries.map((e) => (
              <tr key={e._id}>
                <td><div className="admin-main-text">{e.name}</div></td>
                <td><span className="admin-muted-text">{e.email}</span></td>
                <td>{e.phone}</td>
                <td>{e.property?.title || "N/A"}</td>
                <td><div className="admin-message-text">{e.message || "No message"}</div></td>
                <td><button className="admin-danger-btn" onClick={() => deleteEnquiry(e._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminEnquiries;
