import { useState } from "react";
import API from "../api";

function LeadPopup({ onClose }) {
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    try {
      await API.post("/leads", formData);

      alert(
        "Request submitted successfully. Our team will contact you soon."
      );

      onClose();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to submit request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="startup-lead-overlay">
      <div className="startup-lead-box">
        <button
          className="startup-lead-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="startup-lead-header">
          <span>🏡</span>

          <h2>Property Requirement</h2>

          <p>
            Tell us what you're looking for and our
            team will contact you.
          </p>
        </div>

        <form
          onSubmit={submitLead}
          className="startup-lead-form"
        >
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
          >
            <option value="buy">Buy Property</option>
            <option value="sell">Sell Property</option>
          </select>

          <div className="startup-lead-grid">
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="startup-lead-grid">
            <input
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              name="location"
              placeholder="Preferred Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="startup-lead-grid">
            <input
              name="budget"
              placeholder="Budget"
              value={formData.budget}
              onChange={handleChange}
            />

            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
            >
              <option value="">
                Property Type
              </option>

              <option value="Apartment">
                Apartment
              </option>

              <option value="Villa">
                Villa
              </option>

              <option value="Plot">Plot</option>

              <option value="Commercial">
                Commercial
              </option>
            </select>
          </div>

          <textarea
            name="message"
            placeholder="Additional requirements..."
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit">
            {loading
              ? "Submitting..."
              : "Submit Requirement"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LeadPopup;