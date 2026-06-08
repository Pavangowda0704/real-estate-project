import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaExchangeAlt,
} from "react-icons/fa";

function PropertyCard({ property }) {
  const [isFav, setIsFav] = useState(false);

  const propertyId = property._id || property.id;

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];

    setIsFav(
      favs.some((item) => (item._id || item.id) === propertyId)
    );
  }, [propertyId]);

  const toggleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFav) {
      favs = favs.filter(
        (item) => (item._id || item.id) !== propertyId
      );
    } else {
      favs.push(property);
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
    setIsFav(!isFav);
  };

  const handleCompare = (property) => {
    let compareList =
      JSON.parse(localStorage.getItem("compare")) || [];

    const currentPropertyId = property._id || property.id;

    const exists = compareList.find(
      (item) => (item._id || item.id) === currentPropertyId
    );

    if (exists) {
      alert("Already added to compare");
      return;
    }

    if (compareList.length >= 3) {
      alert("You can compare max 3 properties");
      return;
    }

    compareList.push(property);

    localStorage.setItem(
      "compare",
      JSON.stringify(compareList)
    );

    alert("Added to compare");
  };

  return (
    <div className="startup-card">
      <div className="startup-card-image-wrapper">
        <img
          src={
            property.image ||
            "https://via.placeholder.com/400x250?text=No+Image"
          }
          alt={property.title}
          className="startup-card-image"
        />

        <button
          className="startup-fav-btn"
          onClick={toggleFavorite}
        >
          {isFav ? <FaHeart /> : <FaRegHeart />}
        </button>

        <div
          className={`startup-badge ${
            property.type === "Rent"
              ? "startup-rent"
              : "startup-buy"
          }`}
        >
          For {property.type}
        </div>
      </div>

      <div className="startup-card-body">
        <h3>{property.title}</h3>

        <div className="startup-price">
          {property.price}
        </div>

        <p className="startup-location">
          <FaMapMarkerAlt />
          {property.location}
        </p>

        <div className="startup-meta">
          <span>{property.bhk || "BHK"}</span>
          <span>{property.area || "Area"}</span>
        </div>

        <div className="startup-actions">
          <Link
            to={`/property/${propertyId}`}
            className="startup-details-btn"
          >
            View Details
          </Link>

          <button
            className="startup-compare-btn"
            onClick={() => handleCompare(property)}
          >
            <FaExchangeAlt />
            Compare
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;