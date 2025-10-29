CREATE DATABASE IF NOT EXISTS branimulai_db;
USE branimulai_db;

CREATE TABLE umkm (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL,
  photos JSON NOT NULL,
  phone VARCHAR(20),
  whatsapp VARCHAR(20),
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  
  -- Tambahkan UNIQUE constraint untuk mencegah duplikat name address
  UNIQUE KEY unique_umkm (name, address)
);
