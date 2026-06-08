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
    window.scrollTo(0, 0);

    const fetchProperty = async () => {
      try {
        const res = await API.get(`/properties/${id}`);

        setProperty(res.data);

        document.title = `${res.data.title} | RealEstatePro`;
      } catch (error) {
        console.log(error);
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
      <div className="property-loading">
        <div className="property-loading-box">
          <h2>Loading Property...</h2>
          <p>Please wait while we fetch property details.</p>
        </div>
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
    .filter(
      (item) =>
        item._id !== property._id &&
        item.type === property.type
    )
    .slice(0, 3);

  const handleEnquiryChange = (e) => {
    setEnquiry({
      ...enquiry,
      [e.target.name]: e.target.value,
    });
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();

    const loggedInUser = JSON.parse(
      localStorage.getItem("loggedInUser")
    );

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
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)) /
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
    <div className="startup-details-page">
      <section className="startup-hero-details">
        <div className="startup-hero-left">
          <div
            className={`startup-type-badge ${
              property.type === "Rent"
                ? "startup-rent"
                : "startup-buy"
            }`}
          >
            For {property.type}
          </div>

          <h1>{property.title}</h1>

          <p className="startup-location">
            📍 {property.location}
          </p>

          <div className="startup-detail-tags">
            <span>{property.bhk}</span>
            <span>{property.area}</span>
            <span>Verified</span>
            <span>Ready to Move</span>
          </div>
        </div>

        <div className="startup-price-box">
          <h2>{property.price}</h2>

          <div className="startup-mini-stats">
            <span>👁️ 1,245 Views</span>
            <span>📅 Posted Recently</span>
          </div>
        </div>
      </section>

      <section className="startup-gallery">
        <div className="startup-main-image">
          <button
            className="startup-slider-btn left"
            onClick={prevImage}
          >
            ❮
          </button>

          <img
            src={galleryImages[currentImage]}
            alt="Property"
          />

          <button
            className="startup-slider-btn right"
            onClick={nextImage}
          >
            ❯
          </button>
        </div>

        <div className="startup-thumbnails">
          {galleryImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumbnail"
              className={
                currentImage === index
                  ? "startup-thumb-active"
                  : ""
              }
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </section>

      <div className="startup-details-layout">
        <main className="startup-details-main">
          <div className="startup-details-card">
            <h3>Overview</h3>

            <div className="startup-overview-grid">
              <div>
                <strong>{property.bhk}</strong>
                <span>BHK</span>
              </div>

              <div>
                <strong>{property.area}</strong>
                <span>Area</span>
              </div>

              <div>
                <strong>{property.type}</strong>
                <span>Purpose</span>
              </div>

              <div>
                <strong>Ready</strong>
                <span>Status</span>
              </div>
            </div>
          </div>

          <div className="startup-details-card">
            <h3>Description</h3>

            <p className="startup-description">
              {property.description ||
                "This premium property is located in a prime area with excellent connectivity, schools, hospitals, shopping centers, and modern amenities nearby."}
            </p>
          </div>

          <div className="startup-details-card">
            <h3>Amenities</h3>

            <div className="startup-amenities">
              <span>🏊 Swimming Pool</span>
              <span>🏋️ Gym</span>
              <span>🚗 Parking</span>
              <span>🛡️ Security</span>
              <span>🌳 Garden</span>
              <span>⚡ Power Backup</span>
              <span>🛗 Lift</span>
              <span>🎮 Club House</span>
            </div>
          </div>

          <div className="startup-details-card">
            <h3>Location</h3>

            <div className="startup-map-box">
              <h4>📍 {property.location}</h4>

              <p>
                Explore nearby schools, hospitals &
                transport facilities.
              </p>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${property.location}`}
                target="_blank"
                rel="noreferrer"
                className="startup-map-btn"
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          <div className="startup-details-card">
            <h3>EMI Calculator</h3>

            <form
              className="startup-emi-form"
              onSubmit={calculateEmi}
            >
              <input
                type="number"
                name="loanAmount"
                placeholder="Loan Amount"
                value={emiData.loanAmount}
                onChange={handleEmiChange}
              />

              <input
                type="number"
                name="interestRate"
                placeholder="Interest Rate"
                value={emiData.interestRate}
                onChange={handleEmiChange}
              />

              <input
                type="number"
                name="years"
                placeholder="Years"
                value={emiData.years}
                onChange={handleEmiChange}
              />

              <button type="submit">
                Calculate EMI
              </button>
            </form>

            {emiResult && (
              <div className="startup-emi-result">
                <h2>
                  ₹
                  {emiResult.emi.toLocaleString(
                    "en-IN"
                  )}
                </h2>

                <p>
                  Total Interest: ₹
                  {emiResult.totalInterest.toLocaleString(
                    "en-IN"
                  )}
                </p>

                <p>
                  Total Payment: ₹
                  {emiResult.totalPayment.toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>
            )}
          </div>
        </main>

        <aside className="startup-details-sidebar">
          <div className="startup-agent-box">
            <h3>Contact Agent</h3>

            <div className="startup-agent-profile">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Agent"
              />

              <div>
                <h4>Rahul Sharma</h4>
                <p>Verified Consultant</p>
              </div>
            </div>

            <a
              href="tel:+919876543210"
              className="startup-call-btn"
            >
              Call Now
            </a>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="startup-whatsapp-btn"
            >
              WhatsApp
            </a>
          </div>

          <form
            className="startup-enquiry-box"
            onSubmit={handleEnquirySubmit}
          >
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
            />

            <button type="submit">
              Send Enquiry
            </button>
          </form>
        </aside>
      </div>

      <section className="startup-similar">
        <h2>Similar Properties</h2>

        <div className="property-grid">
          {similarProperties.length === 0 ? (
            <div className="empty-state">
              <h3>No Similar Properties</h3>
            </div>
          ) : (
            similarProperties.map((item) => (
              <PropertyCard
                key={item._id}
                property={item}
              />
            ))
          )}
        </div>
      </section>

      {showLoginPopup && (
        <div className="login-popup-overlay">
          <div className="login-popup">
            <button
              className="popup-close"
              onClick={() =>
                setShowLoginPopup(false)
              }
            >
              ×
            </button>

            <h3>Login Required</h3>

            <p>
              Please login or register to send an
              enquiry.
            </p>

            <div className="popup-actions">
              <a
                href="/login"
                className="popup-login-btn"
              >
                Login
              </a>

              <a
                href="/register"
                className="popup-register-btn"
              >
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