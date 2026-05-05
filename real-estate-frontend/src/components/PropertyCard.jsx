import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function PropertyCard({ property }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFav(favs.some((item) => item.id === property.id));
  }, [property.id]);

  // ⭐ Favorite toggle
  const toggleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFav) {
      favs = favs.filter((item) => item.id !== property.id);
    } else {
      favs.push(property);
    }

    localStorage.setItem("favorites", JSON.stringify(favs));
    setIsFav(!isFav);
  };

  // 🔁 Compare feature
  const handleCompare = (property) => {
  let compareList = JSON.parse(localStorage.getItem("compare")) || [];

  const propertyId = property._id || property.id;

  const exists = compareList.find(
    (item) => (item._id || item.id) === propertyId
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
  localStorage.setItem("compare", JSON.stringify(compareList));

  alert("Added to compare");
};

  return (
    <div className="property-card">

      {/* ⭐ Favorite Button */}
      <button className="fav-btn" onClick={toggleFavorite}>
        {isFav ? "❤️" : "🤍"}
      </button>

      {/* Badge */}
      <div className={`badge ${property.type === "Rent" ? "rent" : "buy"}`}>
        {property.type}
      </div>

      {/* Image */}
      <img
        src={
          property.image ||
          "https://via.placeholder.com/400x250?text=No+Image"
        }
        alt={property.title}
      />

      {/* Info */}
      <div className="property-info">
        <h3>{property.title}</h3>
        <p className="price">{property.price}</p>
        <p>{property.location}</p>

        <div className="property-meta">
          <span>{property.bhk}</span>
          <span>{property.area}</span>
        </div>

        {/* Buttons */}
        <div className="card-actions">
          <Link to={`/property/${property._id || property.id}`} className="details-btn">
  View Details
</Link>

          <button
            className="compare-btn"
            onClick={() => handleCompare(property)}
          >
            Compare
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;