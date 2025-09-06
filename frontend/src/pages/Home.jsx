import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import Pagination from "../components/Pagination";
import "../styles/Home.css"; // Import the CSS

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Separate input vs actual query
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // Separate filter inputs vs actual filters
  const [ratingInput, setRatingInput] = useState("");
  const [inStockInput, setInStockInput] = useState("");
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  
  const [rating, setRating] = useState("");
  const [inStock, setInStock] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 12;

  // Apply all filters when Enter is pressed or filters are explicitly set
  const applyFilters = () => {
    setSearch(searchInput);
    setRating(ratingInput);
    setInStock(inStockInput);
    setMinPrice(minPriceInput);
    setMaxPrice(maxPriceInput);
    setPage(1);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/books", {
        params: { page, limit, search, rating, inStock, minPrice, maxPrice },
      })
      .then((res) => {
        setBooks(res.data.books || []);
        setTotal(res.data.total || 0);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch books");
        setLoading(false);
      });
  }, [page, search, rating, inStock, minPrice, maxPrice]);

  if (loading) return <p className="loading-text">⏳ Loading books...</p>;
  if (error) return <p className="error-text">{error}</p>;

  const totalPages = Math.ceil(total / limit);

  // ... imports and state remain the same ...

return (
  <div className="home-container">
    {/* Header Section with Title and Filters */}
    <div className="header-section">
      <div className="header-content">
        <h1 className="home-title">
          📚 Book Explorer
        </h1>
        
        <div className="header-filters">
          <div className="search-section">
            <SearchBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              onSearch={applyFilters}
            />
          </div>
          
          <div className="filters-section">
            <FilterPanel
              rating={ratingInput}
              setRating={setRatingInput}
              inStock={inStockInput}
              setInStock={setInStockInput}
              minPrice={minPriceInput}
              setMinPrice={setMinPriceInput}
              maxPrice={maxPriceInput}
              setMaxPrice={setMaxPriceInput}
              onApplyFilters={applyFilters}
            />
          </div>
        </div>
      </div>
    </div>

    {/* Main Content */}
    <div className="main-content">
      {/* Book Grid */}
      <div className="books-grid">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={{
              id: book.id,
              title: book.title,
              price: book.price,
              stock: book.stock,
              rating: book.rating,
              thumbnail: book.thumbnail,
            }}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  </div>
);
}
export default Home;