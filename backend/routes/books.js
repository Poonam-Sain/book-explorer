const express = require('express');
const router = express.Router();
const conn = require('../db');

// ✅ GET /api/books?search=&rating=&minPrice=&maxPrice=&inStock=&page=&limit=
router.get('/', (req, res) => {
    let { search, rating, minPrice, maxPrice, inStock, page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const offset = (page - 1) * limit;

    let baseQuery = "FROM books WHERE 1=1";
    let params = [];

    if (search) {
        baseQuery += " AND title LIKE ?";
        params.push(`%${search}%`);
    }
    if (rating) {
        baseQuery += " AND rating = ?";
        params.push(rating);
    }
    if (minPrice) {
        baseQuery += " AND price >= ?";
        params.push(minPrice);
    }
    if (maxPrice) {
        baseQuery += " AND price <= ?";
        params.push(maxPrice);
    }
    if (inStock) {
        if (inStock === "true") {
            baseQuery += " AND stock = ?";
            params.push("In stock");
        } else if (inStock === "false") {
            baseQuery += " AND stock = ?";
            params.push("Out of stock");
        }
    }

    // 1️⃣ Count query
    const countQuery = "SELECT COUNT(*) as total " + baseQuery;

    // 2️⃣ Data query
    const dataQuery = "SELECT * " + baseQuery + " LIMIT ? OFFSET ?";
    const dataParams = [...params, limit, offset];

    conn.query(countQuery, params, (err, countResult) => {
        if (err) return res.status(500).json({ error: err });
        const total = countResult[0].total;

        conn.query(dataQuery, dataParams, (err, results) => {
            if (err) return res.status(500).json({ error: err });
            
            const normalized = results.map(book => ({
                id: book.id,
                title: book.title,
                price: parseFloat(book.price),
                stock: book.stock === "In stock", // ✅ More reliable boolean conversion
                rating: book.rating,
                thumbnail: book.thumbnail_url // ✅ Direct from database
            }));

            res.json({
                books: normalized,
                total: total
            });
        });
    });
});

// ✅ GET /api/books/:id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    conn.query("SELECT * FROM books WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(404).json({ error: "Book not found" });

        const b = results[0];
        const normalized = {
            id: b.id,
            title: b.title,
            price: parseFloat(b.price),
            stock: b.stock === "In stock",
            rating: b.rating,
            detailUrl: b.detail_url,
            thumbnail: b.thumbnail_url, // ✅ Direct from database
        };

        res.json(normalized);
    });
});

module.exports = router;