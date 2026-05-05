import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import PropertyCard from "../components/PropertyCard";
import API from "../api";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [allProperties, setAllProperties] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const [enquiry, setEnquiry] = useState({
    name: "",
    email: "",
    phone: "",
    message: "I am interested in this property.",
  });

  const [emiData, setEmiData] = useState({
    loanAmount: "",
    interestRate: "8.5",
    years: "20",
  });

  const [emiResult, setEmiResult] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await API.get(`/properties/${id}`);
        setProperty(res.data);
        document.title = `${res.data.title} | RealEstate`;
      } catch (error) {
        console.log(error);
        document.title = "Property Not Found | RealEstate";
      }
    };

    const fetchAllProperties = async () => {
      try {
        const res = await API.get("/properties");
        setAllProperties(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperty();
    fetchAllProperties();
  }, [id]);

  if (!property) {
  return (
    <div className="section">
      <h2>Loading Property...</h2>
      <p>If this stays here, check that the URL contains MongoDB _id.</p>
    </div>
  );
}

  const galleryImages = [
    property.image,
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
  ];

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const similarProperties = allProperties
    .filter((item) => item._id !== property._id && item.type === property.type)
    .slice(0, 3);

  const handleEnquiryChange = (e) => {
    setEnquiry({
      ...enquiry,
      [e.target.name]: e.target.value,
    });
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
  setShowLoginPopup(true);
  return;
}

    try {
      await API.post("/enquiries", {
        ...enquiry,
        property: property._id,
      });

      alert("Enquiry sent successfully!");

      setEnquiry({
        name: "",
        email: "",
        phone: "",
        message: "I am interested in this property.",
      });
    } catch (error) {
      alert("Failed to send enquiry");
    }
  };

  const handleEmiChange = (e) => {
    setEmiData({
      ...emiData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateEmi = (e) => {
    e.preventDefault();

    const principal = Number(emiData.loanAmount);
    const annualRate = Number(emiData.interestRate);
    const years = Number(emiData.years);

    if (!principal || !annualRate || !years) {
      alert("Please enter valid EMI details");
      return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    setEmiResult({
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
    });
  };

  return (
    <div className="section property-details-page">
      <div className="details-top">
        <div>
          <span
            className={`property-tag ${
              property.type === "Rent" ? "rent" : "buy"
            }`}
          >
            For {property.type}
          </span>

          <h2>{property.title}</h2>
          <p className="details-location">📍 {property.location}</p>
        </div>

        <div className="details-price-box">
          <h3>{property.price}</h3>
          <p>
            {property.bhk} • {property.area}
          </p>

          <div className="property-stats">
            <span>👁️ 1,245 Views</span>
            <span>📅 Posted 3 days ago</span>
            <span>✅ Verified</span>
          </div>
        </div>
      </div>

      <div className="image-slider">
        <button className="slider-btn left" onClick={prevImage}>
          ❮
        </button>

        <img
          src={galleryImages[currentImage]}
          alt="Property"
          className="slider-image"
        />

        <button className="slider-btn right" onClick={nextImage}>
          ❯
        </button>

        <div className="thumbnail-row">
          {galleryImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Property thumbnail"
              className={currentImage === index ? "active-thumb" : ""}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </div>

      <div className="details-layout">
        <div className="details-main">
          <div className="details-card">
            <h3>Property Highlights</h3>

            <div className="highlight-grid">
              <div>
                <strong>{property.bhk}</strong>
                <span>Configuration</span>
              </div>

              <div>
                <strong>{property.area}</strong>
                <span>Built-up Area</span>
              </div>

              <div>
                <strong>{property.type}</strong>
                <span>Purpose</span>
              </div>

              <div>
                <strong>Ready to Move</strong>
                <span>Status</span>
              </div>
            </div>
          </div>

          <div className="details-card">
            <h3>Description</h3>
            <p>
              {property.description ||
                "This premium property is located in a well-connected area with modern amenities, excellent road access, nearby schools, hospitals, shopping centers, and public transport facilities."}
            </p>
          </div>

          <div className="details-card">
            <h3>Amenities</h3>

            <div className="amenities-grid">
              <span>🏊 Swimming Pool</span>
              <span>🏋️ Gym</span>
              <span>🚗 Parking</span>
              <span>🛡️ 24/7 Security</span>
              <span>🌳 Garden</span>
              <span>⚡ Power Backup</span>
              <span>🛗 Lift</span>
              <span>🎮 Club House</span>
            </div>
          </div>

          <div className="details-card">
            <h3>Location</h3>

            <div className="map-box">
              <div className="map-overlay">
                <h4>📍 {property.location}</h4>
                <p>Explore nearby schools, hospitals & transport</p>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${property.location}`}
                  target="_blank"
                  rel="noreferrer"
                  className="map-btn"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>

          <div className="details-card">
            <h3>EMI Calculator</h3>

            <form className="emi-calculator" onSubmit={calculateEmi}>
              <div>
                <label>Loan Amount</label>
                <input
                  type="number"
                  name="loanAmount"
                  placeholder="Example: 5000000"
                  value={emiData.loanAmount}
                  onChange={handleEmiChange}
                />
              </div>

              <div>
                <label>Interest Rate (%)</label>
                <input
                  type="number"
                  name="interestRate"
                  value={emiData.interestRate}
                  onChange={handleEmiChange}
                />
              </div>

              <div>
                <label>Loan Tenure (Years)</label>
                <input
                  type="number"
                  name="years"
                  value={emiData.years}
                  onChange={handleEmiChange}
                />
              </div>

              <button type="submit">Calculate EMI</button>
            </form>

            {emiResult && (
              <div className="emi-result">
                <h4>Estimated Monthly EMI</h4>
                <h2>₹{emiResult.emi.toLocaleString("en-IN")}</h2>

                <p>
                  <strong>Total Interest:</strong> ₹
                  {emiResult.totalInterest.toLocaleString("en-IN")}
                </p>

                <p>
                  <strong>Total Payment:</strong> ₹
                  {emiResult.totalPayment.toLocaleString("en-IN")}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="details-sidebar">
          <div className="agent-box">
            <h3>Contact Agent</h3>

            <div className="agent-profile">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Agent"
              />

              <div>
                <h4>Rahul Sharma</h4>
                <p>Verified Property Consultant</p>
              </div>
            </div>

            <p>
              <strong>Phone:</strong> +91 98765 43210
            </p>
            <p>
              <strong>Email:</strong> agent@realestate.com
            </p>

            <div className="agent-actions">
              <a href="tel:+919876543210" className="call-btn">
                Call Now
              </a>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="whatsapp-btn"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <form className="enquiry-form" onSubmit={handleEnquirySubmit}>
            <h3>Send Enquiry</h3>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={enquiry.name}
              onChange={handleEnquiryChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={enquiry.email}
              onChange={handleEnquiryChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={enquiry.phone}
              onChange={handleEnquiryChange}
              required
            />

            <textarea
              name="message"
              value={enquiry.message}
              onChange={handleEnquiryChange}
            ></textarea>

            <button type="submit">Send Enquiry</button>
          </form>
        </div>
      </div>

      <section className="similar-section">
        <h2>Similar Properties</h2>

        <div className="property-grid">
          {similarProperties.length === 0 ? (
            <div className="empty-state">
              <h3>No Similar Properties</h3>
              <p>Try exploring other buy or rent properties.</p>
            </div>
          ) : (
            similarProperties.map((item) => (
              <PropertyCard key={item._id} property={item} />
            ))
          )}
        </div>
      </section>
      {showLoginPopup && (
  <div className="login-popup-overlay">
    <div className="login-popup">
      <button
        className="popup-close"
        onClick={() => setShowLoginPopup(false)}
      >
        ×
      </button>

      <h3>Login Required</h3>
      <p>Please login or register to send an enquiry for this property.</p>

      <div className="popup-actions">
        <a href="/login" className="popup-login-btn">
          Login
        </a>

        <a href="/register" className="popup-register-btn">
          Register
        </a>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default PropertyDetails;