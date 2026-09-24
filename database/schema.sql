-- PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    image TEXT NOT NULL,
    description TEXT NOT NULL
);

-- INSERT PRODUCTS
INSERT INTO products (name, price, image, description) VALUES
('Samsung Galaxy S25 Ultra', 1199, '../assets/images/products/SamsungGalaxyS25Ultra.jpg', 'The latest Samsung flagship with incredible camera performance.'),
('iPhone 17 Pro Max', 1299, '../assets/images/products/Iphone17ProMax.jpg', 'Apple’s newest powerhouse with A18 chip and titanium frame.'),
('Google Pixel 10 Pro', 1099, '../assets/images/products/GooglePixel10Pro.jpg', 'Google’s best AI-powered smartphone yet.'),
('OnePlus 13', 999, '../assets/images/products/Oneplus13.jpg', 'Fast, smooth, and powerful — the best OnePlus yet.'),
('Xiaomi Mi 14 Pro', 899, '../assets/images/products/XiaomiMi14Pro.jpg', 'Xiaomi’s flagship with unbeatable value.');

-- ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_address TEXT NOT NULL,
    cart_json TEXT NOT NULL,
    total REAL NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
