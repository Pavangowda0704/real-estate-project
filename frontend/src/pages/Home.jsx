import { Link } from "react-router-dom";
import LeadRequestButton from "../components/LeadRequestButton";

function Home() {
  const properties = [
    {
      title: "Luxury Family Villa",
      place: "Whitefield, Bangalore",
      price: "₹85L",
      tag: "For Sale",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      link: "/buy",
    },
    {
      title: "Modern Apartment",
      place: "Indiranagar, Bangalore",
      price: "₹45L",
      tag: "For Sale",
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      link: "/buy",
    },
    {
      title: "Premium Rental Home",
      place: "Marathahalli, Bangalore",
      price: "₹25K/mo",
      tag: "For Rent",
      img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
      link: "/rent",
    },
    {
      title: "City View House",
      place: "Koramangala, Bangalore",
      price: "₹1.2Cr",
      tag: "For Sale",
      img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      link: "/buy",
    },
  ];

  return (
    <main className="estate-home">
      {/* HERO SECTION */}
      <section className="estate-hero">
        <div className="estate-hero-left">
          <span className="estate-badge">
            Bangalore Verified Properties
          </span>

          <h1>Find a home that feels right.</h1>

          <p>
            Buy, rent, compare, and request property support from one clean
            real estate platform.
          </p>

          <div className="estate-search">
            <input placeholder="Search location, property or city" />

            <div className="estate-desktop-filters">
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
            </div>

            <Link to="/buy">Search</Link>
          </div>
        </div>

        <div className="estate-hero-right">
          <div className="estate-slider">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="Luxury home"
            />

            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
              alt="Modern apartment"
            />

            <img
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
              alt="Rental home"
            />

            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
              alt="Premium house"
            />
          </div>
        </div>
      </section>

      {/* PREMIUM ACTIONS */}
      <section className="estate-actions premium-actions">
        <Link to="/buy" className="premium-action-card">
          <div className="premium-action-icon">🏠</div>

          <div>
            <strong>Buy a Property</strong>
            <small>Explore verified homes</small>
          </div>

          <span>→</span>
        </Link>

        <Link to="/rent" className="premium-action-card">
          <div className="premium-action-icon">🔑</div>

          <div>
            <strong>Rent a Home</strong>
            <small>Find rental spaces</small>
          </div>

          <span>→</span>
        </Link>

        <div className="premium-action-card">
          <div className="premium-action-icon">📤</div>

          <div>
            <strong>Sell Property</strong>
            <small>Get expert support</small>
          </div>

          <span>→</span>

          <LeadRequestButton
            label="Start"
            className="estate-hidden-btn"
          />
        </div>

        <Link to="/compare" className="premium-action-card">
          <div className="premium-action-icon">⚖️</div>

          <div>
            <strong>Compare Homes</strong>
            <small>Choose the best option</small>
          </div>

          <span>→</span>
        </Link>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="estate-section">
        <div className="estate-head">
          <div>
            <span>Recommended</span>
            <h2>Featured Properties</h2>
          </div>

          <Link to="/buy">View all</Link>
        </div>

        <div className="estate-property-row">
          {properties.map((item, index) => (
            <Link to={item.link} className="estate-card" key={index}>
              <div className="estate-card-img">
                <img src={item.img} alt={item.title} />
                <span>{item.tag}</span>
              </div>

              <div className="estate-card-body">
                <h3>{item.title}</h3>
                <p>{item.place}</p>
                <strong>{item.price}</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LOCATIONS + TRUST */}
<section className="estate-pro-info">
  <div className="estate-pro-locations">
    <div className="estate-head">
      <div>
        <span>Popular Areas</span>
        <h2>Explore Bangalore Locations</h2>
      </div>
    </div>

    <div className="estate-location-list pro-location-list">
      <Link to="/buy">Whitefield</Link>
      <Link to="/buy">Indiranagar</Link>
      <Link to="/buy">Marathahalli</Link>
      <Link to="/buy">Koramangala</Link>
      <Link to="/buy">Electronic City</Link>
      <Link to="/buy">HSR Layout</Link>
    </div>
  </div>

  <div className="pro-trust-card">
    <div className="pro-trust-left">
      <span>Why Choose Us</span>
      <h2>Simple property decisions, faster.</h2>
      <p>
        Clean listings, direct support, role-based dashboards, and a
        mobile-first experience for real customers.
      </p>
    </div>

    <div className="pro-trust-grid">
      <div>
        <span>✅</span>
        <strong>Verified Listings</strong>
        <p>Clear property details with organized information.</p>
      </div>

      <div>
        <span>⚖️</span>
        <strong>Easy Compare</strong>
        <p>Compare properties before contacting sellers.</p>
      </div>

      <div>
        <span>☎️</span>
        <strong>Direct Support</strong>
        <p>Submit requirements and get contacted quickly.</p>
      </div>
    </div>
  </div>

  <div className="pro-stats-grid">
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
      <p>Locations</p>
    </div>
    <div>
      <h3>24/7</h3>
      <p>Support</p>
    </div>
  </div>
</section>
    </main>
  );
}

export default Home;