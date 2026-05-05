import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <h3>RealEstate</h3>
          <p>
            Find your dream property with ease. Buy, rent, or sell properties
            across Bangalore with trusted agents and verified listings.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/buy">Buy</Link>
          <Link to="/rent">Rent</Link>
          <Link to="/post-property">Post Property</Link>
          <Link to="/agents">Agents</Link>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h4>Services</h4>
          <p>Buy Property</p>
          <p>Rent Property</p>
          <p>Sell Property</p>
          <p>Property Valuation</p>
          <p>Home Loans</p>
        </div>

        {/* Contact */}
        {/* Contact */}
<div className="footer-section">
  <h4>Contact Us</h4>
  <p>📍 Bangalore, India</p>
  <p>📞 +91 98765 43210</p>
  <p>📧 support@realestate.com</p>

  <div className="social-icons">
    <a href="#"><i className="fab fa-facebook-f"></i></a>
    <a href="#"><i className="fab fa-instagram"></i></a>
    <a href="#"><i className="fab fa-linkedin-in"></i></a>
    <a href="#"><i className="fab fa-twitter"></i></a>
  </div>
</div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 RealEstate. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;