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
      <section className="post-property-page">
        <div className="post-access-card">
          <h2>Access Denied</h2>
          <p>Only agents and sellers can post properties.</p>
          <Link to="/dashboard">Back to Dashboard</Link>
        </div>
      </section>
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
    <section className="post-property-page">
      <div className="post-property-wrapper">
        <div className="post-property-info">
          <span>Agent Property Listing</span>
          <h1>Post your property professionally</h1>
          <p>
            Add complete property details so buyers can understand your listing
            clearly and contact you faster.
          </p>

          <div className="post-info-points">
            <div>
              <strong>✅ Verified Details</strong>
              <small>Add title, price, location and area.</small>
            </div>
            <div>
              <strong>🏠 Better Visibility</strong>
              <small>Your listing will appear for buyers.</small>
            </div>
            <div>
              <strong>📩 More Enquiries</strong>
              <small>Clear information increases buyer trust.</small>
            </div>
          </div>
        </div>

        <form className="post-property-form" onSubmit={handleSubmit}>
          <div className="post-form-header">
            <h2>Property Details</h2>
            <p>Fill all required fields to publish your property.</p>
          </div>

          <div className="post-form-grid">
            <input
              type="text"
              name="title"
              placeholder="Property Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
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
              placeholder="Price Example: ₹85L / ₹25K"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="location"
              placeholder="Location Example: Whitefield, Bangalore"
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
          </div>

          <textarea
            name="description"
            placeholder="Property Description"
            value={formData.description}
            onChange={handleChange}
          />

          <button type="submit">Submit Property</button>
        </form>
      </div>
    </section>
  );
}

export default PostProperty;