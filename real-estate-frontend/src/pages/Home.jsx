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
    <main className="customer-home">
      <section className="customer-hero">
        <div className="customer-hero-text">
          <span className="customer-badge">Verified Real Estate Platform</span>
          <h1>Find your next home with confidence</h1>
          <p>
            Explore verified properties for buying and renting across Bangalore.
          </p>

          <div className="customer-search">
  <input placeholder="Search location, property or city" />

  <div className="customer-desktop-filters">
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

        <div className="customer-hero-image">
  <div className="customer-image-slider">
    <img
      src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
      alt="Property 1"
    />

    <img
      src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
      alt="Property 2"
    />

    <img
      src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3"
      alt="Property 3"
    />

    <img
      src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
      alt="Property 4"
    />
  </div>
</div>
      </section>

      <section className="customer-actions">
        <Link to="/buy" className="customer-action-card">
          <span>🏠</span>
          <div>
            <strong>Buy</strong>
            <small>Find homes</small>
          </div>
        </Link>

        <Link to="/rent" className="customer-action-card">
          <span>🔑</span>
          <div>
            <strong>Rent</strong>
            <small>Rental homes</small>
          </div>
        </Link>

        <div className="customer-action-card">
          <span>📤</span>
          <div>
            <strong>Sell</strong>
            <small>Get support</small>
          </div>
          <LeadRequestButton label="Start" className="customer-small-btn" />
        </div>

        <Link to="/compare" className="customer-action-card">
          <span>⚖️</span>
          <div>
            <strong>Compare</strong>
            <small>Choose better</small>
          </div>
        </Link>
      </section>

      <section className="customer-section">
        <div className="customer-section-head">
          <div>
            <span>Recommended</span>
            <h2>Featured Properties</h2>
          </div>
          <Link to="/buy">View all</Link>
        </div>

        <div className="customer-property-grid">
          {properties.map((item, index) => (
            <Link to={item.link} className="customer-property-card" key={index}>
              <div className="customer-property-img">
                <img src={item.img} alt={item.title} />
                <span>{item.tag}</span>
              </div>

              <div className="customer-property-info">
                <h3>{item.title}</h3>
                <p>{item.place}</p>
                <strong>{item.price}</strong>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="customer-section">
        <div className="customer-section-head">
          <div>
            <span>Popular Areas</span>
            <h2>Explore Bangalore Locations</h2>
          </div>
        </div>

        <div className="customer-locations">
          <Link to="/buy">Whitefield</Link>
          <Link to="/buy">Indiranagar</Link>
          <Link to="/buy">Marathahalli</Link>
          <Link to="/buy">Koramangala</Link>
          <Link to="/buy">Electronic City</Link>
          <Link to="/buy">HSR Layout</Link>
        </div>
      </section>

      <section className="customer-trust">
        <div>
          <span>Why Choose Us</span>
          <h2>Built for simple property decisions</h2>
          <p>
            A clean platform for buyers, renters, sellers, agents, and admins.
          </p>
        </div>

        <div className="customer-trust-grid">
          <div>
            <strong>Verified Listings</strong>
            <p>Organized property details with clear information.</p>
          </div>
          <div>
            <strong>Easy Compare</strong>
            <p>Compare properties before making a decision.</p>
          </div>
          <div>
            <strong>Direct Support</strong>
            <p>Submit requirements and get contacted quickly.</p>
          </div>
        </div>
      </section>

      <section className="customer-stats">
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
      </section>
    </main>
  );
}

export default Home;