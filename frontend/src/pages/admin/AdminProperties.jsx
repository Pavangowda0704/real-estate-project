import { useEffect, useMemo, useState } from "react";
import API from "../../api";

const emptyForm = {
  title: "",
  type: "Buy",
  propertyType: "",
  price: "",
  location: "",
  bhk: "",
  area: "",
  image: "",
  description: "",
};

function AdminProperties() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProperties(); }, []);

  const fetchProperties = async () => {
    try {
      const res = await API.get("/admin/properties");
      setProperties(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setEditingProperty(null);
    setFormData(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title || "",
      type: property.type || "Buy",
      propertyType: property.propertyType || "",
      price: property.price || "",
      location: property.location || "",
      bhk: property.bhk || "",
      area: property.area || "",
      image: property.image || "",
      description: property.description || "",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const saveProperty = async (e) => {
    e.preventDefault();
    try {
      if (editingProperty) {
        const res = await API.put(`/admin/properties/${editingProperty._id}`, formData);
        setProperties((prev) => prev.map((p) => (p._id === editingProperty._id ? res.data : p)));
        alert("Property updated successfully");
      } else {
        const res = await API.post("/admin/properties", formData);
        setProperties((prev) => [res.data, ...prev]);
        alert("Property added successfully");
      }
      setShowForm(false);
      setEditingProperty(null);
      setFormData(emptyForm);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save property");
    }
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Delete this property and related enquiries?")) return;
    try {
      await API.delete(`/admin/properties/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete property");
    }
  };

  const filteredProperties = useMemo(() => properties.filter((p) => {
    const text = `${p.title || ""} ${p.location || ""} ${p.price || ""} ${p.type || ""} ${p.propertyType || ""} ${p.owner?.name || ""} ${p.owner?.email || ""}`.toLowerCase();
    return text.includes(search.toLowerCase()) && (typeFilter === "" || p.type === typeFilter);
  }), [properties, search, typeFilter]);

  return (
    <div className="admin-pro-page">
      <div className="admin-pro-title-row">
        <div><h1>Properties Management</h1><p>Add, edit, delete, and manage all listed properties.</p></div>
        <button className="admin-primary-btn" onClick={openAddForm}>+ Add Property</button>
      </div>

      {showForm && (
        <div className="admin-pro-card admin-form-card">
          <div className="admin-pro-card-head">
            <div><h3>{editingProperty ? "Edit Property" : "Add New Property"}</h3><p>{editingProperty ? "Update the selected listing details." : "Create a new property listing as admin."}</p></div>
          </div>
          <form onSubmit={saveProperty} className="admin-pro-form-grid">
            <input name="title" placeholder="Property Title" value={formData.title} onChange={handleChange} required />
            <select name="type" value={formData.type} onChange={handleChange} required><option value="Buy">Buy</option><option value="Rent">Rent</option></select>
            <input name="propertyType" placeholder="Property Type eg: Apartment" value={formData.propertyType} onChange={handleChange} />
            <input name="price" placeholder="Price eg: ₹75 Lac" value={formData.price} onChange={handleChange} required />
            <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
            <input name="bhk" placeholder="BHK eg: 2 BHK" value={formData.bhk} onChange={handleChange} />
            <input name="area" placeholder="Area eg: 1200 sqft" value={formData.area} onChange={handleChange} />
            <input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} />
            <textarea name="description" placeholder="Property Description" value={formData.description} onChange={handleChange} rows="4" />
            <div className="admin-form-actions">
              <button className="admin-primary-btn" type="submit">{editingProperty ? "Update Property" : "Add Property"}</button>
              <button className="admin-secondary-btn" type="button" onClick={() => { setShowForm(false); setEditingProperty(null); setFormData(emptyForm); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-pro-toolbar">
        <input placeholder="Search title, location, owner, price..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}><option value="">All Types</option><option value="Buy">Buy</option><option value="Rent">Rent</option></select>
        <span className="admin-pro-count">{filteredProperties.length} properties</span>
      </div>

      <div className="admin-pro-table-card">
        <table className="admin-pro-table admin-properties-table">
          <colgroup><col className="col-title" /><col className="col-location" /><col className="col-type" /><col className="col-price" /><col className="col-owner" /><col className="col-actions" /></colgroup>
          <thead><tr><th>Title</th><th>Location</th><th>Type</th><th>Price</th><th>Owner</th><th>Actions</th></tr></thead>
          <tbody>
            {loading ? <tr><td colSpan="6" className="admin-pro-empty">Loading properties...</td></tr> : filteredProperties.length === 0 ? <tr><td colSpan="6" className="admin-pro-empty">No properties found</td></tr> : filteredProperties.map((p) => (
              <tr key={p._id}>
                <td><div className="admin-main-text">{p.title}</div><span className="admin-muted-text">{p.propertyType || "Property"}</span></td>
                <td>{p.location}</td>
                <td><span className={`admin-type-badge ${p.type === "Rent" ? "type-rent" : "type-buy"}`}>{p.type}</span></td>
                <td><strong>{p.price}</strong></td>
                <td><div className="admin-main-text">{p.owner?.name || "Admin / N/A"}</div><span className="admin-muted-text">{p.owner?.email || "No email"}</span></td>
                <td><div className="admin-action-group"><button className="admin-edit-btn" onClick={() => openEditForm(p)}>Edit</button><button className="admin-danger-btn" onClick={() => deleteProperty(p._id)}>Delete</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProperties;
