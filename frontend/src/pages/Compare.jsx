import { useEffect, useState } from "react";

function Compare() {
  const [compareList, setCompareList] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("compare")) || [];
    setCompareList(data);
  }, []);

  // ✅ FIX: Add remove function
  const removeProperty = (id) => {
    const updated = compareList.filter(
      (item) => (item._id || item.id) !== id
    );

    setCompareList(updated);
    localStorage.setItem("compare", JSON.stringify(updated));
  };

  if (compareList.length === 0) {
    return (
      <div className="section">
        <h2>No properties to compare</h2>
      </div>
    );
  }

  return (
    <div className="section">
      <h2>Compare Properties</h2>

      <div className="compare-table-wrapper">
        <table className="compare-table">
          <thead>
            <tr>
              <th>Feature</th>
              {compareList.map((p) => (
                <th key={p._id || p.id}>
                  <div className="compare-header">
                    <h4>{p.title}</h4>
                    <p>{p.price}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Image</td>
              {compareList.map((p) => (
                <td key={p._id || p.id}>
                  <img src={p.image} alt={p.title} />
                </td>
              ))}
            </tr>

            <tr>
              <td>Price</td>
              {compareList.map((p) => (
                <td key={p._id || p.id}>{p.price}</td>
              ))}
            </tr>

            <tr>
              <td>Location</td>
              {compareList.map((p) => (
                <td key={p._id || p.id}>{p.location}</td>
              ))}
            </tr>

            <tr>
              <td>BHK</td>
              {compareList.map((p) => (
                <td key={p._id || p.id}>{p.bhk}</td>
              ))}
            </tr>

            <tr>
              <td>Area</td>
              {compareList.map((p) => (
                <td key={p._id || p.id}>{p.area}</td>
              ))}
            </tr>

            <tr>
              <td>Type</td>
              {compareList.map((p) => (
                <td key={p._id || p.id}>{p.type}</td>
              ))}
            </tr>

            <tr>
              <td>Action</td>
              {compareList.map((p) => (
                <td key={p._id || p.id}>
                  <button
                    className="compare-remove-btn"
                    onClick={() => removeProperty(p._id || p.id)}
                  >
                    Remove
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Compare;