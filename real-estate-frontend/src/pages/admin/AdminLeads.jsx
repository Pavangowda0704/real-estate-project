import { useEffect, useMemo, useState } from "react";
import API from "../../api";

function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [purposeFilter, setPurposeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchLeads(); }, []);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");
      setLeads(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await API.put(`/leads/${id}/status`, { status });
      setLeads((prev) => prev.map((lead) => (lead._id === id ? res.data : lead)));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    try {
      await API.delete(`/leads/${id}`);
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete lead");
    }
  };

  const filteredLeads = useMemo(() => leads.filter((lead) => {
    const text = `${lead.name || ""} ${lead.phone || ""} ${lead.email || ""} ${lead.location || ""} ${lead.purpose || ""} ${lead.status || ""} ${lead.message || ""}`.toLowerCase();
    return text.includes(search.toLowerCase()) && (purposeFilter === "" || lead.purpose === purposeFilter) && (statusFilter === "" || lead.status === statusFilter);
  }), [leads, search, purposeFilter, statusFilter]);

  return (
    <div className="admin-pro-page">
      <div className="admin-pro-title-row">
        <div><h1>Buyer / Seller Leads</h1><p>Manage public form submissions and contact interested customers.</p></div>
        <span className="admin-pro-count">{filteredLeads.length} leads</span>
      </div>

      <div className="admin-pro-stats compact-stats">
        <div className="admin-pro-stat"><span>Total Leads</span><h3>{leads.length}</h3></div>
        <div className="admin-pro-stat"><span>Buy Leads</span><h3>{leads.filter((l) => l.purpose === "buy").length}</h3></div>
        <div className="admin-pro-stat"><span>Sell Leads</span><h3>{leads.filter((l) => l.purpose === "sell").length}</h3></div>
        <div className="admin-pro-stat"><span>New Leads</span><h3>{leads.filter((l) => l.status === "new").length}</h3></div>
      </div>

      <div className="admin-pro-toolbar">
        <input placeholder="Search name, phone, email, location..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={purposeFilter} onChange={(e) => setPurposeFilter(e.target.value)}><option value="">All Purposes</option><option value="buy">Buy</option><option value="sell">Sell</option></select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="">All Status</option><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select>
      </div>

      <div className="admin-pro-table-card">
        <table className="admin-pro-table admin-leads-table">
          <colgroup><col className="col-lead" /><col className="col-requirement" /><col className="col-location" /><col className="col-budget" /><col className="col-message" /><col className="col-status" /><col className="col-contact" /><col className="col-actions" /></colgroup>
          <thead><tr><th>Lead</th><th>Requirement</th><th>Location</th><th>Budget</th><th>Message</th><th>Status</th><th>Contact</th><th>Delete</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan="8" className="admin-pro-empty">Loading leads...</td></tr> : filteredLeads.length === 0 ? <tr><td colSpan="8" className="admin-pro-empty">No leads found</td></tr> : filteredLeads.map((lead) => (
              <tr key={lead._id}>
                <td><div className="admin-main-text">{lead.name}</div><span className="admin-muted-text">{lead.phone}</span><span className="admin-muted-text block-text">{lead.email || "No email"}</span></td>
                <td><span className={`admin-type-badge ${lead.purpose === "buy" ? "type-buy" : "type-sell"}`}>{lead.purpose === "buy" ? "Buy Property" : "Sell Property"}</span><span className="admin-muted-text block-text">{lead.propertyType || "Any Type"}</span></td>
                <td>{lead.location || "N/A"}</td>
                <td>{lead.budget || "N/A"}</td>
                <td><div className="admin-message-text">{lead.message || "No message"}</div></td>
                <td><select className={`admin-status-select status-${lead.status}`} value={lead.status} onChange={(e) => updateStatus(lead._id, e.target.value)}><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select></td>
                <td><div className="admin-contact-actions"><a href={`tel:${lead.phone}`}>Call</a>{lead.email && <a href={`mailto:${lead.email}`}>Email</a>}<a href={`https://wa.me/91${lead.phone}?text=Hello ${lead.name}, we received your ${lead.purpose} property request from RealEstatePro.`} target="_blank" rel="noreferrer">WhatsApp</a></div></td>
                <td><button className="admin-danger-btn" onClick={() => deleteLead(lead._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminLeads;
