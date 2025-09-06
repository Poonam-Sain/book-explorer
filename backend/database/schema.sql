CREATE DATABASE IF NOT EXISTS book_explorer;
USE book_explorer;

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(6,2),
    stock VARCHAR(50),
    rating INT,
    detail_url VARCHAR(255),
    thumbnail_url VARCHAR(255)
);
