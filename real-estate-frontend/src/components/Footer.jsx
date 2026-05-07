import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer pro-footer">
      <div className="footer-container pro-footer-container">
        <div className="footer-section pro-footer-brand">
          <Link to="/" className="pro-footer-logo">
            <span className="logo-icon">🏡</span>
            <span>RealEstatePro</span>
          </Link>

          <p>
            Find your dream property with ease. Buy, rent, compare, and enquire
            across Bangalore with trusted agents and verified listings.
          </p>

          <div className="social-icons pro-social-icons">
            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/buy">Buy</Link>
          <Link to="/rent">Rent</Link>
          <Link to="/agents">Agents</Link>
          <Link to="/compare">Compare</Link>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <Link to="/buy">Buy Property</Link>
          <Link to="/rent">Rent Property</Link>
          <Link to="/post-property">Sell Property</Link>
          <Link to="/contact">Property Support</Link>
          <Link to="/contact">Home Loan Help</Link>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>
            <FaMapMarkerAlt /> Bangalore, India
          </p>
          <p>
            <FaPhoneAlt /> +91 98765 43210
          </p>
          <p>
            <FaEnvelope /> support@realestate.com
          </p>
        </div>
      </div>

      <div className="footer-bottom pro-footer-bottom">
        <p>© 2026 RealEstatePro. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;