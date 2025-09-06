import "../styles/Home.css";

function SearchBar({ searchInput, setSearchInput, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="search-group">
      <label className="filter-label">SEARCH BOOKS</label>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Enter book title..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="filter-input"
          style={{ flex: 1, minWidth: '200px' }}
        />
        <button
          onClick={onSearch}
          className="apply-btn"
        >
          🔍 Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;