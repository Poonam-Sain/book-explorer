import "../styles/Home.css";

function Pagination({ page, setPage, totalPages }) {
  return (
    <div className="pagination-container">
      <div className="pagination-content">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
          className="pagination-btn pagination-prev"
        >
          ← Previous
        </button>
        
        <span className="pagination-info">
          Page {page} of {totalPages || 1}
        </span>
        
        <button
          onClick={() => setPage(page < totalPages ? page + 1 : page)}
          disabled={page === totalPages || totalPages === 0}
          className="pagination-btn pagination-next"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Pagination;