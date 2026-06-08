function About() {
  return (
    <div className="section">
      <h2>About Us</h2>

      <div className="about-container">
        <div className="about-text">
          <h3>Your Trusted Real Estate Partner</h3>

          <p>
            RealEstate helps users buy, rent, and post properties easily.
            Our platform connects property buyers, tenants, owners, sellers,
            and agents in one place.
          </p>

          <p>
            We focus on verified listings, simple property search, transparent
            pricing, and easy communication between customers and property owners.
          </p>

          <div className="about-stats">
            <div>
              <h3>500+</h3>
              <p>Properties</p>
            </div>

            <div>
              <h3>100+</h3>
              <p>Agents</p>
            </div>

            <div>
              <h3>1000+</h3>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
            alt="About Real Estate"
          />
        </div>
      </div>
    </div>
  );
}

export default About;