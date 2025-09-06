import "../styles/Home.css";

function FilterPanel({
  rating,
  setRating,
  inStock,
  setInStock,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  onApplyFilters
}) {
  return (
    <div className="filters-section">
      {/* Rating Filter */}
      <div className="filter-group">
        <label className="filter-label">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="filter-select"
        >
          <option value="">All Ratings</option>
          <option value="5">⭐ 5</option>
          <option value="4">⭐ 4+</option>
          <option value="3">⭐ 3+</option>
        </select>
      </div>

      {/* Stock Filter */}
      <div className="filter-group">
        <label className="filter-label">Stock</label>
        <select
          value={inStock}
          onChange={(e) => setInStock(e.target.value)}
          className="filter-select"
        >
          <option value="">All</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="filter-group">
        <label className="filter-label">Min Price</label>
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="filter-input"
        />
      </div>
      
      <div className="filter-group">
        <label className="filter-label">Max Price</label>
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="filter-input"
        />
      </div>

      {/* Apply Filters Button */}
      <button
        onClick={onApplyFilters}
        className="apply-btn"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default FilterPanel;