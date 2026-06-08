import { useState } from "react";
import API from "../api";

function LeadForm() {
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

      setFormData({
        purpose: "buy",
        name: "",
        phone: "",
        email: "",
        location: "",
        budget: "",
        propertyType: "",
        message: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to submit request");
    }
  };

  return (
    <div className="lead-page">
      <div className="lead-hero">
        <div>
          <span className="lead-badge">Free Consultation</span>
          <h1>Buy or Sell Property Easily</h1>
          <p>
            Fill your requirement. Our admin team will contact you directly with
            the best property support.
          </p>
        </div>
      </div>

      <div className="lead-wrapper single">
  <form className="lead-form-card" onSubmit={submitLead}>
          <h2>Property Requirement Form</h2>

          <label>I am interested to</label>
          <select name="purpose" value={formData.purpose} onChange={handleChange}>
            <option value="buy">Buy Property</option>
            <option value="sell">Sell Property</option>
          </select>

          <div className="lead-grid">
            <div>
              <label>Full Name *</label>
              <input
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Phone Number *</label>
              <input
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="lead-grid">
            <div>
              <label>Email</label>
              <input
                name="email"
                placeholder="Enter email optional"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Location *</label>
              <input
                name="location"
                placeholder="Preferred / property location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="lead-grid">
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

export default LeadForm;