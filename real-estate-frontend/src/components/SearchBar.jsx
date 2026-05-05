import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement search logic
    if (onSearch) onSearch();
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input type="text" placeholder="Search properties..." />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
