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
    <footer className="pro-footer">
      <div className="pro-footer-container">
        <div className="pro-footer-brand">
          <Link to="/" className="pro-footer-logo">
            <span className="logo-icon">🏡</span>
            <span>RealEstatePro</span>
          </Link>

          <p>
            Find verified properties, compare homes, rent, buy, and connect with
            trusted agents across Bangalore.
          </p>

          <div className="pro-social-icons">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
          </div>
        </div>

        <div className="pro-footer-section">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/buy">Buy</Link>
          <Link to="/rent">Rent</Link>
          <Link to="/agents">Agents</Link>
          <Link to="/compare">Compare</Link>
        </div>

        <div className="pro-footer-section">
          <h4>Services</h4>
          <Link to="/buy">Buy Property</Link>
          <Link to="/rent">Rent Property</Link>
          <Link to="/post-property">Sell Property</Link>
          <Link to="/contact">Property Support</Link>
          <Link to="/contact">Home Loan Help</Link>
        </div>

        <div className="pro-footer-section">
          <h4>Contact</h4>

          <p className="pro-footer-contact">
            <FaMapMarkerAlt />
            <span>Bangalore, India</span>
          </p>

          <p className="pro-footer-contact">
            <FaPhoneAlt />
            <span>+91 98765 43210</span>
          </p>

          <p className="pro-footer-contact">
            <FaEnvelope />
            <span>support@realestate.com</span>
          </p>
        </div>
      </div>

      <div className="pro-footer-bottom">
        <p>© 2026 RealEstatePro. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;