USE book_explorer;

-- Count total books
SELECT COUNT(*) FROM books;

-- Get first 15 books
SELECT * FROM books LIMIT 15;

-- Count out of stock books
SELECT COUNT(*) AS out_of_stock_count
FROM books
WHERE stock = 'Out of stock';

-- Truncate table (use with caution!)
-- TRUNCATE TABLE books;
