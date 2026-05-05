import { useState } from "react";
import API from "../api";

function LeadPopup({ onClose }) {
  const [formData, setFormData] = useState({
    purpose: "buy",
    name: "",
    phone: "",
    email: "",
    location: "",
    budget: "",
    propertyType: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitLead = async (e) => {
    e.preventDefault();

    try {
      await API.post("/leads", formData);
      alert("Request submitted successfully. Our team will contact you soon.");
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit request");
    }
  };

  return (
    <div className="lead-popup-overlay-final">
      <div className="lead-popup-box-final">
        <button className="lead-popup-close-final" onClick={onClose}>
          ×
        </button>

        <div className="lead-popup-header-final">
          <span>🏡</span>
          <h2>Buy / Sell Property Request</h2>
          <p>No login required. Admin will contact you directly.</p>
        </div>

        <form onSubmit={submitLead} className="lead-popup-form-final">
          <label>I want to</label>
          <select name="purpose" value={formData.purpose} onChange={handleChange}>
            <option value="buy">Buy Property</option>
            <option value="sell">Sell Property</option>
          </select>

          <div className="lead-popup-grid-final">
            <div>
              <label>Full Name *</label>
              <input
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Phone Number *</label>
              <input
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="lead-popup-grid-final">
            <div>
              <label>Email</label>
              <input
                name="email"
                placeholder="Email optional"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Location *</label>
              <input
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="lead-popup-grid-final">
            <div>
              <label>Budget / Expected Price</label>
              <input
                name="budget"
                placeholder="Example: ₹50L - ₹80L"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
              >
                <option value="">Select type</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
          </div>

          <label>Message</label>
          <textarea
            name="message"
            placeholder="Tell us your requirement..."
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit">Submit Request</button>
        </form>
      </div>
    </div>
  );
}

export default LeadPopup;