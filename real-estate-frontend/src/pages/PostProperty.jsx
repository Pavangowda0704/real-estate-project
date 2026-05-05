import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function PostProperty() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const canPost = user?.role === "agent" || user?.role === "seller";

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

  if (!canPost) {
    return (
      <div className="section">
        <h2>Access Denied</h2>
        <p>Only agents and sellers can post properties.</p>
        <Link to="/dashboard" className="details-btn">
          Back to Dashboard
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

    const propertyData = {
      ...formData,
      image:
        formData.image ||
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
    };

    try {
      await API.post("/properties", propertyData);
      alert("Property posted successfully!");
      navigate("/agent");
    } catch (error) {
      alert(error.response?.data?.message || "Error posting property");
    }
  };

  return (
    <div className="section">
      <h2>Post Your Property</h2>

      <form className="post-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Property Title"
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
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="bhk"
          placeholder="BHK Example: 2 BHK"
          value={formData.bhk}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="area"
          placeholder="Area Example: 1200 sq.ft"
          value={formData.area}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL optional"
          value={formData.image}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Property Description"
          value={formData.description}
          onChange={handleChange}
        />

        <button type="submit">Submit Property</button>
      </form>
    </div>
  );
}

export default PostProperty;