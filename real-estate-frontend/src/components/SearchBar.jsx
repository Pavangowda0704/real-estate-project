import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";

function SearchBar() {
  const navigate = useNavigate();

  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [purpose, setPurpose] = useState("buy");

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("searchLocation", location);

    if (purpose === "rent") {
      navigate("/rent");
    } else {
      navigate("/buy");
    }
  };

  return (
    <form className="startup-search-bar" onSubmit={handleSubmit}>
      <div className="startup-search-input">
        <FaMapMarkerAlt />

        <input
          type="text"
          placeholder="Search by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="startup-search-input">
        <FaBuilding />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Property Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Plot">Plot</option>
          <option value="Commercial">Commercial</option>
        </select>
      </div>

      <div className="startup-search-input">
        <select
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        >
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </select>
      </div>

      <button type="submit" className="startup-search-btn">
        <FaSearch />
        Search
      </button>
    </form>
  );
}

export default SearchBar;