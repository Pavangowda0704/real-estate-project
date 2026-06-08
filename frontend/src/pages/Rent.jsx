import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import API from "../api";

function Rent() {
  const [allProperties, setAllProperties] = useState([]);
  const [search, setSearch] = useState(
    localStorage.getItem("searchLocation") || ""
  );
  const [bhk, setBhk] = useState("");
  const [price, setPrice] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "RealEstate | Rent Properties";

    const fetchProperties = async () => {
      try {
        const res = await API.get("/properties");
        setAllProperties(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const resetFilters = () => {
    setSearch("");
    setBhk("");
    setPrice("");
    setPropertyType("");
    setSort("");
    localStorage.removeItem("searchLocation");
  };

  let rentProperties = allProperties.filter((property) => {
    return (
      property.type === "Rent" &&
      property.location.toLowerCase().includes(search.toLowerCase()) &&
      property.price.toLowerCase().includes(price.toLowerCase()) &&
      (bhk === "" || property.bhk === bhk) &&
      (propertyType === "" || property.propertyType === propertyType)
    );
  });

  if (sort === "low-high") {
    rentProperties = [...rentProperties].sort(
      (a, b) =>
        parseFloat(a.price.replace(/[^\d.]/g, "")) -
        parseFloat(b.price.replace(/[^\d.]/g, ""))
    );
  }

  if (sort === "high-low") {
    rentProperties = [...rentProperties].sort(
      (a, b) =>
        parseFloat(b.price.replace(/[^\d.]/g, "")) -
        parseFloat(a.price.replace(/[^\d.]/g, ""))
    );
  }

  if (loading) {
    return (
      <div className="section">
        <h2>Rent Properties</h2>

        <div className="property-grid">
          {[1, 2, 3, 4].map((item) => (
            <div className="skeleton-card" key={item}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <h2>Rent Properties</h2>

      <div className="advanced-layout">
        <aside className="filter-sidebar">
          <h3>Advanced Filters</h3>

          <label>Location</label>
          <input
            type="text"
            placeholder="Marathahalli, Indiranagar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <label>Rent Price</label>
          <input
            type="text"
            placeholder="18000, 32000..."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <label>BHK</label>
          <select value={bhk} onChange={(e) => setBhk(e.target.value)}>
            <option value="">All BHK</option>
            <option value="1 BHK">1 BHK</option>
            <option value="2 BHK">2 BHK</option>
            <option value="3 BHK">3 BHK</option>
          </select>

          <label>Property Type</label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Plot">Plot</option>
            <option value="Commercial">Commercial</option>
          </select>

          <label>Sort By</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Default</option>
            <option value="low-high">Price Low to High</option>
            <option value="high-low">Price High to Low</option>
          </select>

          <button onClick={resetFilters} className="reset-btn">
            Reset Filters
          </button>
        </aside>

        <main className="listing-content">
          <div className="listing-header">
            <h3>{rentProperties.length} Properties Found</h3>
            <p>Showing verified rental properties in Bangalore</p>
          </div>

          <div className="property-grid">
            {rentProperties.length === 0 ? (
              <div className="empty-state">
                <h3>No Properties Found</h3>
                <p>Try changing location, price, BHK, or property type.</p>
              </div>
            ) : (
              rentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Rent;