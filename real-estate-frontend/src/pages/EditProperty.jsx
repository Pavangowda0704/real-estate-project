import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import API from "../api";

function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const canEdit = user?.role === "agent" || user?.role === "seller";

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    propertyType: "",
    price: "",
    location: "",
    bhk: "",
    area: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await API.get(`/properties/${id}`);
        const property = res.data;

        const ownerId =
          typeof property.owner === "object"
            ? property.owner?._id
            : property.owner;

        if (!canEdit || ownerId !== user?._id) {
          setAllowed(false);
          return;
        }

        setAllowed(true);
        setFormData({
          title: property.title || "",
          type: property.type || "",
          propertyType: property.propertyType || "",
          price: property.price || "",
          location: property.location || "",
          bhk: property.bhk || "",
          area: property.area || "",
          image: property.image || "",
          description: property.description || "",
        });
      } catch (error) {
        alert(error.response?.data?.message || "Failed to load property");
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, canEdit, user?._id]);

  if (loading) {
    return (
      <div className="section">
        <h2>Loading property...</h2>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="section">
        <h2>Access Denied</h2>
        <p>You can edit only your own properties.</p>
        <Link to="/agent" className="details-btn">
          Back to My Properties
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/properties/${id}`, formData);
      alert("Property updated successfully!");
      navigate("/agent");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="section">
      <h2>Edit Property</h2>

      <form className="post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Property For</option>
          <option value="Buy">Buy</option>
          <option value="Rent">Rent</option>
        </select>

        <select
          name="propertyType"
          value={formData.propertyType}
          onChange={handleChange}
          required
        >
          <option value="">Property Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Plot">Plot</option>
          <option value="Commercial">Commercial</option>
        </select>

        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="bhk"
          value={formData.bhk}
          onChange={handleChange}
        />

        <input
          type="text"
          name="area"
          value={formData.area}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">Update Property</button>
      </form>
    </div>
  );
}

export default EditProperty;