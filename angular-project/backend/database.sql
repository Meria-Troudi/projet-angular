-- Run this in phpMyAdmin or MySQL console

CREATE DATABASE IF NOT EXISTS angular_db;
USE angular_db;

CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO items (name, description, price) VALUES
('Item 1', 'Description for item 1', 19.99),
('Item 2', 'Description for item 2', 29.99),
('Item 3', 'Description for item 3', 9.99);
