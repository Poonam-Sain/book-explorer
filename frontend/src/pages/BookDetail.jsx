import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/BookDetail.css";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Book not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="book-detail-container"><div className="book-detail-card loading">⏳ Loading book details...</div></div>;
  if (error) return <div className="book-detail-container"><div className="book-detail-card error">❌ {error}</div></div>;
  if (!book) return <div className="book-detail-container"><div className="book-detail-card">Book not found</div></div>;

  return (
    <div className="book-detail-container">
      <div className="book-detail-card">
        {/* Header */}
        <div className="book-detail-header">
          <h1 className="book-detail-title">{book.title}</h1>
        </div>

        {/* Book Image */}
        <div className="book-image-container">
          <img 
            src={book.thumbnail} 
            alt={book.title} 
            className="book-detail-image"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/300x400?text=No+Image";
            }}
          />
        </div>

        {/* Book Information */}
        <div className="book-detail-info">
          <div className="info-group">
            <span className="info-label">Price</span>
            <span className="info-value price-value">
              ₹{parseFloat(book.price).toFixed(2)}
            </span>
          </div>

          <div className="info-group">
            <span className="info-label">Rating</span>
            <span className="info-value rating-value">
              ⭐ {book.rating}/5
            </span>
          </div>

          <div className="info-group">
            <span className="info-label">Availability</span>
            <span className={`info-value stock-value ${book.stock ? 'stock-in' : 'stock-out'}`}>
              {book.stock ? "✅ In Stock" : "❌ Out of Stock"}
            </span>
          </div>

          {book.detailUrl && (
            <div className="info-group">
              <span className="info-label">Source</span>
              <a 
                href={book.detailUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="info-value link-value"
              >
                View Original
              </a>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="book-detail-actions">
          <Link to="/" className="back-button">
            ← Back to All Books
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;