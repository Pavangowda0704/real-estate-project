import { Link } from "react-router-dom";
import LeadRequestButton from "../components/LeadRequestButton";

function Home() {
  return (
    <>
      <section className="home-full-hero">
        <div className="home-bg-slider">
          <div className="home-bg-slide home-bg-1"></div>
          <div className="home-bg-slide home-bg-2"></div>
          <div className="home-bg-slide home-bg-3"></div>
          <div className="home-bg-slide home-bg-4"></div>
        </div>

        <div className="home-full-overlay"></div>

        <div className="home-full-content">
          <span className="home-full-badge">Premium Real Estate Platform</span>

          <h1>Find Your Dream Property With Confidence</h1>

          <p>
            Buy, rent, sell, compare verified properties, and get direct support
            from our team.
          </p>

          <div className="home-full-actions">
            <Link to="/buy" className="home-full-primary">
              Explore Properties
            </Link>

            <LeadRequestButton
              label="Get Expert Assistance"
              className="home-full-secondary"
            />
          </div>

          <div className="home-search-box">
            <input placeholder="Enter location" />

            <select>
              <option>Property Type</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Plot</option>
              <option>Commercial</option>
            </select>

            <select>
              <option>Purpose</option>
              <option>Buy</option>
              <option>Rent</option>
            </select>

            <Link to="/buy">Search</Link>
          </div>
        </div>
      </section>

      <section className="home-stats">
        <div>
          <h3>500+</h3>
          <p>Properties</p>
        </div>
        <div>
          <h3>100+</h3>
          <p>Agents</p>
        </div>
        <div>
          <h3>25+</h3>
          <p>Cities</p>
        </div>
        <div>
          <h3>24/7</h3>
          <p>Support</p>
        </div>
      </section>

      <section className="home-quick-actions">
        <div>
          <h3>Buy Property</h3>
          <p>Explore verified homes, apartments, villas, and plots.</p>
          <Link to="/buy">View Buy Listings</Link>
        </div>

        <div>
          <h3>Rent Property</h3>
          <p>Find rental homes and commercial spaces easily.</p>
          <Link to="/rent">View Rent Listings</Link>
        </div>

        <div>
          <h3>Sell Property</h3>
          <p>Submit your selling requirement without login.</p>
          <LeadRequestButton label="Submit Sell Request" className="home-mini-btn" />
        </div>
      </section>

      <section className="home-featured">
        <div className="home-section-title">
          <span>Featured Properties</span>
          <h2>Handpicked Premium Listings</h2>
        </div>

        <div className="home-featured-scroll">
          <div className="home-feature-card">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" alt="Luxury villa" />
            <div>
              <span>For Sale</span>
              <h3>Luxury Family Villa</h3>
              <p>Bangalore • 3 BHK • ₹85L</p>
              <Link to="/buy">View Details</Link>
            </div>
          </div>

          <div className="home-feature-card">
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c" alt="Apartment" />
            <div>
              <span>For Sale</span>
              <h3>Modern Apartment</h3>
              <p>Chennai • 2 BHK • ₹45L</p>
              <Link to="/buy">View Details</Link>
            </div>
          </div>

          <div className="home-feature-card">
            <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3" alt="Rental home" />
            <div>
              <span>For Rent</span>
              <h3>Premium Rental Home</h3>
              <p>Hyderabad • 2 BHK • ₹25K/month</p>
              <Link to="/rent">View Details</Link>
            </div>
          </div>

          <div className="home-feature-card">
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9" alt="Premium house" />
            <div>
              <span>For Sale</span>
              <h3>Premium City House</h3>
              <p>Mumbai • 4 BHK • ₹1.2Cr</p>
              <Link to="/buy">View Details</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-assist">
        <div>
          <span>Need Help?</span>
          <h2>Buying or Selling Property?</h2>
          <p>
            Submit your requirement without login. Admin can view your message
            and contact you directly.
          </p>
        </div>

        <LeadRequestButton
          label="Submit Property Requirement"
          className="home-assist-btn"
        />
      </section>

      <section className="home-how">
        <div className="home-section-title">
          <span>How It Works</span>
          <h2>Simple Process, Professional Support</h2>
        </div>

        <div className="home-how-grid">
          <div>
            <strong>01</strong>
            <h3>Browse</h3>
            <p>Search buy and rent properties.</p>
          </div>

          <div>
            <strong>02</strong>
            <h3>Compare</h3>
            <p>Compare properties before decision.</p>
          </div>

          <div>
            <strong>03</strong>
            <h3>Enquire</h3>
            <p>Send enquiry or request support.</p>
          </div>

          <div>
            <strong>04</strong>
            <h3>Contact</h3>
            <p>Admin or agent contacts directly.</p>
          </div>
        </div>
      </section>

      <section className="home-why">
        <div className="home-section-title">
          <span>Why Choose Us</span>
          <h2>A Better Real Estate Experience</h2>
        </div>

        <div className="home-why-grid">
          <div>
            <h3>Verified Listings</h3>
            <p>Clean and organized property details.</p>
          </div>

          <div>
            <h3>No Login Request</h3>
            <p>Visitors can submit buy/sell requirements directly.</p>
          </div>

          <div>
            <h3>Role-Based Control</h3>
            <p>Buyer, agent/seller, and admin flows are separated.</p>
          </div>

          <div>
            <h3>Admin Management</h3>
            <p>Admin manages users, properties, enquiries, and leads.</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;