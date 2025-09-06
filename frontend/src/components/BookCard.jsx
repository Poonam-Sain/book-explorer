import { Link } from "react-router-dom";
import { useState } from "react";

function BookCard({ book }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // format price
  const formattedPrice = book.price
    ? `₹${parseFloat(book.price).toFixed(2)}`
    : "N/A";

  // fallback thumbnail
  const thumbnail = book.thumbnail && book.thumbnail.trim() !== ""
    ? book.thumbnail
    : "https://via.placeholder.com/150x200?text=No+Image";

  return (
    <Link to={`/book/${book.id}`}>
      <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition w-60 cursor-pointer h-full flex flex-col">
        {/* Book image - Fixed container */}
        <div className="w-full h-48 mb-3 flex items-center justify-center bg-gray-50 rounded relative">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-gray-200 w-full h-full rounded"></div>
            </div>
          )}
          
          <img
            src={thumbnail}
            alt={book.title}
            className={`max-h-full max-w-full object-contain ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/150x200?text=No+Image";
              setImageError(true);
              setImageLoaded(true);
            }}
          />
        </div>

        {/* Book title */}
        <h3 className="font-semibold text-lg mb-1 line-clamp-2 flex-grow">{book.title}</h3>

        {/* Price */}
        <p className="text-gray-700 font-medium">{formattedPrice}</p>

        {/* Stock status */}
        <p className={book.stock ? "text-green-600" : "text-red-500"}>
          {book.stock ? "✅ In Stock" : "❌ Out of Stock"}
        </p>

        {/* Rating */}
        <p>⭐ {book.rating}</p>
      </div>
    </Link>
  );
}

export default BookCard;